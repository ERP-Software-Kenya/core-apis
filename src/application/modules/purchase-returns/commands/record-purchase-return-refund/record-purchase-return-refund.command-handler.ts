import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandlerStrict } from '../../../../../common';
import { PURCHASE_RETURN_REPO } from '../../../../constants';
import { IPurchaseReturnRepo, PurchaseReturnRefundResult } from '../../i-purchase-return.repo';
import { RecordPurchaseReturnRefundCommand } from './record-purchase-return-refund.command';
@CommandHandlerStrict(RecordPurchaseReturnRefundCommand)
export class RecordPurchaseReturnRefundCommandHandler implements ICommandHandler<RecordPurchaseReturnRefundCommand, PurchaseReturnRefundResult> {
  constructor(@Inject(PURCHASE_RETURN_REPO) private readonly repo: IPurchaseReturnRepo) {}
  execute(command: RecordPurchaseReturnRefundCommand): Promise<PurchaseReturnRefundResult> { return this.repo.recordRefundAsync(command); }
}
