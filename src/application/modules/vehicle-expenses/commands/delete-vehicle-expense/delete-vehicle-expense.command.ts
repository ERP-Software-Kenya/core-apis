import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../common';

export class DeleteVehicleExpenseCommand extends CommandBase {
  @AutoMap() public id: string;
}
