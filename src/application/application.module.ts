import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';

import { OrganizationsModule } from './modules/organizations';
import { StoresModule } from './modules/stores';
import { CategoriesModule } from './modules/categories';
import { ProductsModule } from './modules/products';
import { SuppliersModule } from './modules/suppliers';
import { InventoryModule } from './modules/inventory';
import { PurchaseOrdersModule } from './modules/purchase-orders';

import { CqrsMediator, CommonModule } from '../common';

@Module({})
export class ApplicationModule {
  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: ApplicationModule,
      imports: [
        CqrsModule,
        TerminusModule,
        OrganizationsModule,
        StoresModule,
        CategoriesModule,
        ProductsModule,
        SuppliersModule,
        InventoryModule,
        PurchaseOrdersModule,
        CommonModule,
      ],
      controllers: [],
      providers: [CqrsMediator],
      exports: [CqrsMediator],
    };
  }
}
