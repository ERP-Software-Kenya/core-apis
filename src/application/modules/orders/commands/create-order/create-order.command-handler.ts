import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BILL_REPO, CUSTOMER_REPO, LOCATION_REPO, ORDER_ITEM_REPO, ORDER_REPO, PRODUCT_BRANCH_PRICE_REPO, PRODUCT_REPO } from '../../../../constants';
import { Order, OrderItem } from '../../domain';
import { IOrderRepo } from '../..';
import { IOrderItemRepo } from '../../i-order-item.repo';
import { CreateOrderCommand, CreateOrderItemInput } from './create-order.command';
import { OrdersMailService } from '../../mail';
import { IPushNotificationService, PUSH_NOTIFICATION_SERVICE } from '../../../../../common';
import { ActivityLogService, BillCompletionService, CreditLimitExceededError } from '../../../../shared';
import { EActivityAction } from '../../../../../infrastructure/persistence/entities/activity-log.entity';
import { IBillRepo } from '../../../bills';
import { Bill } from '../../../bills/domain';
import { generateBillNumber } from '../../../bills/helpers';
import { EBillStatus, ECustomerType, EPaymentMethod, EPaymentTiming, ESaleType } from '../../../../../infrastructure/persistence/entities';
import { EOrderStatus } from '../../../../shared/enums/e-order-status';
import { EFulfillmentMode } from '../../../../shared/enums/e-fulfillment-mode';
import { ILocationRepo } from '../../../locations';
import { IProductRepo } from '../../../products';
import { IProductBranchPriceRepo } from '../../../product-branch-prices';
import { resolveBranchPrice } from '../../../product-branch-prices/helpers';
import { formatOrganizationCurrency, OrganizationSettingsService } from '../../../billing-settings/currency';

@CommandHandlerStrict(CreateOrderCommand)
export class CreateOrderCommandHandler implements ICommandHandler<CreateOrderCommand, Order> {
  constructor(
    @Inject(ORDER_REPO) private readonly repo: IOrderRepo,
    @Inject(ORDER_ITEM_REPO) private readonly itemRepo: IOrderItemRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @Inject(PRODUCT_REPO) private readonly productRepo: IProductRepo,
    @Inject(PRODUCT_BRANCH_PRICE_REPO) private readonly productBranchPriceRepo: IProductBranchPriceRepo,
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    private readonly billCompletionService: BillCompletionService,
    @Inject(CUSTOMER_REPO) private readonly customerRepo: { getAsync: (id: string) => Promise<{ email?: string; name?: string } | null> },
    private readonly mailService: OrdersMailService,
    @Inject(PUSH_NOTIFICATION_SERVICE) private readonly pushService: IPushNotificationService,
    private readonly activityLog: ActivityLogService,
    private readonly organizationSettings: OrganizationSettingsService,
    @InjectPinoLogger(CreateOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateOrderCommand): Promise<Order> {
    this.logger.info(`Executing ${CreateOrderCommand.name}`);

    const sellingLocation = await this.locationRepo.getAsync(command.locationId);
    if (!sellingLocation) {
      throw new NotFoundException(`Location ${command.locationId} not found`);
    }

    const resolvedItems = await this.resolveItemPricesAsync(
      command.items ?? [],
      sellingLocation.branchId ?? null,
      command.customerType,
    );

    const subtotal     = resolvedItems.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);
    const taxAmount    = resolvedItems.reduce((acc, i) => acc + Number(i.taxAmount ?? 0), 0);
    const totalAmount  = subtotal + taxAmount;

    const orderData = {
      ...command,
      organizationId: sellingLocation.organizationId,
      fulfillmentLocationId: command.fulfillmentLocationId ?? command.locationId,
      fulfillmentMode: command.fulfillmentMode ?? EFulfillmentMode.Delivery,
      status: command.status ?? EOrderStatus.Confirmed,
      orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      subtotal,
      taxAmount,
      totalAmount,
      items: undefined,
    };

    const order = await this.repo.createAsync(orderData as never);

    const savedItems: OrderItem[] = [];
    for (const input of resolvedItems) {
      const itemTaxAmount = Number(input.taxAmount ?? 0);
      const item = new OrderItem();
      item.orderId          = order.id;
      item.productId        = input.productId;
      item.quantity         = input.quantity;
      item.unitPrice        = input.unitPrice;
      item.taxAmount        = itemTaxAmount;
      item.lineTotal        = Number(input.quantity) * Number(input.unitPrice) + itemTaxAmount;
      item.packQuantity     = input.packQuantity;
      item.packSizeSnapshot = input.packSizeSnapshot;
      savedItems.push(await this.itemRepo.createAsync(item));
    }

    order.items = savedItems;

    try {
      await this.createOrderBillAsync(order, sellingLocation.organizationId, command);
    } catch (err) {
      if (err instanceof CreditLimitExceededError) throw err;
      this.logger.warn({ error: (err as Error).message }, 'Auto-bill creation failed — non-fatal');
    }
    await this.sendOrderConfirmedAsync(order).catch((err: Error) =>
      this.logger.warn({ error: err.message }, 'Order confirmed mail failed — non-fatal'),
    );
    await this.sendOrderPushAsync(order).catch((err: Error) =>
      this.logger.warn({ error: err.message }, 'Order push notification failed — non-fatal'),
    );

    this.activityLog.record({
      action: EActivityAction.SaleCreated,
      entityType: 'Order',
      entityId: order.id,
      actorId: command.performedById,
      organizationId: order.organizationId ?? sellingLocation.organizationId,
      locationId: command.locationId,
      metadata: { orderNumber: order.orderNumber, totalAmount: order.totalAmount, status: order.status },
    });
    return { ...order, items: savedItems };
  }

