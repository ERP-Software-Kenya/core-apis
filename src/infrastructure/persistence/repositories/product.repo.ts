import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { ProductEntity } from '../entities';
import { ProductFilter, Product } from '../../../application/modules/products/domain';
import { IProductRepo } from 'src/application/modules/products';

@Injectable()
export class ProductRepo extends BaseRepo<ProductEntity, Product, string, PageableFilter<ProductFilter>, Filter<ProductFilter>> implements IProductRepo {
  constructor(
    @InjectRepository(ProductEntity) internalRepo: Repository<ProductEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(ProductRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, ProductEntity, Product);
  }

  public override get idColumnName(): keyof ProductEntity {
    return 'id';
  }

  protected override modifyFindOption(
    findOpts: FindManyOptions<ProductEntity>,
    filterObj: Filter<ProductFilter> | PageableFilter<ProductFilter>,
  ): void {
    const searchTerm = (filterObj as ProductFilter).search;
    if (!searchTerm) return;

    const where = findOpts.where as Record<string, unknown>;
    if (!where || Array.isArray(where)) return;

    // Remove the virtual 'search' field BaseRepo added (it's not a real column)
    delete where.search;

    // OR across name and sku, preserving all other conditions (e.g. organizationId)
    findOpts.where = [
      { ...where, name: ILike(`%${searchTerm}%`) },
      { ...where, sku: ILike(`%${searchTerm}%`) },
    ] as FindOptionsWhere<ProductEntity>[];
  }
}
