import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { randomUUID } from 'crypto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { EStockTransferStatus } from 'src/application/shared';
import { STOCK_TRANSFER_REPO } from '../../../../constants';
import { StockTransfer } from '../../domain';
import { IStockTransferRepo } from '../..';
import { CreateStockTransferCommand } from './create-stock-transfer.command';

@CommandHandlerStrict(CreateStockTransferCommand)
export class CreateStockTransferCommandHandler implements ICommandHandler<CreateStockTransferCommand, StockTransfer> {
  constructor(
    @Inject(STOCK_TRANSFER_REPO) private readonly repo: IStockTransferRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateStockTransferCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateStockTransferCommand): Promise<StockTransfer> {
    this.logger.info(`Executing ${CreateStockTransferCommand.name}`);
    const transfer          = this.mapper.map(command, CreateStockTransferCommand, StockTransfer);
    transfer.transferNumber = `STX-${randomUUID()}`;
    transfer.status         = EStockTransferStatus.Pending;
    return this.repo.createAsync(transfer);
  }
}
