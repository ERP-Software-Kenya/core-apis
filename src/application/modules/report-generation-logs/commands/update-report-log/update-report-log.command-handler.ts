import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { REPORT_GENERATION_LOG_REPO, IReportGenerationLogRepo } from '../../i-report-generation-log.repo';
import { ReportGenerationLog } from '../../domain';
import { UpdateReportLogCommand } from './update-report-log.command';

@CommandHandler(UpdateReportLogCommand)
export class UpdateReportLogCommandHandler implements ICommandHandler<UpdateReportLogCommand, ReportGenerationLog> {
  constructor(
    @Inject(REPORT_GENERATION_LOG_REPO) protected readonly repo: IReportGenerationLogRepo,
    @InjectPinoLogger(UpdateReportLogCommandHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateReportLogCommand): Promise<ReportGenerationLog> {
    this.logger.info(`Executing Command "${UpdateReportLogCommand.name}"`);
    const log = await this.repo.getAsync(command.id);
    if (command.status) log.status = command.status;
    if (command.fileUrl) log.fileUrl = command.fileUrl;
    if (command.errorMessage) log.errorMessage = command.errorMessage;
    return this.repo.updateAsync(log);
  }
}
