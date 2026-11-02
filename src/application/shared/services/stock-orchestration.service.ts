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
import { EUnitOperation } from '../enums/e-unit-operation';
import { QuantityConversionService } from './quantity-conversion.service';

/** Application-facing stock operations; all persistence and transaction ownership stays in the repository. */
@Injectable()
export class StockOrchestrationService {
  public constructor(
    @Inject(STOCK_OPERATIONS_REPO)
    private readonly repo: IStockOperationsRepo,
    private readonly quantityConversion: QuantityConversionService,
  ) {}

  public async addStock(input: IStockOperation): Promise<void> { return this.repo.addStock(await this.normalize(input, EUnitOperation.Stock)); }
  public async removeStock(input: IStockOperation): Promise<void> { return this.repo.removeStock(await this.normalize(input, EUnitOperation.Stock)); }
  public adjustStock(input: IAdjustStockOperation): Promise<void> { return this.repo.adjustStock(input); }
  public async reserveStock(input: IStockOperation): Promise<void> { return this.repo.reserveStock(await this.normalize(input, EUnitOperation.Sale)); }
  public async releaseReservation(input: IStockOperation): Promise<void> { return this.repo.releaseReservation(await this.normalize(input, EUnitOperation.Sale)); }
  public addUnpublishedStock(input: IAddUnpublishedStockOperation): Promise<void> { return this.repo.addUnpublishedStock(input); }
  public publishStock(input: IPublishStockOperation): Promise<void> { return this.repo.publishStock(input); }
  public async damageStock(input: IStockOperation): Promise<void> { return this.repo.damageStock(await this.normalize(input, EUnitOperation.Stock)); }
  public async writeOffStock(input: IStockOperation): Promise<void> { return this.repo.writeOffStock(await this.normalize(input, EUnitOperation.Stock)); }
  public transferStock(input: ITransferStockOperation): Promise<void> { return this.repo.transferStock(input); }
  public completeTransferBatch(transferId: string, inputs: TransferStockOperationInput[]): Promise<void> {
    return this.repo.completeTransferBatch(transferId, inputs);
  }

  private async normalize(input: IStockOperation, operation: EUnitOperation): Promise<IStockOperation> {
    if (input.quantityComponents?.length) {
      const converted = await this.quantityConversion.convertComponents({
        organizationId: input.organizationId, productId: input.productId,
        components: input.quantityComponents, operation,
      });
      return {
        ...input,
        quantity: Number(converted.baseQuantity),
        baseQuantity: converted.baseQuantity,
        baseUnitId: converted.components[0]?.baseUnitId,
        quantityComponentsSnapshot: converted.components,
      };
    }
    if (!input.productUnitId) return input;
    const converted = await this.quantityConversion.convert({
      organizationId: input.organizationId,
      productId: input.productId,
      productUnitId: input.productUnitId,
      quantity: input.quantity,
      operation,
    });
    return { ...input, quantity: Number(converted.baseQuantity), ...converted };
  }
}
