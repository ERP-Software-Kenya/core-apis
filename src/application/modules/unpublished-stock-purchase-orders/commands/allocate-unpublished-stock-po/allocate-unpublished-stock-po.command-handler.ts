import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import {
  UNPUBLISHED_STOCK_PO_REPO,
} from '../../../../constants';
import { UnpublishedStockPurchaseOrder } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { AllocateUnpublishedStockPOCommand } from './allocate-unpublished-stock-po.command';

@CommandHandlerStrict(AllocateUnpublishedStockPOCommand)
export class AllocateUnpublishedStockPOCommandHandler
  implements ICommandHandler<AllocateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly poRepo: IUnpublishedStockPORepo,
    @InjectPinoLogger(AllocateUnpublishedStockPOCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: AllocateUnpublishedStockPOCommand): Promise<UnpublishedStockPurchaseOrder> {
    this.logger.info(`Executing ${AllocateUnpublishedStockPOCommand.name} poId=${command.purchaseOrderId}`);
    return this.poRepo.allocateAsync(command);
  }
}
