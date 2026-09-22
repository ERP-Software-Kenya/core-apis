import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class DeleteTaxCommand extends CommandBase {
  @AutoMap() public id: string;
}
