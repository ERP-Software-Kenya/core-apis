import { AutoMap } from '@automapper/classes';

export class OrganizationUnit {
  @AutoMap() public id: string;
  @AutoMap() public organizationId?: string;
  @AutoMap() public name?: string;
  @AutoMap() public symbol?: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap() public sortOrder?: number;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
