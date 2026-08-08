import { AutoMap } from '@automapper/classes';
import { EUnpublishedMovementType } from 'src/infrastructure/persistence/entities';

export class UnpublishedStockMovement {
  @AutoMap() public id: string;
  @AutoMap() public unpublishedStockId: string;
  @AutoMap() public locationId: string;
  @AutoMap() public productId: string;
  @AutoMap() public performedById?: string;
  @AutoMap(() => String) public movementType: EUnpublishedMovementType;
  @AutoMap() public quantity: number;
  @AutoMap() public quantityBefore: number;
  @AutoMap() public quantityAfter: number;
  @AutoMap() public unitCost?: number;
  @AutoMap() public notes?: string;
  @AutoMap(() => Date) public createdAt?: Date;
}
