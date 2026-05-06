import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class UpdateBillCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public totalAmount?: number;
  @AutoMap() public status?: string;
}
