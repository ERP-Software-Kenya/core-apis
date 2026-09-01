import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';
import { ELocationType } from 'src/infrastructure/persistence/entities';

export class CreateLocationCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public branchId: string;
  @AutoMap() public name: string;
  @AutoMap(() => String) public type: ELocationType;
  @AutoMap() public address?: string;
  @AutoMap() public city?: string;
  @AutoMap() public state?: string;
  @AutoMap() public country?: string;
  @AutoMap() public phone?: string;
}
