import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
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
}
