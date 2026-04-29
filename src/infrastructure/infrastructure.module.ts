import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { generateDataSourceOptions } from './persistence';
import { IDbOptions } from '../common';
import Entities from './persistence/entities';
import Seeds from './persistence/seeds';
import { EntityMapperProfile } from './persistence/mappers';

import {
  OrganizationRepo,
  StoreRepo,
  CategoryRepo,
  ProductRepo,
  SupplierRepo,
  InventoryRepo,
  PurchaseOrderRepo,
} from './persistence';
import { CATEGORY_REPO, INVENTORY_REPO, ORGANIZATION_REPO, PRODUCT_REPO, PURCHASE_ORDER_REPO, STORE_REPO, SUPPLIER_REPO } from '../application/constants';

@Module({})
export class InfrastructureModule {
  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: InfrastructureModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const opts = configService.get<IDbOptions>('database');
            return {
              ...generateDataSourceOptions(opts),
              retryAttempts: opts?.retryAttempts,
              retryDelay: opts?.retryDelay,
              toRetry: opts?.toRetry,
            };
          },
        }),
        TypeOrmModule.forFeature([...Entities]),
      ],
      providers: [
        EntityMapperProfile,
        ...Seeds,
        { provide: ORGANIZATION_REPO, useClass: OrganizationRepo },
        { provide: STORE_REPO, useClass: StoreRepo },
        { provide: CATEGORY_REPO, useClass: CategoryRepo },
        { provide: PRODUCT_REPO, useClass: ProductRepo },
        { provide: SUPPLIER_REPO, useClass: SupplierRepo },
        { provide: INVENTORY_REPO, useClass: InventoryRepo },
        { provide: PURCHASE_ORDER_REPO, useClass: PurchaseOrderRepo },
      ],
      exports: [
        EntityMapperProfile,
        ORGANIZATION_REPO,
        STORE_REPO,
        CATEGORY_REPO,
        PRODUCT_REPO,
        SUPPLIER_REPO,
        INVENTORY_REPO,
        PURCHASE_ORDER_REPO,
      ],
    };
  }
}
