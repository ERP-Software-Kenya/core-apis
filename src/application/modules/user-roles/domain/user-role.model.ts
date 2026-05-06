import { AutoMap } from '@automapper/classes';

export class UserRole {
  @AutoMap() public id: string;
  @AutoMap() public userId: string;
  @AutoMap() public roleId: string;
  @AutoMap(() => Date) public createdAt?: Date;
}
