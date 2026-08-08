import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../common';

export class DeleteDriverCommand extends CommandBase {
  @AutoMap() public id: string;
}
