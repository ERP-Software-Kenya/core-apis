import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO, UNPUBLISHED_STOCK_PI_REPO } from '../../../../constants';
import { UnpublishedStockPurchaseOrder } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { IUnpublishedStockPIRepo } from '../../i-unpublished-stock-pi.repo';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';
import { ReceiveUnpublishedStockPOCommand } from './receive-unpublished-stock-po.command';

const BLOCKED_STATUSES: EPurchaseOrderStatus[] = [
  EPurchaseOrderStatus.Allocated,
  EPurchaseOrderStatus.Cancelled,
];

@CommandHandlerStrict(ReceiveUnpublishedStockPOCommand)
export class ReceiveUnpublishedStockPOCommandHandler
  implements ICommandHandler<ReceiveUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly poRepo: IUnpublishedStockPORepo,
    @Inject(UNPUBLISHED_STOCK_PI_REPO) private readonly itemRepo: IUnpublishedStockPIRepo,
    @InjectPinoLogger(ReceiveUnpublishedStockPOCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ReceiveUnpublishedStockPOCommand): Promise<UnpublishedStockPurchaseOrder> {
    this.logger.info(`Executing ${ReceiveUnpublishedStockPOCommand.name} poId=${command.purchaseOrderId}`);
    const po = await this.poRepo.getAsync(command.purchaseOrderId);

    if (BLOCKED_STATUSES.includes(po.status)) {
      throw new BadRequestException(`Cannot receive items for a purchase order with status "${po.status}"`);
    }

    for (const recv of command.items) {
      const item = await this.itemRepo.getAsync(recv.purchaseItemId);
      item.quantityReceived = Number(item.quantityReceived ?? 0) + Number(recv.quantityReceived);
      await this.itemRepo.updateAsync(item);
    }

    const allItems = await this.itemRepo.allAsync({ purchaseOrderId: command.purchaseOrderId });
    const allDone  = allItems.every(ii => Number(ii.quantityReceived ?? 0) >= Number(ii.quantityOrdered));
    const anyDone  = allItems.some(ii => Number(ii.quantityReceived ?? 0) > 0);

    if (allDone) {
      po.status     = EPurchaseOrderStatus.Received;
      po.receivedAt = new Date();
    } else if (anyDone) {
      po.status = EPurchaseOrderStatus.PartiallyReceived;
    }

    return this.poRepo.updateAsync(po);
  }
}