  private async resolveItemPricesAsync(
    inputs: CreateOrderItemInput[],
    branchId: string | null,
    customerType?: ECustomerType,
  ): Promise<CreateOrderItemInput[]> {
    return Promise.all(
      inputs.map(async (input) => {
        const [product, branchPrice] = await Promise.all([
          this.productRepo.getAsync(input.productId),
          branchId
            ? this.productBranchPriceRepo.getByBranchAndProductAsync(branchId, input.productId)
            : Promise.resolve(null),
        ]);
        if (!product) return input;
        return { ...input, unitPrice: resolveBranchPrice(branchPrice, product, customerType) };
      }),
    );
  }

  private async createOrderBillAsync(order: Order, organizationId: string, command: CreateOrderCommand): Promise<void> {
    if (!order.locationId) return;
    const bill = new Bill();
    bill.billNumber    = generateBillNumber();
    bill.organizationId = organizationId;
    bill.locationId    = order.locationId;
    bill.customerId    = order.customerId;
    bill.sourceOrderId = order.id;
    bill.status        = EBillStatus.Initiated;
    bill.saleType      = command.saleType ?? ESaleType.Normal;
    bill.customerType  = command.customerType;
    bill.paymentTiming = command.paymentTiming ?? EPaymentTiming.Cod;
    if (bill.paymentTiming === EPaymentTiming.Cod) {
      bill.paymentMethod = EPaymentMethod.Cash;
    }
    bill.partialAmount   = command.paymentTiming === EPaymentTiming.Half ? command.partialAmount : undefined;
    bill.subtotal        = Number(order.subtotal ?? order.totalAmount ?? 0);
    bill.taxAmount       = Number(order.taxAmount ?? 0);
    bill.discountAmount  = 0;
    bill.totalAmount     = Number(order.totalAmount ?? 0);
    bill.blackAmount     = 0;
    bill.commissionAmount = 0;
    const saved = await this.billRepo.createAsync(bill);

    if (command.performedById && saved.saleType === ESaleType.Credit) {
      await this.billCompletionService.assertCreditLimitForBill(saved, command.performedById);
    }
  }

  private async sendOrderConfirmedAsync(order: Order): Promise<void> {
    if (!order.customerId) return;
    const customer = await this.customerRepo.getAsync(order.customerId);
    if (!customer?.email) return;

    const currencyCode = await this.organizationSettings.currencyCode(order.organizationId);
    const fmt = (n: number): string => formatOrganizationCurrency(Number(n), currencyCode);

    await this.mailService.sendTemplatedAsync(customer.email, 'order-confirmed', {
      customerName: customer.name ?? 'Valued Customer',
      orderNumber: order.orderNumber,
      status: order.status,
      totalAmount: fmt(order.totalAmount),
      createdAt: order.createdAt?.toLocaleDateString('en-IN') ?? new Date().toLocaleDateString('en-IN'),
    });
  }

  private async sendOrderPushAsync(order: Order): Promise<void> {
    if (!order.organizationId) return;
    const currencyCode = await this.organizationSettings.currencyCode(order.organizationId);
    await this.pushService.broadcastToOrgAsync(
      order.organizationId,
      'ORDER_CREATED',
      `New order ${order.orderNumber}`,
      `Order placed — total ${formatOrganizationCurrency(Number(order.totalAmount), currencyCode)}`,
      { orderId: order.id },
    );
  }
}
