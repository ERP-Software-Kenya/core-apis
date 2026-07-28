import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { ProductLogEntity } from '../entities';
import { ProductLog, ProductLogFilter } from '../../../application/modules/product-logs/domain';
import { IProductLogRepo } from 'src/application/modules/product-logs';

@Injectable()
export class ProductLogRepo
  extends BaseRepo<ProductLogEntity, ProductLog, string, PageableFilter<ProductLogFilter>, Filter<ProductLogFilter>>
  implements IProductLogRepo
{
  constructor(
    @InjectRepository(ProductLogEntity) internalRepo: Repository<ProductLogEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(ProductLogRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, ProductLogEntity, ProductLog);
  }

  public override get idColumnName(): keyof ProductLogEntity {
    return 'id';
  }
}
