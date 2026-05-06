import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class UpdateItemReturnCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public status?: string;
  @AutoMap() public totalAmount?: number;
}
