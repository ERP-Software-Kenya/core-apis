import { Inject } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { REPORT_GENERATION_LOG_REPO, IReportGenerationLogRepo } from '../../i-report-generation-log.repo';
import { ReportGenerationLog, EReportPeriod, EReportType, REPORT_TYPE_LABELS } from '../../domain';
import { GenerateReportCommand } from './generate-report.command';

@CommandHandlerStrict(GenerateReportCommand)
export class GenerateReportCommandHandler implements ICommandHandler<GenerateReportCommand, ReportGenerationLog> {
  constructor(
    @Inject(REPORT_GENERATION_LOG_REPO) private readonly repo: IReportGenerationLogRepo,
    @InjectPinoLogger(GenerateReportCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: GenerateReportCommand): Promise<ReportGenerationLog> {
    this.logger.info(`Executing Command "${GenerateReportCommand.name}"`);

    const fromDate = new Date(command.fromDate);
    const toDate   = new Date(command.toDate);
    toDate.setHours(23, 59, 59, 999);

    const log            = new ReportGenerationLog();
    log.orgId            = command.orgId;
    log.reportType       = command.reportType;
    log.reportPeriod     = command.reportPeriod;
    log.reportName       = this.buildReportName(command.reportType, command.reportPeriod, fromDate, toDate);
    log.fromDate         = fromDate;
    log.toDate           = toDate;
    log.locationId       = command.locationId;
    log.generatedById    = command.generatedById;
    log.status           = 'PROCESSING';

    const saved = await this.repo.createAsync(log);

    try {
      const reportData = await this.repo.buildReportDataAsync({
        orgId:        command.orgId,
        reportType:   command.reportType,
        reportPeriod: command.reportPeriod,
        locationId:   command.locationId,
        fromDate,
        toDate,
        reportName:   saved.reportName,
      });

      saved.status     = 'COMPLETED';
      saved.reportData = reportData as unknown as Record<string, unknown>;
      return this.repo.updateAsync(saved);
    } catch (err) {
      const error = err as Error;
      this.logger.error({ err: error.message }, 'Report aggregation failed');
      saved.status       = 'FAILED';
      saved.errorMessage = error.message;
      return this.repo.updateAsync(saved);
    }
  }

  private buildReportName(type: EReportType, period: EReportPeriod, from: Date, to: Date): string {
    const label = REPORT_TYPE_LABELS[type] ?? type;
    const fmt   = (dt: Date): string => dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    switch (period) {
      case EReportPeriod.Daily:   return `${label} — Daily (${fmt(from)})`;
      case EReportPeriod.Monthly: return `${label} — ${from.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`;
      case EReportPeriod.Yearly:  return `${label} — FY ${from.getFullYear()}–${to.getFullYear()}`;
      case EReportPeriod.Custom:  return `${label} — ${fmt(from)} to ${fmt(to)}`;
    }
  }
}
