import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { GetFleetSummaryKpisQuery } from './queries/get-fleet-summary/get-fleet-summary.query';
import { FleetSummaryResponse } from './models/responses/fleet-summary.response';
import { GetFinancialKpisQuery } from './queries/get-financial-kpis/get-financial-kpis.query';
import { FinancialKpisResponse } from './models/responses/financial-kpis.response';

@ApiTags('Analytics')
@Controller({ path: 'analytics', version: '1' })
export class AnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get fleet summary KPIs' })
  @ApiOkResponse({ type: FleetSummaryResponse })
  @Get('fleet-summary')
  async getFleetSummary() {
    return await this.queryBus.execute(new GetFleetSummaryKpisQuery());
  }

  @ApiOperation({ summary: 'Get financial KPIs' })
  @ApiOkResponse({ type: FinancialKpisResponse })
  @Get('financials')
  async getFinancialKpis() {
    return await this.queryBus.execute(new GetFinancialKpisQuery());
  }
}
