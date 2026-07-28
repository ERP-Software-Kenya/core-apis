import { AutoMap } from '@automapper/classes';
import { EMovementType } from 'src/infrastructure/persistence/entities';

export class StockMovement {
  @AutoMap() public id: string;
  @AutoMap() public inventoryId: string;
  @AutoMap() public locationId: string;
  @AutoMap() public productId: string;
  @AutoMap() public performedById?: string;
  @AutoMap() public referenceId?: string;
  @AutoMap() public referenceType?: string;
  @AutoMap(() => String) public movementType: EMovementType;
  @AutoMap() public quantity: number;
  @AutoMap() public quantityBefore: number;
  @AutoMap() public quantityAfter: number;
  @AutoMap() public unitCost?: number;
  @AutoMap() public isUnpublishedEntry: boolean;
  @AutoMap() public notes?: string;
  @AutoMap(() => Date) public createdAt?: Date;
}
