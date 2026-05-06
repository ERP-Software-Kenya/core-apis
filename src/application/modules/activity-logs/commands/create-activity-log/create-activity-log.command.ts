import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateActivityLogCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public userId?: string;
  @AutoMap() public action: string;
  @AutoMap() public entityName: string;
  @AutoMap() public entityId: string;
  @AutoMap() public details?: Record<string, any>;
}
