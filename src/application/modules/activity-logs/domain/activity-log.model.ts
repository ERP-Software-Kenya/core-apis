import { AutoMap } from '@automapper/classes';

export class ActivityLog {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public userId?: string;
  @AutoMap() public action: string;
  @AutoMap() public entityName: string;
  @AutoMap() public entityId: string;
  @AutoMap() public details?: Record<string, any>;
  @AutoMap(() => Date) public createdAt?: Date;
}
