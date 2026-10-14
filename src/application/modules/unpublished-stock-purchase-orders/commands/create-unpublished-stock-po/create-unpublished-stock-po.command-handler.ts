import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO } from '../../../../constants';
import { UnpublishedStockPurchaseOrder } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { CreateUnpublishedStockPOCommand } from './create-unpublished-stock-po.command';

@CommandHandlerStrict(CreateUnpublishedStockPOCommand)
export class CreateUnpublishedStockPOCommandHandler
  implements ICommandHandler<CreateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly poRepo: IUnpublishedStockPORepo,
    @InjectPinoLogger(CreateUnpublishedStockPOCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateUnpublishedStockPOCommand): Promise<UnpublishedStockPurchaseOrder> {
    this.logger.info(`Executing ${CreateUnpublishedStockPOCommand.name}`);

    return this.poRepo.createWithItemsAsync(command);
  }
}
