import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../../../infrastructure/persistence/entities';
import { Category } from '../domain';
import { CreateCategoryRequest, CategoryResponse, SearchCategoriesRequest, ListCategoriesRequest, UpdateCategoryRequest } from '../models';
import { CreateCategoryCommand, UpdateCategoryCommand } from '../commands';
import { SearchCategoriesQuery, ListCategoriesQuery } from '../queries';

@Injectable()
export class CategoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CategoryEntity, Category);
      createMap(mapper, Category, CategoryEntity);
      createMap(mapper, CreateCategoryRequest, CreateCategoryCommand);
      createMap(mapper, CreateCategoryCommand, Category);
      createMap(mapper, UpdateCategoryRequest, UpdateCategoryCommand);
      createMap(mapper, UpdateCategoryCommand, Category);
      createMap(mapper, SearchCategoriesRequest, SearchCategoriesQuery);
      createMap(mapper, ListCategoriesRequest, ListCategoriesQuery);
      createMap(mapper, Category, CategoryResponse);
    };
  }
}
