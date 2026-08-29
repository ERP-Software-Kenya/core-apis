import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { RpcBadRequestException } from '../../../../../common/exceptions/base/rpc-bad-request.exception';
import { IPushNotificationService, PUSH_NOTIFICATION_SERVICE } from '../../../../../common';
import { OrderEntity } from '../../../../../infrastructure/persistence/entities';
import { EOrderStatus } from '../../../../shared/enums/e-order-status';
import { CentrifugalService } from '../../../../../common/centrifugal';
import { PackOrderCommand } from './pack-order.command';

@CommandHandlerStrict(PackOrderCommand)
export class PackOrderCommandHandler implements ICommandHandler<PackOrderCommand, OrderEntity> {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly centrifugal: CentrifugalService,
    @Inject(PUSH_NOTIFICATION_SERVICE) private readonly pushService: IPushNotificationService,
    @InjectPinoLogger(PackOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: PackOrderCommand): Promise<OrderEntity> {
    this.logger.info(`Executing Command '${PackOrderCommand.name}' orderId=${command.orderId}`);

    const orderRepo = this.dataSource.getRepository(OrderEntity);
    const order = await orderRepo.findOneOrFail({ where: { id: command.orderId } });

    if (order.claimedByUserId !== command.packerUserId) {
      throw new RpcBadRequestException('Order was not claimed by this user');
    }

    await orderRepo.update(command.orderId, {
      status: EOrderStatus.Packed,
      packedByUserId: command.packerUserId,
      packedAt: new Date(),
    });

    const updated = await orderRepo.findOneOrFail({ where: { id: command.orderId } });

    await this.pushService
      .broadcastToOrgAsync(
        command.organizationId,
        'order:packed',
        'Order Packed',
        `Order #${updated.orderNumber} packed`,
        { orderId: updated.id, orderNumber: updated.orderNumber },
      )
      .catch((err: Error) =>
        this.logger.warn({ error: err.message }, 'Push broadcast failed — non-fatal'),
      );

    await this.centrifugal
      .publish(`org_${command.organizationId}`, {
        type: 'order:packed',
        orderId: updated.id,
        orderNumber: updated.orderNumber,
        packerUserId: command.packerUserId,
      })
      .catch((err: Error) =>
        this.logger.warn({ error: err.message }, 'Centrifugo publish failed — non-fatal'),
      );

    return updated;
  }
}
