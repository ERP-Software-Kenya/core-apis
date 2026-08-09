import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

/** Header-only update. `null` clears a field; `undefined` leaves it untouched. */
export class UpdateBillCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public customerId?: string | null;
  @AutoMap() public walkInName?: string | null;
  @AutoMap() public walkInPhone?: string | null;
  @AutoMap() public walkInGstin?: string | null;
  @AutoMap() public notes?: string | null;
}
