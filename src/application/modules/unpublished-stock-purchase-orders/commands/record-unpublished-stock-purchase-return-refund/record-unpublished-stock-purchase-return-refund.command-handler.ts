import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO } from '../../../../constants';
import { BlackPurchaseReturnRefundResult, IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { RecordUnpublishedStockPurchaseReturnRefundCommand } from './record-unpublished-stock-purchase-return-refund.command';

@CommandHandlerStrict(RecordUnpublishedStockPurchaseReturnRefundCommand)
export class RecordUnpublishedStockPurchaseReturnRefundCommandHandler implements ICommandHandler<RecordUnpublishedStockPurchaseReturnRefundCommand, BlackPurchaseReturnRefundResult> {
  constructor(@Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly repo: IUnpublishedStockPORepo) {}
  execute(command: RecordUnpublishedStockPurchaseReturnRefundCommand): Promise<BlackPurchaseReturnRefundResult> {
    return this.repo.recordReturnRefundAsync(command);
  }
}
