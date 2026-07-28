import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { STOCK_TRANSFER_REPO } from '../../../../constants';
import { StockTransfer } from '../../domain';
import { IStockTransferRepo } from '../..';
import { CancelStockTransferCommand } from './cancel-stock-transfer.command';

@CommandHandlerStrict(CancelStockTransferCommand)
export class CancelStockTransferCommandHandler implements ICommandHandler<CancelStockTransferCommand, StockTransfer> {
  constructor(
    @Inject(STOCK_TRANSFER_REPO) private readonly repo: IStockTransferRepo,
    @InjectPinoLogger(CancelStockTransferCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CancelStockTransferCommand): Promise<StockTransfer> {
    this.logger.info(`Executing ${CancelStockTransferCommand.name} transferId=${command.transferId}`);
    const transfer = await this.repo.getAsync(command.transferId);
    if (transfer.status !== 'PENDING') {
      throw new BadRequestException(`Transfer ${command.transferId} is not in PENDING state`);
    }
    transfer.status = 'CANCELLED';
    return this.repo.updateAsync(transfer);
  }
}
