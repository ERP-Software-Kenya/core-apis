import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { RpcConflictException } from '../../../../../common/exceptions/base/rpc-conflict.exception';
import { OrderEntity } from '../../../../../infrastructure/persistence/entities';
import { EOrderStatus } from '../../../../shared/enums/e-order-status';
import { ClaimOrderCommand } from './claim-order.command';

@CommandHandlerStrict(ClaimOrderCommand)
export class ClaimOrderCommandHandler implements ICommandHandler<ClaimOrderCommand, OrderEntity> {
  public constructor(
    private readonly dataSource: DataSource,
    @InjectPinoLogger(ClaimOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ClaimOrderCommand): Promise<OrderEntity> {
    this.logger.info(`Executing Command '${ClaimOrderCommand.name}' orderId=${command.orderId}`);

    const result = await this.dataSource
      .createQueryBuilder()
      .update(OrderEntity)
      .set({ claimedByUserId: command.pickerUserId, claimedAt: new Date() })
      .where(
        'id = :orderId AND status = :status AND claimed_by_user_id IS NULL',
        { orderId: command.orderId, status: EOrderStatus.Confirmed },
      )
      .execute();

    if (result.affected === 0) {
      throw new RpcConflictException('Order already claimed or not in confirmed state');
    }

    const order = await this.dataSource.getRepository(OrderEntity).findOneOrFail({ where: { id: command.orderId } });
    return order;
  }
}
