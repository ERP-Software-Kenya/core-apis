import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { STOCK_TRANSFER_REPO } from '../../../../constants';
import { StockTransfer } from '../../domain';
import { IStockTransferRepo } from '../..';
import { GetStockTransferQuery } from './get-stock-transfer.query';

@QueryHandlerStrict(GetStockTransferQuery)
export class GetStockTransferQueryHandler implements IQueryHandler<GetStockTransferQuery, StockTransfer> {
  constructor(
    @Inject(STOCK_TRANSFER_REPO) private readonly repo: IStockTransferRepo,
    @InjectPinoLogger(GetStockTransferQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetStockTransferQuery): Promise<StockTransfer> {
    this.logger.info(`Executing ${GetStockTransferQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
