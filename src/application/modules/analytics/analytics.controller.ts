import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser, requireOrganizationId } from '../../../common';
import { GetFleetSummaryKpisQuery } from './queries/get-fleet-summary/get-fleet-summary.query';
import { GetFinancialKpisQuery } from './queries/get-financial-kpis/get-financial-kpis.query';
import { GetSalesSummaryQuery } from './queries/get-sales-summary/get-sales-summary.query';
import { GetRevenueTrendQuery } from './queries/get-revenue-trend/get-revenue-trend.query';
import { GetTopProductsQuery } from './queries/get-top-products/get-top-products.query';
import { GetTopCustomersQuery } from './queries/get-top-customers/get-top-customers.query';
import { GetPurchaseSummaryQuery } from './queries/get-purchase-summary/get-purchase-summary.query';
import { GetPurchaseTrendQuery } from './queries/get-purchase-trend/get-purchase-trend.query';
import { GetTopSuppliersQuery } from './queries/get-top-suppliers/get-top-suppliers.query';
import { GetInventorySummaryQuery } from './queries/get-inventory-summary/get-inventory-summary.query';
import { GetStockByLocationQuery } from './queries/get-stock-by-location/get-stock-by-location.query';
import {
  FleetSummaryResponse,
  FinancialKpisResponse,
  SalesSummaryResponse,
  RevenueTrendPointResponse,
  TopProductResponse,
  TopCustomerResponse,
  PurchaseSummaryResponse,
  PurchaseTrendPointResponse,
  TopSupplierResponse,
  InventorySummaryResponse,
  StockByLocationPointResponse,
} from './models';

