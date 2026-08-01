import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindManyOptions, IsNull, Not, Repository } from 'typeorm';
import { BaseRepo } from '../../../common';
import { Filter, PageableFilter } from '../../../common';
import { CategoryEntity } from '../entities';
import { CategoryFilter, Category } from '../../../application/modules/categories/domain';
import { ICategoryRepo } from 'src/application/modules/categories';

@Injectable()
export class CategoryRepo extends BaseRepo<CategoryEntity, Category, string, PageableFilter<CategoryFilter>, Filter<CategoryFilter>> implements ICategoryRepo {
  constructor(
    @InjectRepository(CategoryEntity) internalRepo: Repository<CategoryEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(CategoryRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, CategoryEntity, Category);
  }

  public override get idColumnName(): keyof CategoryEntity {
    return 'id';
  }

  public override get specialFilterFields(): (keyof PageableFilter<CategoryFilter>)[] {
    return [...super.specialFilterFields, 'hasParent'];
  }

  protected override modifyFindOption(
    findOpts: FindManyOptions<CategoryEntity>,
    filterObj: Filter<CategoryFilter> | PageableFilter<CategoryFilter>,
  ): void {
    if (filterObj.hasParent === true) {
      (findOpts.where as Record<string, unknown>).parentId = Not(IsNull());
    }
  }
}
