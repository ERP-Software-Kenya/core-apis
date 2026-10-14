import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO } from '../../../../constants';
import { BlackPurchaseReturnResult, IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { CreateUnpublishedStockPurchaseReturnCommand } from './create-unpublished-stock-purchase-return.command';

@CommandHandlerStrict(CreateUnpublishedStockPurchaseReturnCommand)
export class CreateUnpublishedStockPurchaseReturnCommandHandler implements ICommandHandler<CreateUnpublishedStockPurchaseReturnCommand, BlackPurchaseReturnResult> {
  constructor(@Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly repo: IUnpublishedStockPORepo) {}
  execute(command: CreateUnpublishedStockPurchaseReturnCommand): Promise<BlackPurchaseReturnResult> {
    return this.repo.createAndFinalizeReturnAsync(command);
  }
}
