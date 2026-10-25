import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class CreateTaxCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public name: string;
  @AutoMap() public rate: number;
  @AutoMap() public description?: string;
}
