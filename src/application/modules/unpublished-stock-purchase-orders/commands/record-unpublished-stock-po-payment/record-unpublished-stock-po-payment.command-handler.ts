import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO } from '../../../../constants';
import { UnpublishedStockPurchaseOrder } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { RecordUnpublishedStockPOPaymentCommand } from './record-unpublished-stock-po-payment.command';

@CommandHandlerStrict(RecordUnpublishedStockPOPaymentCommand)
export class RecordUnpublishedStockPOPaymentCommandHandler
  implements ICommandHandler<RecordUnpublishedStockPOPaymentCommand, UnpublishedStockPurchaseOrder>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly poRepo: IUnpublishedStockPORepo,
    @InjectPinoLogger(RecordUnpublishedStockPOPaymentCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RecordUnpublishedStockPOPaymentCommand): Promise<UnpublishedStockPurchaseOrder> {
    this.logger.info(`Executing ${RecordUnpublishedStockPOPaymentCommand.name} poId=${command.purchaseOrderId}`);
    return this.poRepo.recordPaymentAsync(command);
  }
}
