import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PRODUCT_REPO, PURCHASE_ITEM_REPO, PURCHASE_ORDER_REPO } from '../../../../constants';
import { EUnitOperation, QuantityConversionService } from '../../../../shared';
import { PurchaseItem } from '../../domain';
import { IPurchaseItemRepo } from '../..';
import { IProductRepo } from '../../../products';
import { Product } from '../../../products/domain';
import { CreatePurchaseItemCommand } from './create-purchase-item.command';
import { IPurchaseOrderRepo } from '../../../purchase-orders';

@CommandHandlerStrict(CreatePurchaseItemCommand)
export class CreatePurchaseItemCommandHandler implements ICommandHandler<CreatePurchaseItemCommand, PurchaseItem> {
  constructor(
    @Inject(PURCHASE_ITEM_REPO) private readonly repo: IPurchaseItemRepo,
    @Inject(PRODUCT_REPO) private readonly productRepo: IProductRepo,
    @Inject(PURCHASE_ORDER_REPO) private readonly purchaseOrderRepo: IPurchaseOrderRepo,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly quantityConversion: QuantityConversionService,
    @InjectPinoLogger(CreatePurchaseItemCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreatePurchaseItemCommand): Promise<PurchaseItem> {
    this.logger.info(`Executing ${CreatePurchaseItemCommand.name}`);
    const purchaseOrder = await this.purchaseOrderRepo.getAsync(command.purchaseOrderId);
    if (!purchaseOrder || purchaseOrder.organizationId !== command.organizationId) {
      throw new BadRequestException('Purchase order must belong to the current organization');
    }
    const item = this.mapper.map(command, CreatePurchaseItemCommand, PurchaseItem);

    if (command.productUnitId && command.quantityOrdered != null) {
      const converted = await this.quantityConversion.convert({
        organizationId: command.organizationId, productId: command.productId,
        productUnitId: command.productUnitId, quantity: command.quantityOrdered,
        operation: EUnitOperation.Purchase,
      });
      Object.assign(item, converted, {
        quantityOrdered: Number(converted.baseQuantity),
        selectedUnitCost: command.unitCost,
        unitCost: command.unitCost / Number(converted.conversionFactorSnapshot),
        totalCost: command.quantityOrdered * command.unitCost,
      });
    }

    if (command.packQuantity != null && !command.productUnitId) {
      const product: Product = await this.productRepo.getAsync(command.productId);
      if (!product?.packSize) {
        throw new BadRequestException('Product does not have a pack size configured');
      }
      item.quantityOrdered = command.packQuantity * product.packSize;
      item.packSizeSnapshot = product.packSize;
      item.totalCost = item.quantityOrdered * command.unitCost;
    }

    if (item.quantityOrdered == null) {
      throw new BadRequestException('Either quantityOrdered or packQuantity must be provided');
    }

    return this.repo.createAsync(item);
  }
}
