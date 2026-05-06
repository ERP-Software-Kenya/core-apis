import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { ITEM_RETURN_REPO } from '../../../../constants';
import { ItemReturn } from '../../domain';
import { IItemReturnRepo } from '../..';
import { GetItemReturnQuery } from './get-item-return.query';

@QueryHandlerStrict(GetItemReturnQuery)
export class GetItemReturnQueryHandler implements IQueryHandler<GetItemReturnQuery, ItemReturn> {
  constructor(
    @Inject(ITEM_RETURN_REPO) protected readonly repo: IItemReturnRepo,
    @InjectPinoLogger(GetItemReturnQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetItemReturnQuery): Promise<ItemReturn> {
    this.logger.info(`Executing Query "${GetItemReturnQuery.name}"`);
    return this.repo.getAsync(query.id);
  }
}
