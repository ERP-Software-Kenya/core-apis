import { AutoMap } from '@automapper/classes';

export class Supplier {
  @AutoMap() public id: string;
  @AutoMap() public organizationId?: string;
  @AutoMap() public name?: string;
  @AutoMap() public contactPerson?: string;
  @AutoMap() public email?: string;
  @AutoMap() public phone?: string;
  @AutoMap() public address?: string;
  @AutoMap() public taxId?: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
