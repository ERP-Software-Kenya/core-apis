import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ITEM_RETURN_REPO, IItemReturnRepo } from '../..';
import { DeleteItemReturnCommand } from './delete-item-return.command';

@CommandHandler(DeleteItemReturnCommand)
export class DeleteItemReturnCommandHandler implements ICommandHandler<DeleteItemReturnCommand, boolean> {
  constructor(
    @Inject(ITEM_RETURN_REPO) protected readonly repo: IItemReturnRepo,
    @InjectPinoLogger(DeleteItemReturnCommandHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteItemReturnCommand): Promise<boolean> {
    this.logger.info(`Executing Command "${DeleteItemReturnCommand.name}"`);
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
