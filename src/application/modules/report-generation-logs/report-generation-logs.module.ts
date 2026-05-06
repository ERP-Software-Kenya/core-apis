import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ReportGenerationLogsController } from './report-generation-logs.controller';
import { ReportLogCommandHandlers } from './commands';
import { ReportLogQueryHandlers } from './queries';
import { ReportGenerationLogProfile } from './mapper/report-generation-log.profile';
import { ReportGenerationLogFeatureOptions } from './options/report-generation-log-feature.options';
import { ReportGenerationLogFilterNormalizer } from './helpers/report-generation-log-filter.normalizer';

@Module({
  imports: [CqrsModule],
  controllers: [ReportGenerationLogsController],
  providers: [
    ...ReportLogCommandHandlers,
    ...ReportLogQueryHandlers,
    ReportGenerationLogProfile,
    ReportGenerationLogFeatureOptions,
    ReportGenerationLogFilterNormalizer,
  ],
})
export class ReportGenerationLogsModule {}
