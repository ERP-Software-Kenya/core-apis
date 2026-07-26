import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { ProductImageEntity } from '../entities';
import { ProductImage } from '../../../application/modules/products/domain';

@Injectable()
export class ProductImageRepo extends BaseRepo<ProductImageEntity, ProductImage, string, PageableFilter<ProductImage>, Filter<ProductImage>> {
  constructor(
    @InjectRepository(ProductImageEntity) internalRepo: Repository<ProductImageEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(ProductImageRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, ProductImageEntity, ProductImage);
  }

  public override get idColumnName(): keyof ProductImageEntity {
    return 'id';
  }
}
