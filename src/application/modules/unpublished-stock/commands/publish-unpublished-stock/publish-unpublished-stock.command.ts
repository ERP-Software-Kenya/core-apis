import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class PublishUnpublishedStockCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public unpublishedStockId: string;
  @AutoMap() public quantity: number;
  public performedById?: string;
  @AutoMap() public notes?: string;
}
