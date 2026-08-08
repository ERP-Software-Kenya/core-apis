import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class CreateDriverCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public firstName: string;
  @AutoMap() public lastName: string;
  @AutoMap() public phone: string;
  @AutoMap() public email?: string;
  @AutoMap() public licenseNumber: string;
  @AutoMap() public licenseType?: string;
  @AutoMap() public employeeId?: string;
}
