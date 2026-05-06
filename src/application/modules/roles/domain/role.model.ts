import { AutoMap } from '@automapper/classes';

export class Role {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public name: string;
  @AutoMap() public permissions: Record<string, any>;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
