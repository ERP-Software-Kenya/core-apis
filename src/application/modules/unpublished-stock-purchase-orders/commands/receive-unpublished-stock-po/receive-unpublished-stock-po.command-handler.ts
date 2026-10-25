import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO } from '../../../../constants';
import { UnpublishedStockPurchaseOrder } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { ReceiveUnpublishedStockPOCommand } from './receive-unpublished-stock-po.command';

@CommandHandlerStrict(ReceiveUnpublishedStockPOCommand)
export class ReceiveUnpublishedStockPOCommandHandler
  implements ICommandHandler<ReceiveUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly poRepo: IUnpublishedStockPORepo,
    @InjectPinoLogger(ReceiveUnpublishedStockPOCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ReceiveUnpublishedStockPOCommand): Promise<UnpublishedStockPurchaseOrder> {
    this.logger.info(`Executing ${ReceiveUnpublishedStockPOCommand.name} poId=${command.purchaseOrderId}`);
    return this.poRepo.receiveAsync(command);
  }
}
