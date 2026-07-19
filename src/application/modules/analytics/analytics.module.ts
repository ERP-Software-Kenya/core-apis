import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AnalyticsController } from './analytics.controller';
import { GetFleetSummaryKpisHandler } from './queries/get-fleet-summary/get-fleet-summary.handler';
import { GetFinancialKpisHandler } from './queries/get-financial-kpis/get-financial-kpis.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AnalyticsController],
  providers: [GetFleetSummaryKpisHandler, GetFinancialKpisHandler],
})
export class AnalyticsModule {}
