import { AutoMap } from '@automapper/classes';
import { EDriverStatus } from '../../../shared/enums/e-driver-status';

export class Driver {
  @AutoMap()
  public id: string;
  @AutoMap()
  public organizationId: string;
  @AutoMap()
  public employeeId?: string;
  @AutoMap()
  public firstName: string;
  @AutoMap()
  public lastName: string;
  @AutoMap()
  public phone: string;
  @AutoMap()
  public email?: string;
  @AutoMap()
  public licenseNumber: string;
  @AutoMap()
  public licenseType?: string;
  @AutoMap()
  public licenseExpiry?: Date;
  @AutoMap()
  public joiningDate?: Date;
  @AutoMap()
  public experienceYears?: number;
  @AutoMap()
  public bloodGroup?: string;
  @AutoMap()
  public address?: string;
  @AutoMap()
  public emergencyContact?: string;
  @AutoMap()
  public status: EDriverStatus;
  @AutoMap()
  public profileImage?: string;
}
