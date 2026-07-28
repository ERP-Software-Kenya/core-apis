import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class RemoveLocationImageCommand extends CommandBase {
  @AutoMap() public locationId: string;
}
