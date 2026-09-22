import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindManyOptions, FindOptionsWhere, ILike, IsNull, Repository } from 'typeorm';
import { BaseRepo, isNilOrEmpty } from '../../../common';
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

  public override get specialFilterFields(): (keyof PageableFilter<ProductFilter>)[] {
    return [...super.specialFilterFields, 'search'];
  }

  public override async getAsync(id: string): Promise<Product> {
    const entity = await this.internalRepo.findOne({
      where: { id, deletedAt: IsNull() } as FindOptionsWhere<ProductEntity>,
      relations: ['tax'],
    });
    if (!entity) {
      return null;
    }
    return this.mapper.map(entity, ProductEntity, Product);
  }

  protected override modifyFindOption(findOpts: FindManyOptions<ProductEntity>, filterObj: Filter<ProductFilter> | PageableFilter<ProductFilter>): void {
    const search = (filterObj as ProductFilter).search;
    if (isNilOrEmpty(search)) {
      return;
    }
    const term = ILike(`%${search}%`);
    const baseWhere = (findOpts.where ?? {}) as FindOptionsWhere<ProductEntity>;
    findOpts.where = [
      { ...baseWhere, name: term },
      { ...baseWhere, sku: term },
      { ...baseWhere, barcode: term },
    ];
  }
}
