import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class CopyMainBranchPricesCommand extends CommandBase {
  @AutoMap() public targetBranchId: string;
  @AutoMap() public organizationId: string;
}
