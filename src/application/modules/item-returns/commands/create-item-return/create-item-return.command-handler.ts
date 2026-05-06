import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ITEM_RETURN_REPO, IItemReturnRepo } from '../..';
import { ItemReturn } from '../../domain';
import { CreateItemReturnCommand } from './create-item-return.command';

@CommandHandler(CreateItemReturnCommand)
export class CreateItemReturnCommandHandler implements ICommandHandler<CreateItemReturnCommand, ItemReturn> {
  constructor(
    @Inject(ITEM_RETURN_REPO) protected readonly repo: IItemReturnRepo,
    @InjectPinoLogger(CreateItemReturnCommandHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateItemReturnCommand): Promise<ItemReturn> {
    this.logger.info(`Executing Command "${CreateItemReturnCommand.name}"`);
    const itemReturn = new ItemReturn();
    itemReturn.storeId = command.storeId;
    itemReturn.orderId = command.orderId;
    itemReturn.supplierId = command.supplierId;
    itemReturn.returnType = command.returnType;
    itemReturn.status = command.status || 'PENDING';
    itemReturn.totalAmount = command.totalAmount;
    return this.repo.createAsync(itemReturn);
  }
}
