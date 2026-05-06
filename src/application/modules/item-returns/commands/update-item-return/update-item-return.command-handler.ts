import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ITEM_RETURN_REPO, IItemReturnRepo } from '../..';
import { ItemReturn } from '../../domain';
import { UpdateItemReturnCommand } from './update-item-return.command';

@CommandHandler(UpdateItemReturnCommand)
export class UpdateItemReturnCommandHandler implements ICommandHandler<UpdateItemReturnCommand, ItemReturn> {
  constructor(
    @Inject(ITEM_RETURN_REPO) protected readonly repo: IItemReturnRepo,
    @InjectPinoLogger(UpdateItemReturnCommandHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateItemReturnCommand): Promise<ItemReturn> {
    this.logger.info(`Executing Command "${UpdateItemReturnCommand.name}"`);
    const itemReturn = await this.repo.getAsync(command.id);
    if (command.status) itemReturn.status = command.status;
    if (command.totalAmount !== undefined) itemReturn.totalAmount = command.totalAmount;
    return this.repo.updateAsync(itemReturn);
  }
}
