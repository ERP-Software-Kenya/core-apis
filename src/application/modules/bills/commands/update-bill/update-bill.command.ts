import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class UpdateBillCommand extends CommandBase {
  public id: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public customerId?: string;
  @AutoMap() public walkInName?: string;
  @AutoMap() public walkInPhone?: string;
  @AutoMap() public walkInGstin?: string;
  @AutoMap() public notes?: string;
}
