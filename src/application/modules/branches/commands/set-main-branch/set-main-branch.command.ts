import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class SetMainBranchCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
}
