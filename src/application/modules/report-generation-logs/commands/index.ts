export * from './create-report-log/create-report-log.command';
export * from './create-report-log/create-report-log.command-handler';
export * from './update-report-log/update-report-log.command';
export * from './update-report-log/update-report-log.command-handler';
export * from './delete-report-log/delete-report-log.command';
export * from './delete-report-log/delete-report-log.command-handler';

import { CreateReportLogCommandHandler } from './create-report-log/create-report-log.command-handler';
import { UpdateReportLogCommandHandler } from './update-report-log/update-report-log.command-handler';
import { DeleteReportLogCommandHandler } from './delete-report-log/delete-report-log.command-handler';

export const ReportLogCommandHandlers = [
  CreateReportLogCommandHandler,
  UpdateReportLogCommandHandler,
  DeleteReportLogCommandHandler,
];
