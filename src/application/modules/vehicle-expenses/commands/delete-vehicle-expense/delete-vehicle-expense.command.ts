import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class DeleteVehicleExpenseCommand extends CommandBase {
  @AutoMap() public id: string;
}
