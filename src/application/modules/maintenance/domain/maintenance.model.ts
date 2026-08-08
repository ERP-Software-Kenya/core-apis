import { AutoMap } from '@automapper/classes';
import { EMaintenanceStatus } from '../../../shared/enums/e-maintenance-status';

export class Maintenance {
  @AutoMap() public id: string;
  @AutoMap() public vehicleId: string;
  @AutoMap() public maintenanceTypeId: string;
  @AutoMap() public serviceCenter: string;
  @AutoMap() public cost: number;
  @AutoMap() public serviceDate: Date;
  @AutoMap() public status: EMaintenanceStatus;
  @AutoMap() public createdBy: string;
}
