import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateReportLogCommand extends CommandBase {
  @AutoMap() public orgId: string;
  @AutoMap() public reportType: string;
  @AutoMap() public status: string;
}
