import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO, UNPUBLISHED_STOCK_PI_REPO } from '../../../../constants';
import { UnpublishedStockPurchaseOrder, UnpublishedStockPurchaseItem } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { IUnpublishedStockPIRepo } from '../../i-unpublished-stock-pi.repo';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';
import { CreateUnpublishedStockPOCommand } from './create-unpublished-stock-po.command';

@CommandHandlerStrict(CreateUnpublishedStockPOCommand)
export class CreateUnpublishedStockPOCommandHandler
  implements ICommandHandler<CreateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly poRepo: IUnpublishedStockPORepo,
    @Inject(UNPUBLISHED_STOCK_PI_REPO) private readonly itemRepo: IUnpublishedStockPIRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateUnpublishedStockPOCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateUnpublishedStockPOCommand): Promise<UnpublishedStockPurchaseOrder> {
    this.logger.info(`Executing ${CreateUnpublishedStockPOCommand.name}`);

    const po       = this.mapper.map(command, CreateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder);
    po.poNumber    = `BSPO-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    po.status      = EPurchaseOrderStatus.Draft;
    po.totalAmount = 0;

    const savedPo = await this.poRepo.createAsync(po);

    let totalAmount = 0;
    for (const input of command.items) {
      const item             = new UnpublishedStockPurchaseItem();
      item.purchaseOrderId   = savedPo.id;
      item.productId         = input.productId;
      item.quantityOrdered   = input.quantityOrdered;
      item.unitCost          = input.unitCost;
      item.totalCost         = input.quantityOrdered * input.unitCost;
      item.quantityReceived  = 0;
      item.quantityAllocated = 0;
      await this.itemRepo.createAsync(item);
      totalAmount += item.totalCost;
    }

    savedPo.totalAmount = totalAmount;
    return this.poRepo.updateAsync(savedPo);
  }
}
