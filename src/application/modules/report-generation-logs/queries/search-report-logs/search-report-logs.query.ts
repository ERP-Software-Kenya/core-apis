import { AutoMap } from '@automapper/classes';
import { PageableFilter } from '../../../../../common';
import { ReportGenerationLogFilter } from '../../domain';
import { ListReportLogsQuery } from '../list-report-logs/list-report-logs.query';

export class SearchReportLogsQuery extends ListReportLogsQuery implements PageableFilter<ReportGenerationLogFilter> {
  @AutoMap() public $page?: number;
  @AutoMap() public $perPage?: number;
}
