import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { ORDER_REPO } from '../../../../constants';
import { Order } from '../../domain';
import { IOrderRepo } from '../..';
import { GetOrderQuery } from './get-order.query';

@QueryHandlerStrict(GetOrderQuery)
export class GetOrderQueryHandler implements IQueryHandler<GetOrderQuery, Order> {
  constructor(
    @Inject(ORDER_REPO) private readonly repo: IOrderRepo,
    @InjectPinoLogger(GetOrderQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetOrderQuery): Promise<Order> {
    this.logger.info(`Executing ${GetOrderQuery.name} id=${query.id}`);
    const order = await this.repo.getWithItemsAsync(query.id);
    if (!order) {
      throw new NotFoundException(`Order ${query.id} not found`);
    }
    return order;
  }
}
