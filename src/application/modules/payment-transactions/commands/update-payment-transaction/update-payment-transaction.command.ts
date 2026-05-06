import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class UpdatePaymentTransactionCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public status?: string;
}
