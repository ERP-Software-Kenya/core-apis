import { Inject, Injectable } from '@nestjs/common';
import { STOCK_OPERATIONS_REPO } from '../../constants';
import {
  IAddUnpublishedStockOperation,
  IAdjustStockOperation,
  IPublishStockOperation,
  IStockOperation,
  ITransferStockOperation,
  TransferStockOperationInput,
} from '../interfaces/i-stock-operation.interface';
import { IStockOperationsRepo } from '../interfaces/i-stock-operations.repo';

/** Application-facing stock operations; all persistence and transaction ownership stays in the repository. */
@Injectable()
export class StockOrchestrationService {
  public constructor(
    @Inject(STOCK_OPERATIONS_REPO)
    private readonly repo: IStockOperationsRepo,
  ) {}

  public addStock(input: IStockOperation): Promise<void> { return this.repo.addStock(input); }
  public removeStock(input: IStockOperation): Promise<void> { return this.repo.removeStock(input); }
  public adjustStock(input: IAdjustStockOperation): Promise<void> { return this.repo.adjustStock(input); }
  public reserveStock(input: IStockOperation): Promise<void> { return this.repo.reserveStock(input); }
  public releaseReservation(input: IStockOperation): Promise<void> { return this.repo.releaseReservation(input); }
  public addUnpublishedStock(input: IAddUnpublishedStockOperation): Promise<void> { return this.repo.addUnpublishedStock(input); }
  public publishStock(input: IPublishStockOperation): Promise<void> { return this.repo.publishStock(input); }
  public damageStock(input: IStockOperation): Promise<void> { return this.repo.damageStock(input); }
  public writeOffStock(input: IStockOperation): Promise<void> { return this.repo.writeOffStock(input); }
  public transferStock(input: ITransferStockOperation): Promise<void> { return this.repo.transferStock(input); }
  public completeTransferBatch(transferId: string, inputs: TransferStockOperationInput[]): Promise<void> {
    return this.repo.completeTransferBatch(transferId, inputs);
  }
}
