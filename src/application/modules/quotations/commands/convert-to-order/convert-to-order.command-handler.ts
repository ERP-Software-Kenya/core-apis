import { BadRequestException, ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { ORDER_REPO } from '../../../../constants';
import { IOrderRepo } from '../../../orders/i-order.repo';
import { Order } from '../../../orders/domain';
import { ConvertToOrderCommand } from './convert-to-order.command';
import {
  OrderEntity,
  OrderItemEntity,
  QuotationEntity,
  QuotationItemEntity,
} from '../../../../../infrastructure/persistence/entities';
import { EQuotationStatus } from '../../../../shared/enums';
import { EFulfillmentMode } from '../../../../shared/enums/e-fulfillment-mode';
import { EOrderStatus } from '../../../../shared/enums/e-order-status';

@CommandHandlerStrict(ConvertToOrderCommand)
export class ConvertToOrderCommandHandler
  implements ICommandHandler<ConvertToOrderCommand, Order>
{
  constructor(
    private readonly dataSource: DataSource,
    @Inject(ORDER_REPO) private readonly orderRepo: IOrderRepo,
    @InjectPinoLogger(ConvertToOrderCommandHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ConvertToOrderCommand): Promise<Order> {
    this.logger.info(`Executing ${ConvertToOrderCommand.name} for quotation ${command.id}`);

    const orderId = await this.dataSource.transaction(async (manager) => {
      // Pessimistic lock row to avoid race condition double-conversion
      const quotation = await manager
        .createQueryBuilder(QuotationEntity, 'q')
        .setLock('pessimistic_write')
        .where('q.id = :id', { id: command.id })
        .getOne();

      if (!quotation) {
        throw new NotFoundException(`Quotation ${command.id} not found`);
      }

      quotation.items = await manager.find(QuotationItemEntity, {
        where: { quotationId: quotation.id },
      });

      if (quotation.convertedOrderId) {
        throw new ConflictException(
          `Quotation ${quotation.quoteNumber} has already been converted to order ${quotation.convertedOrderId}`,
        );
      }

      if (quotation.status === EQuotationStatus.Cancelled) {
        throw new BadRequestException(`Cannot convert a CANCELLED quotation`);
      }

      if (quotation.status === EQuotationStatus.Superseded) {
        throw new BadRequestException(
          `Cannot convert quotation ${quotation.quoteNumber} because it has been SUPERSEDED by a newer revision.`,
        );
      }

      if (!quotation.items || quotation.items.length === 0) {
        throw new BadRequestException(`Quotation has no line items to convert`);
      }

      const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const order = manager.create(OrderEntity, {
        orderNumber,
        locationId: quotation.locationId,
        customerId: quotation.customerId,
        status: EOrderStatus.Confirmed,
        subtotal: quotation.subtotal,
        taxAmount: quotation.taxAmount,
        totalAmount: quotation.totalAmount,
        paymentStatus: 'UNPAID',
        fulfillmentMode: command.fulfillmentMode ?? EFulfillmentMode.Delivery,
        fulfillmentLocationId: command.fulfillmentLocationId ?? quotation.locationId,
        sourceQuotationId: quotation.id,
      });

      const savedOrder = await manager.save(OrderEntity, order);

      // Create Order Items
      const orderItems = quotation.items.map((item) =>
        manager.create(OrderItemEntity, {
          orderId: savedOrder.id,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          unitPrice: item.unitTaxable,
          taxAmount: item.taxAmount,
          lineTotal: item.lineTotal,
        }),
      );

      await manager.save(OrderItemEntity, orderItems);

      // Update Quotation status and converted link
      quotation.status = EQuotationStatus.Converted;
      quotation.convertedOrderId = savedOrder.id;
      await manager.save(QuotationEntity, quotation);

      return savedOrder.id;
    });

    const result = await this.orderRepo.getWithItemsAsync(orderId);
    if (!result) {
      throw new NotFoundException(`Generated order ${orderId} could not be retrieved`);
    }
    return result;
  }
}
