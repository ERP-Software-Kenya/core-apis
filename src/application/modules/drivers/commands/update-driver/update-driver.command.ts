import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class UpdateDriverCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public firstName?: string;
  @AutoMap() public lastName?: string;
  @AutoMap() public phone?: string;
  @AutoMap() public email?: string;
  @AutoMap() public licenseNumber?: string;
  @AutoMap() public licenseType?: string;
  @AutoMap() public employeeId?: string;
  @AutoMap() public address?: string;
  @AutoMap() public emergencyContact?: string;
}
