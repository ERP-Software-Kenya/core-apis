import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class UpdateReportLogCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public status?: string;
  @AutoMap() public fileUrl?: string;
  @AutoMap() public errorMessage?: string;
}
