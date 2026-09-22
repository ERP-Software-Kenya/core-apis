import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class UpdateTaxCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public name?: string;
  @AutoMap() public rate?: number;
  @AutoMap() public description?: string;
  @AutoMap() public isActive?: boolean;
}
