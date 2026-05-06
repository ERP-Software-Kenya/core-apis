import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { REPORT_GENERATION_LOG_REPO, IReportGenerationLogRepo } from '../..';
import { DeleteReportLogCommand } from '../index';

@CommandHandler(DeleteReportLogCommand)
export class DeleteReportLogCommandHandler implements ICommandHandler<DeleteReportLogCommand, boolean> {
  constructor(
    @Inject(REPORT_GENERATION_LOG_REPO) protected readonly repo: IReportGenerationLogRepo,
    @InjectPinoLogger(DeleteReportLogCommandHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteReportLogCommand): Promise<boolean> {
    this.logger.info(`Executing Command "${DeleteReportLogCommand.name}"`);
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
