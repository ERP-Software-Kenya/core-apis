import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ActivityLogsController } from './activity-logs.controller';
import { ActivityLogCommandHandlers } from './commands';
import { ActivityLogQueryHandlers } from './queries';
import { ActivityLogProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [ActivityLogsController],
  providers:   [
    ...ActivityLogCommandHandlers,
    ...ActivityLogQueryHandlers,
    ActivityLogProfile,
  ],
})
export class ActivityLogsModule {}
