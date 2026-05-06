import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreatePaymentTransactionCommand extends CommandBase {
  @AutoMap() public orgId: string;
  @AutoMap() public referenceId: string;
  @AutoMap() public referenceType: string;
  @AutoMap() public type: string;
  @AutoMap() public method: string;
  @AutoMap() public amount: number;
  @AutoMap() public status: string;
}
