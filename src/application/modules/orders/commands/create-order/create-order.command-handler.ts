import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ORDER_REPO } from '../../../../constants';
import { Order } from '../../domain';
import { IOrderRepo } from '../..';
import { CreateOrderCommand } from './create-order.command';
import { v4 as uuidv4 } from 'uuid';

@CommandHandlerStrict(CreateOrderCommand)
export class CreateOrderCommandHandler implements ICommandHandler<CreateOrderCommand, Order> {
  constructor(
    @Inject(ORDER_REPO) private readonly repo: IOrderRepo,
    @InjectPinoLogger(CreateOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateOrderCommand): Promise<Order> {
    this.logger.info(`Executing ${CreateOrderCommand.name}`);
    const orderData = {
      ...command,
      orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };
    return this.repo.createAsync(orderData as any);
  }
}
