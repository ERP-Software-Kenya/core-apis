import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO } from '../../../../constants';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { DeleteUnpublishedStockPOCommand } from './delete-unpublished-stock-po.command';

@CommandHandlerStrict(DeleteUnpublishedStockPOCommand)
export class DeleteUnpublishedStockPOCommandHandler
  implements ICommandHandler<DeleteUnpublishedStockPOCommand, boolean>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly repo: IUnpublishedStockPORepo,
    @InjectPinoLogger(DeleteUnpublishedStockPOCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteUnpublishedStockPOCommand): Promise<boolean> {
    this.logger.info(`Executing ${DeleteUnpublishedStockPOCommand.name} id=${command.id}`);
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