@ApiBearerAuth()
@ApiTags('Analytics')
@UseGuards(ClerkAuthGuard)
@Controller({ path: 'analytics', version: '1' })
export class AnalyticsController {
  public constructor(
    protected readonly mediator: CqrsMediator,
    @InjectPinoLogger(AnalyticsController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Get fleet summary KPIs' })
  @ApiOkResponse({ type: FleetSummaryResponse })
  @Get('fleet-summary')
  public async getFleetSummary(): Promise<FleetSummaryResponse> {
    return this.mediator.execute<GetFleetSummaryKpisQuery, FleetSummaryResponse>(new GetFleetSummaryKpisQuery());
  }

  @ApiOperation({ summary: 'Get financial KPIs' })
  @ApiOkResponse({ type: FinancialKpisResponse })
  @Get('financials')
  public async getFinancialKpis(): Promise<FinancialKpisResponse> {
    return this.mediator.execute<GetFinancialKpisQuery, FinancialKpisResponse>(new GetFinancialKpisQuery());
  }

  @ApiOperation({ summary: 'Get sales summary KPIs' })
  @ApiOkResponse({ type: SalesSummaryResponse })
  @Get('sales-summary')
  public async getSalesSummary(@CurrentUser() user?: AuthenticatedUser): Promise<SalesSummaryResponse> {
    const query = new GetSalesSummaryQuery();
    query.organizationId = requireOrganizationId(user);
    return this.mediator.execute<GetSalesSummaryQuery, SalesSummaryResponse>(query);
  }

  @ApiOperation({ summary: 'Get revenue trend for the past N months' })
  @ApiOkResponse({ type: [RevenueTrendPointResponse] })
  @Get('revenue-trend')
  public async getRevenueTrend(
    @Query('months') rawMonths?: string,
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<RevenueTrendPointResponse[]> {
    const query = new GetRevenueTrendQuery();
    query.organizationId = requireOrganizationId(user);
    query.months = rawMonths ? Math.max(1, Math.min(24, parseInt(rawMonths, 10))) : 6;
    return this.mediator.execute<GetRevenueTrendQuery, RevenueTrendPointResponse[]>(query);
  }

  @ApiOperation({ summary: 'Get top products by revenue from completed bills' })
  @ApiOkResponse({ type: [TopProductResponse] })
  @Get('top-products')
  public async getTopProducts(
    @Query('limit') rawLimit?: string,
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<TopProductResponse[]> {
    const query = new GetTopProductsQuery();
    query.organizationId = requireOrganizationId(user);
    query.limit = rawLimit ? Math.max(1, Math.min(50, parseInt(rawLimit, 10))) : 10;
    return this.mediator.execute<GetTopProductsQuery, TopProductResponse[]>(query);
  }

  @ApiOperation({ summary: 'Get top customers by spend on completed bills' })
  @ApiOkResponse({ type: [TopCustomerResponse] })
  @Get('top-customers')
  public async getTopCustomers(
    @Query('limit') rawLimit?: string,
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<TopCustomerResponse[]> {
    const query = new GetTopCustomersQuery();
    query.organizationId = requireOrganizationId(user);
    query.limit = rawLimit ? Math.max(1, Math.min(50, parseInt(rawLimit, 10))) : 10;
    return this.mediator.execute<GetTopCustomersQuery, TopCustomerResponse[]>(query);
  }

  @ApiOperation({ summary: 'Get purchase summary KPIs' })
  @ApiOkResponse({ type: PurchaseSummaryResponse })
  @Get('purchase-summary')
  public async getPurchaseSummary(@CurrentUser() user?: AuthenticatedUser): Promise<PurchaseSummaryResponse> {
    const query = new GetPurchaseSummaryQuery();
    query.organizationId = requireOrganizationId(user);
    return this.mediator.execute<GetPurchaseSummaryQuery, PurchaseSummaryResponse>(query);
  }

  @ApiOperation({ summary: 'Get purchase trend for the past N months' })
  @ApiOkResponse({ type: [PurchaseTrendPointResponse] })
  @Get('purchase-trend')
  public async getPurchaseTrend(
    @Query('months') rawMonths?: string,
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<PurchaseTrendPointResponse[]> {
    const query = new GetPurchaseTrendQuery();
    query.organizationId = requireOrganizationId(user);
    query.months = rawMonths ? Math.max(1, Math.min(24, parseInt(rawMonths, 10))) : 6;
    return this.mediator.execute<GetPurchaseTrendQuery, PurchaseTrendPointResponse[]>(query);
  }

  @ApiOperation({ summary: 'Get top suppliers by spend on received purchase orders' })
  @ApiOkResponse({ type: [TopSupplierResponse] })
  @Get('top-suppliers')
  public async getTopSuppliers(
    @Query('limit') rawLimit?: string,
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<TopSupplierResponse[]> {
    const query = new GetTopSuppliersQuery();
    query.organizationId = requireOrganizationId(user);
    query.limit = rawLimit ? Math.max(1, Math.min(50, parseInt(rawLimit, 10))) : 10;
    return this.mediator.execute<GetTopSuppliersQuery, TopSupplierResponse[]>(query);
  }

  @ApiOperation({ summary: 'Get inventory summary KPIs (total SKUs, low stock, zero stock, valuation)' })
  @ApiOkResponse({ type: InventorySummaryResponse })
  @Get('inventory-summary')
  public async getInventorySummary(@CurrentUser() user?: AuthenticatedUser): Promise<InventorySummaryResponse> {
    const query = new GetInventorySummaryQuery();
    query.organizationId = requireOrganizationId(user);
    return this.mediator.execute<GetInventorySummaryQuery, InventorySummaryResponse>(query);
  }

  @ApiOperation({ summary: 'Get stock totals and valuation grouped by location' })
  @ApiOkResponse({ type: [StockByLocationPointResponse] })
  @Get('stock-by-location')
  public async getStockByLocation(@CurrentUser() user?: AuthenticatedUser): Promise<StockByLocationPointResponse[]> {
    const query = new GetStockByLocationQuery();
    query.organizationId = requireOrganizationId(user);
    return this.mediator.execute<GetStockByLocationQuery, StockByLocationPointResponse[]>(query);
  }
}
