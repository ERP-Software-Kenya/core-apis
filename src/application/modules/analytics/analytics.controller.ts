import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ClerkAuthGuard, CqrsMediator } from '../../../common';
import { GetFleetSummaryKpisQuery } from './queries/get-fleet-summary/get-fleet-summary.query';
import { GetFinancialKpisQuery } from './queries/get-financial-kpis/get-financial-kpis.query';
import { FleetSummaryResponse } from './models/responses/fleet-summary.response';
import { FinancialKpisResponse } from './models/responses/financial-kpis.response';

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
}
