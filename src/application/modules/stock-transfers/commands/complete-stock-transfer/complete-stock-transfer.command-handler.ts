import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { STOCK_TRANSFER_REPO } from '../../../../constants';
import { StockTransfer } from '../../domain';
import { IStockTransferRepo } from '../..';
import { StockOrchestrationService } from 'src/application/shared';
import { CompleteStockTransferCommand } from './complete-stock-transfer.command';

@CommandHandlerStrict(CompleteStockTransferCommand)
export class CompleteStockTransferCommandHandler implements ICommandHandler<CompleteStockTransferCommand, StockTransfer> {
  constructor(
    @Inject(STOCK_TRANSFER_REPO) private readonly repo: IStockTransferRepo,
    private readonly orchestrator: StockOrchestrationService,
    @InjectPinoLogger(CompleteStockTransferCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CompleteStockTransferCommand): Promise<StockTransfer> {
    this.logger.info(`Executing ${CompleteStockTransferCommand.name} transferId=${command.transferId}`);
    const transfer = await this.repo.getAsync(command.transferId);
    if (transfer.status !== 'PENDING') {
      throw new BadRequestException(`Transfer ${command.transferId} is not in PENDING state`);
    }
    for (const item of command.items) {
      await this.orchestrator.transferStock({
        fromInventoryId: item.fromInventoryId,
        toInventoryId:   item.toInventoryId,
        productId:       item.productId,
        fromLocationId:  item.fromLocationId,
        toLocationId:    item.toLocationId,
        quantity:        item.quantity,
        organizationId:  command.organizationId,
        performedById:   command.performedById,
        referenceId:     command.transferId,
      });
    }
    transfer.status = 'COMPLETED';
    return this.repo.updateAsync(transfer);
  }
}
