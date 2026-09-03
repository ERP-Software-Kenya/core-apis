import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { OrderItemEntity } from '../entities';
import { OrderItem, OrderItemFilter } from '../../../application/modules/orders/domain';
import { IOrderItemRepo } from '../../../application/modules/orders/i-order-item.repo';

@Injectable()
export class OrderItemRepo
  extends BaseRepo<OrderItemEntity, OrderItem, string, PageableFilter<OrderItemFilter>, Filter<OrderItemFilter>>
  implements IOrderItemRepo
{
  constructor(
    @InjectRepository(OrderItemEntity) internalRepo: Repository<OrderItemEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(OrderItemRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, OrderItemEntity, OrderItem);
  }

  public override get idColumnName(): keyof OrderItemEntity {
    return 'id';
  }
}
