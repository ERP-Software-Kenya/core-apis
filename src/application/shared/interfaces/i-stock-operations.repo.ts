import {
  IAddUnpublishedStockOperation,
  IAdjustStockOperation,
  IPublishStockOperation,
  IStockOperation,
  ITransferStockOperation,
  TransferStockOperationInput,
} from './i-stock-operation.interface';

export interface IStockOperationsRepo {
  addStock(input: IStockOperation): Promise<void>;
  removeStock(input: IStockOperation): Promise<void>;
  adjustStock(input: IAdjustStockOperation): Promise<void>;
  reserveStock(input: IStockOperation): Promise<void>;
  releaseReservation(input: IStockOperation): Promise<void>;
  damageStock(input: IStockOperation): Promise<void>;
  writeOffStock(input: IStockOperation): Promise<void>;
  addUnpublishedStock(input: IAddUnpublishedStockOperation): Promise<void>;
  publishStock(input: IPublishStockOperation): Promise<void>;
  transferStock(input: ITransferStockOperation): Promise<void>;
  completeTransferBatch(transferId: string, inputs: TransferStockOperationInput[]): Promise<void>;
}
