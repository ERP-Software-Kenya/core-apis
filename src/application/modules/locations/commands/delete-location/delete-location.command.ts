import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class DeleteLocationCommand extends CommandBase {
  @AutoMap() public id: string;
}
