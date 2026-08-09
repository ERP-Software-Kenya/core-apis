import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict, IBaseRepo, Filter, PageableFilter } from '../../../../../common';
import { BILL_ITEM_REPO, BILL_REPO, CUSTOMER_REPO, INVENTORY_REPO } from '../../../../constants';
import { Bill, BillItem } from '../../domain';
import { IBillRepo } from '../../i-bill.repo';
import { IInventoryRepo } from '../../../inventory/i-inventory.repo';
import { EBillStatus } from '../../../../../infrastructure/persistence/entities/bill.entity';
import { TransitionBillStatusCommand } from './transition-bill-status.command';
import { IMailService, MAIL_SERVICE } from '../../../../../common/mail';
import { IPushNotificationService, PUSH_NOTIFICATION_SERVICE } from '../../../../../common/push-notification';
import { ICustomerRepo } from '../../../customers/i-customer.repo';
import { CustomerFilter } from '../../../customers/domain';

const ALLOWED: Record<EBillStatus, EBillStatus[]> = {
  [EBillStatus.INITIATED]:  [EBillStatus.DRAFT, EBillStatus.CANCELLED],
  [EBillStatus.DRAFT]:      [EBillStatus.COMPLETED, EBillStatus.CANCELLED],
  [EBillStatus.COMPLETED]:  [],
  [EBillStatus.CANCELLED]:  [],
};

@CommandHandlerStrict(TransitionBillStatusCommand)
export class TransitionBillStatusCommandHandler implements ICommandHandler<TransitionBillStatusCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    @Inject(BILL_ITEM_REPO) private readonly itemRepo: IBaseRepo<BillItem, string, PageableFilter<BillItem>, Filter<BillItem>>,
    @Inject(INVENTORY_REPO) private readonly inventoryRepo: IInventoryRepo,
    @Inject(CUSTOMER_REPO) private readonly customerRepo: IBaseRepo<unknown, string, PageableFilter<CustomerFilter>, Filter<CustomerFilter>>,
    @Inject(MAIL_SERVICE) private readonly mailService: IMailService,
    @Inject(PUSH_NOTIFICATION_SERVICE) private readonly pushService: IPushNotificationService,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(TransitionBillStatusCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: TransitionBillStatusCommand): Promise<Bill> {
    this.logger.info(`Executing ${TransitionBillStatusCommand.name} billId=${command.billId} → ${command.status}`);
    const bill = await this.billRepo.getAsync(command.billId);
    if (!bill) throw new NotFoundException(`Bill ${command.billId} not found`);

    if (!ALLOWED[bill.status]?.includes(command.status)) {
      throw new BadRequestException(`Cannot transition bill from ${bill.status} to ${command.status}`);
    }

    if (command.status === EBillStatus.COMPLETED) {
      const items = await this.itemRepo.allAsync({ billId: command.billId } as Filter<BillItem>);
      const runner = this.dataSource.createQueryRunner();
      await runner.connect();
      await runner.startTransaction();
      try {
        for (const item of items) {
          const inv = await this.inventoryRepo.findByOrgLocationProductAsync(
            bill.organizationId, bill.locationId, item.productId, runner.manager,
          );
          if (!inv) throw new BadRequestException(`No inventory found for product ${item.productId} at this location`);
          await this.inventoryRepo.deductStockAsync(inv.id, Number(item.quantity), runner.manager);
        }
        await runner.commitTransaction();
      } catch (err) {
        await runner.rollbackTransaction();
        throw err;
      } finally {
        await runner.release();
      }
      bill.billedAt = new Date();
      await this.sendBillReceiptAsync(bill).catch((err: Error) =>
        this.logger.warn({ error: err.message }, 'Bill receipt mail failed — non-fatal'),
      );
      await this.sendBillPushAsync(bill).catch((err: Error) =>
        this.logger.warn({ error: err.message }, 'Bill push notification failed — non-fatal'),
      );
    }

    bill.status = command.status;
    if (command.paymentMethod) bill.paymentMethod = command.paymentMethod;
    return this.billRepo.updateAsync(bill);
  }

  private async sendBillReceiptAsync(bill: Bill): Promise<void> {
    if (!bill.customerId) return;
    const customer = await this.customerRepo.getAsync(bill.customerId) as { email?: string; name?: string } | null;
    if (!customer?.email) return;

    const fmt = (n: number): string =>
      new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(n));

    await this.mailService.sendTemplatedAsync(customer.email, 'bill-receipt', {
      customerName: customer.name ?? 'Valued Customer',
      billNumber:   bill.billNumber,
      status:       bill.status,
      subtotal:     fmt(bill.subtotal),
      taxAmount:    fmt(bill.taxAmount),
      discount:     fmt(bill.discountAmount),
      totalAmount:  fmt(bill.totalAmount),
      paymentMethod: bill.paymentMethod ?? 'N/A',
      billedAt:     bill.billedAt?.toLocaleDateString('en-IN') ?? new Date().toLocaleDateString('en-IN'),
    });
  }

  private async sendBillPushAsync(bill: Bill): Promise<void> {
    if (!bill.createdById || !bill.organizationId) return;
    const fmt = (n: number): string =>
      new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(n));

    await this.pushService.sendAsync({
      userId:         bill.createdById,
      organizationId: bill.organizationId,
      type:           'BILL_COMPLETED',
      title:          `Bill ${bill.billNumber} completed`,
      body:           `Total ${fmt(bill.totalAmount)} — payment received`,
      data:           { billId: bill.id },
    });
  }
}
