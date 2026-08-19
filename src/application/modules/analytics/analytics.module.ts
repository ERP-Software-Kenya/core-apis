import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AnalyticsController } from './analytics.controller';
import { GetFleetSummaryKpisHandler } from './queries/get-fleet-summary';
import { GetFinancialKpisHandler } from './queries/get-financial-kpis';
import { GetSalesSummaryHandler } from './queries/get-sales-summary';
import { GetRevenueTrendHandler } from './queries/get-revenue-trend';
import { GetTopProductsHandler } from './queries/get-top-products';
import { GetTopCustomersHandler } from './queries/get-top-customers';
import { GetPurchaseSummaryHandler } from './queries/get-purchase-summary';
import { GetPurchaseTrendHandler } from './queries/get-purchase-trend';
import { GetTopSuppliersHandler } from './queries/get-top-suppliers';
import { GetInventorySummaryHandler } from './queries/get-inventory-summary';
import { GetStockByLocationHandler } from './queries/get-stock-by-location';

@Module({
  imports: [CqrsModule],
  controllers: [AnalyticsController],
  providers: [
    GetFleetSummaryKpisHandler,
    GetFinancialKpisHandler,
    GetSalesSummaryHandler,
    GetRevenueTrendHandler,
    GetTopProductsHandler,
    GetTopCustomersHandler,
    GetPurchaseSummaryHandler,
    GetPurchaseTrendHandler,
    GetTopSuppliersHandler,
    GetInventorySummaryHandler,
    GetStockByLocationHandler,
  ],
})
export class AnalyticsModule {}
