import { AutoMap } from '@automapper/classes';
import { EProductLogAction } from 'src/infrastructure/persistence/entities';

export class ProductLog {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public productId: string;
  @AutoMap() public inventoryId?: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public performedById?: string;
  @AutoMap(() => String) public action: EProductLogAction;
  @AutoMap() public changedFields?: Array<{ field: string; oldValue: unknown; newValue: unknown }>;
  @AutoMap() public metadata?: Record<string, unknown>;
  @AutoMap(() => Date) public createdAt?: Date;
}

export interface ProductLogFilter {
  productId?: string;
  inventoryId?: string;
  locationId?: string;
  organizationId?: string;
  action?: EProductLogAction;
  fromDate?: Date;
  toDate?: Date;
}
