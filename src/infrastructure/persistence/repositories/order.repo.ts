import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { OrderEntity } from '../entities';
import { Order } from '../../../application/modules/orders/domain';
import { IOrderRepo, OrderFilter } from '../../../application/modules/orders';

@Injectable()
export class OrderRepo extends BaseRepo<OrderEntity, Order, string, PageableFilter<OrderFilter>, Filter<OrderFilter>> implements IOrderRepo {
  constructor(
    @InjectRepository(OrderEntity) internalRepo: Repository<OrderEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(OrderRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, OrderEntity, Order);
  }

  public override get idColumnName(): keyof OrderEntity {
    return 'id';
  }
}
