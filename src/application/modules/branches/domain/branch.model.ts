import { AutoMap } from '@automapper/classes';

export class Branch {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public name: string;
  @AutoMap() public code?: string;
  @AutoMap() public address?: string;
  @AutoMap() public city?: string;
  @AutoMap() public state?: string;
  @AutoMap() public country?: string;
  @AutoMap() public phone?: string;
  @AutoMap() public isActive: boolean;
  @AutoMap(() => Date) public createdAt?: Date;
  @AutoMap(() => Date) public updatedAt?: Date;
  /** Populated on read — location IDs belonging to this branch */
  @AutoMap(() => [String]) public locationIds?: string[];
}

export class BranchFilter {
  @AutoMap() public name?: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap() public organizationId?: string;
}
