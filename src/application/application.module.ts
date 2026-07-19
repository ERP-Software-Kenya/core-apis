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
import { CustomersModule } from './modules/customers';
import { OrdersModule } from './modules/orders';
import { InvoicesModule } from './modules/invoices';
import { StockTransfersModule } from './modules/stock-transfers';
import { ExpensesModule } from './modules/expenses';
import { PlatformConfigurationsModule } from './modules/platform-configurations';
import { UsersModule } from './modules/users';
import { RolesModule } from './modules/roles';
import { UserRolesModule } from './modules/user-roles';
import { StockMovementsModule } from './modules/stock-movements';
import { PurchaseItemsModule } from './modules/purchase-items';
import { ActivityLogsModule } from './modules/activity-logs';
import { BillsModule } from './modules/bills';
import { PaymentTransactionsModule } from './modules/payment-transactions';
import { ItemReturnsModule } from './modules/item-returns';
import { NotificationsModule } from './modules/notifications';
import { ReportGenerationLogsModule } from './modules/report-generation-logs';
import { VehiclesModule } from './modules/vehicles';
import { AnalyticsModule } from './modules/analytics';
import { DriversModule } from './modules/drivers';
import { MaintenanceModule } from './modules/maintenance';

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
        CustomersModule,
        OrdersModule,
        InvoicesModule,
        StockTransfersModule,
        ExpensesModule,
        PlatformConfigurationsModule,
        UsersModule,
        RolesModule,
        UserRolesModule,
        StockMovementsModule,
        PurchaseItemsModule,
        ActivityLogsModule,
        BillsModule,
        PaymentTransactionsModule,
        ItemReturnsModule,
        NotificationsModule,
        ReportGenerationLogsModule,
        VehiclesModule,
        AnalyticsModule,
        DriversModule,
        MaintenanceModule,
        CommonModule,
      ],
      controllers: [],
      providers: [CqrsMediator],
      exports: [CqrsMediator],
    };
  }
}
