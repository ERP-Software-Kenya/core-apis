import { AutoMap } from '@automapper/classes';

export class Store {
  @AutoMap() public id: string;
  @AutoMap() public organizationId?: string;
  @AutoMap() public name?: string;
  @AutoMap() public code?: string;
  @AutoMap() public address?: string;
  @AutoMap() public city?: string;
  @AutoMap() public state?: string;
  @AutoMap() public country?: string;
  @AutoMap() public phone?: string;
  @AutoMap() public email?: string;
  @AutoMap() public imageKey?: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
}
