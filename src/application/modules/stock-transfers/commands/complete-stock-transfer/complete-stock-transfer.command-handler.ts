import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { EStockTransferStatus, TransferStockOperationInput, StockOrchestrationService } from 'src/application/shared';
import { STOCK_TRANSFER_REPO } from '../../../../constants';
import { StockTransfer } from '../../domain';
import { IStockTransferRepo } from '../..';
import { CompleteTransferItemInput } from '../index';
import { CompleteStockTransferCommand } from './complete-stock-transfer.command';

@CommandHandlerStrict(CompleteStockTransferCommand)
export class CompleteStockTransferCommandHandler implements ICommandHandler<CompleteStockTransferCommand, StockTransfer> {
  constructor(
    @Inject(STOCK_TRANSFER_REPO) private readonly repo: IStockTransferRepo,
    private readonly orchestrator: StockOrchestrationService,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CompleteStockTransferCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CompleteStockTransferCommand): Promise<StockTransfer> {
    this.logger.info(`Executing ${CompleteStockTransferCommand.name} transferId=${command.transferId}`);
    const transfer = await this.repo.getAsync(command.transferId);
    if (transfer.status !== EStockTransferStatus.Pending) {
      throw new BadRequestException(`Transfer ${command.transferId} is not in PENDING state`);
    }
    const inputs = this.mapper.mapArray(command.items, CompleteTransferItemInput, TransferStockOperationInput);
    inputs.forEach((input) => {
      input.organizationId = command.organizationId;
      input.performedById  = command.performedById;
      input.referenceId    = command.transferId;
    });
    await this.orchestrator.completeTransferBatch(command.transferId, inputs);
    return this.repo.getAsync(command.transferId);
  }
}
