import { AutoMap } from '@automapper/classes';

export class CategoryFilter {
  @AutoMap() public name?: string;
  @AutoMap() public isActive?: boolean;
  @AutoMap() public parentId?: string | null;
  @AutoMap() public organizationId?: string;
  @AutoMap() public hasParent?: boolean;
}
