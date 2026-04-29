import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../../../infrastructure/persistence/entities';
import { Product } from '../domain';
import { CreateProductRequest, ProductResponse, UpdateProductRequest } from '../models';
import { CreateProductCommand, UpdateProductCommand } from '../commands';

@Injectable()
export class ProductProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, ProductEntity, Product);
      createMap(mapper, Product, ProductEntity);
      createMap(mapper, CreateProductRequest, CreateProductCommand);
      createMap(mapper, UpdateProductRequest, UpdateProductCommand);
      createMap(mapper, Product, ProductResponse);
    };
  }
}
