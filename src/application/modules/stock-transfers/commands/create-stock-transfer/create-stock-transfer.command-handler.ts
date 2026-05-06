import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { STOCK_TRANSFER_REPO } from '../../../../constants';
import { StockTransfer } from '../../domain';
import { IStockTransferRepo } from '../..';
import { CreateStockTransferCommand } from './create-stock-transfer.command';

@CommandHandlerStrict(CreateStockTransferCommand)
export class CreateStockTransferCommandHandler implements ICommandHandler<CreateStockTransferCommand, StockTransfer> {
  constructor(
    @Inject(STOCK_TRANSFER_REPO) private readonly repo: IStockTransferRepo,
    @InjectPinoLogger(CreateStockTransferCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateStockTransferCommand): Promise<StockTransfer> {
    this.logger.info(`Executing ${CreateStockTransferCommand.name}`);
    const transferData = {
      ...command,
      transferNumber: `STX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };
    return this.repo.createAsync(transferData as any);
  }
}
