export * from './get-activity-log';
export * from './list-activity-logs';

import { GetActivityLogQueryHandler }     from './get-activity-log';
import { ListActivityLogsQueryHandler }   from './list-activity-logs';

export const ActivityLogQueryHandlers = [GetActivityLogQueryHandler, ListActivityLogsQueryHandler];
