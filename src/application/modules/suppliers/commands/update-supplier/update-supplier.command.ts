import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class UpdateSupplierCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public name?: string;
}
