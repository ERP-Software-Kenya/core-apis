import { AutoMap } from '@automapper/classes';

export class Notification {
  @AutoMap() public id: string;
  @AutoMap() public userId: string;
  @AutoMap() public orgId: string;
  @AutoMap() public type: string;
  @AutoMap() public title: string;
  @AutoMap() public body: string;
  @AutoMap(() => Date) public readAt?: Date;
  @AutoMap(() => Date) public createdAt: Date;
}
