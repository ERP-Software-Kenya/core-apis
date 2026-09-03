import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ORDER_REPO } from '../../../../../application/constants';
import { IOrderRepo } from '../../../orders';
import { Order } from '../../../orders/domain';
import { MarkOrderPickedUpCommand } from './mark-order-picked-up.command';

@CommandHandlerStrict(MarkOrderPickedUpCommand)
export class MarkOrderPickedUpCommandHandler implements ICommandHandler<MarkOrderPickedUpCommand, Order> {
  public constructor(
    @Inject(ORDER_REPO) private readonly orderRepo: IOrderRepo,
    @InjectPinoLogger(MarkOrderPickedUpCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: MarkOrderPickedUpCommand): Promise<Order> {
    this.logger.info(`Executing Command '${MarkOrderPickedUpCommand.name}' orderId=${command.orderId}`);
    return this.orderRepo.markPickedUpAsync(command.orderId, command.userId);
  }
}
