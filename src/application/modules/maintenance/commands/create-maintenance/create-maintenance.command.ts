import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../common';
import { EMaintenanceStatus } from '../../../shared/enums/e-maintenance-status';

export class CreateMaintenanceCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public vehicleId: string;
  @AutoMap() public maintenanceTypeId: string;
  @AutoMap() public serviceCenter: string;
  @AutoMap() public cost: number;
  @AutoMap() public serviceDate: Date;
  @AutoMap() public nextServiceDate?: Date;
  @AutoMap() public odometer?: number;
  @AutoMap() public description?: string;
  @AutoMap() public invoiceNumber?: string;
  @AutoMap(() => String) public status?: EMaintenanceStatus;
  @AutoMap() public createdBy?: string;
}
