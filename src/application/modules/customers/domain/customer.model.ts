import { AutoMap } from '@automapper/classes';

export class Customer {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public name: string;
  @AutoMap() public email?: string;
  @AutoMap() public phone?: string;
  @AutoMap() public gstin?: string;
  @AutoMap(() => Date) public createdAt: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
  @AutoMap(() => Date) public deletedAt?: Date;
}
