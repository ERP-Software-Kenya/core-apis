import { AutoMap } from '@automapper/classes';

export class StoreFilter {
  @AutoMap() public name?: string;
  @AutoMap() public organizationId?: string;
  @AutoMap() public isActive?: boolean;
}
