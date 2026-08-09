import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AnalyticsController } from './analytics.controller';
import { GetFleetSummaryKpisHandler } from './queries/get-fleet-summary/get-fleet-summary.handler';
import { GetFinancialKpisHandler } from './queries/get-financial-kpis/get-financial-kpis.handler';
import { GetSalesSummaryHandler } from './queries/get-sales-summary/get-sales-summary.handler';
import { GetRevenueTrendHandler } from './queries/get-revenue-trend/get-revenue-trend.handler';
import { GetTopProductsHandler } from './queries/get-top-products/get-top-products.handler';
import { GetTopCustomersHandler } from './queries/get-top-customers/get-top-customers.handler';
import { GetPurchaseSummaryHandler } from './queries/get-purchase-summary/get-purchase-summary.handler';
import { GetPurchaseTrendHandler } from './queries/get-purchase-trend/get-purchase-trend.handler';
import { GetTopSuppliersHandler } from './queries/get-top-suppliers/get-top-suppliers.handler';

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
  ],
})
export class AnalyticsModule {}
