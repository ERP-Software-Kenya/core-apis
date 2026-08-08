import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { ProductSupplierEntity } from '../entities';
import { ProductSupplier } from '../../../application/modules/products/domain';

@Injectable()
export class ProductSupplierRepo extends BaseRepo<ProductSupplierEntity, ProductSupplier, string, PageableFilter<ProductSupplier>, Filter<ProductSupplier>> {
  constructor(
    @InjectRepository(ProductSupplierEntity) internalRepo: Repository<ProductSupplierEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(ProductSupplierRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, ProductSupplierEntity, ProductSupplier);
  }

  public override get idColumnName(): keyof ProductSupplierEntity {
    return 'id';
  }
}
