import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class CreateCategoryCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public name: string;
  @AutoMap() public description?: string;
  @AutoMap() public parentId?: string;
}
