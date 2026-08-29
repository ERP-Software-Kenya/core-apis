import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from '../../../../../common';
import { OrderEntity } from '../../../../../infrastructure/persistence/entities';
import { EOrderStatus } from '../../../../shared/enums/e-order-status';
import { GetOrderQueueQuery } from './get-order-queue.query';

export interface OrderQueueItem {
  id: string;
  orderNumber: string;
  customerId: string;
  locationId: string;
  status: string;
  totalAmount: number;
  createdAt: Date;
}

@QueryHandlerStrict(GetOrderQueueQuery)
export class GetOrderQueueQueryHandler implements IQueryHandler<GetOrderQueueQuery, OrderQueueItem[]> {
  public constructor(
    private readonly dataSource: DataSource,
    @InjectPinoLogger(GetOrderQueueQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetOrderQueueQuery): Promise<OrderQueueItem[]> {
    this.logger.info(`Executing Query '${GetOrderQueueQuery.name}' locationId=${query.locationId}`);

    const orders = await this.dataSource
      .getRepository(OrderEntity)
      .find({
        where: {
          locationId: query.locationId,
          status: EOrderStatus.Confirmed,
          claimedByUserId: undefined,
        },
        order: { createdAt: 'ASC' },
      });

    return orders
      .filter((order) => order.claimedByUserId == null)
      .map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customerId: order.customerId,
        locationId: order.locationId,
        status: order.status,
        totalAmount: Number(order.totalAmount),
        createdAt: order.createdAt,
      }));
  }
}
