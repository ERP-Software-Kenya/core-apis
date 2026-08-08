import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ProductEntity, ProductImageEntity, ProductSupplierEntity } from '../../../../infrastructure';
import { Product, ProductImage, ProductSupplier } from '../domain';
import { CreateProductRequest, UpdateProductRequest, ProductResponse, ProductImageResponse, ListProductsRequest, SearchProductsRequest } from '../models';
import { AddProductImageCommand, CreateProductCommand, UpdateProductCommand, LinkProductSupplierCommand, UpdateProductSupplierCommand } from '../commands';
import { ListProductsQuery, SearchProductsQuery } from '../queries';
import { ProductSupplierResponse, LinkProductSupplierRequest, UpdateProductSupplierRequest } from '../models';

@Injectable()
export class ProductProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, ProductEntity, Product);
      createMap(mapper, Product, ProductEntity);
      createMap(mapper, ProductImageEntity, ProductImage);
      createMap(mapper, ProductImage, ProductImageEntity);
      createMap(mapper, ProductSupplierEntity, ProductSupplier);
      createMap(mapper, ProductSupplier, ProductSupplierEntity);
      createMap(mapper, AddProductImageCommand, ProductImage);
      createMap(mapper, ProductImage, ProductImageResponse);
      createMap(mapper, ListProductsRequest, ListProductsQuery);
      createMap(mapper, SearchProductsRequest, SearchProductsQuery);
      createMap(mapper, CreateProductRequest, CreateProductCommand);
      createMap(mapper, CreateProductCommand, Product);
      createMap(mapper, UpdateProductRequest, UpdateProductCommand);
      createMap(mapper, UpdateProductCommand, Product);
      createMap(mapper, Product, ProductResponse);
      createMap(mapper, LinkProductSupplierRequest, LinkProductSupplierCommand);
      createMap(mapper, LinkProductSupplierCommand, ProductSupplier);
      createMap(mapper, UpdateProductSupplierRequest, UpdateProductSupplierCommand);
      createMap(mapper, UpdateProductSupplierCommand, ProductSupplier);
      createMap(mapper, ProductSupplier, ProductSupplierResponse);
    };
  }
}
