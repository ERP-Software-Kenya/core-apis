import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { VehicleEntity } from './vehicle.entity';
import { DriverEntity } from './driver.entity';
import { EAlertSeverity } from '../../../application/shared/enums/e-alert-severity';
import { EAlertType } from '../../../application/shared/enums/e-alert-type';

const PK_NAME = 'PK_' + ECoreTableName.Alerts;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Alerts })
export class AlertEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  public vehicleId?: string;

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  public driverId?: string;

  @AutoMap()
  @Column({ type: 'enum', enum: EAlertType })
  public alertType: EAlertType;

  @AutoMap()
  @Column({ type: 'enum', enum: EAlertSeverity })
  public severity: EAlertSeverity;

  @AutoMap()
  @Column({ type: 'text' })
  public message: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, default: 'unread' })
  public status: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => VehicleEntity)
  @ManyToOne(() => VehicleEntity, { nullable: true })
  @JoinColumn({
    name: 'vehicle_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Alerts}__${ECoreTableName.Vehicles}`,
  })
  public vehicle?: VehicleEntity;

  @AutoMap(() => DriverEntity)
  @ManyToOne(() => DriverEntity, { nullable: true })
  @JoinColumn({
    name: 'driver_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Alerts}__${ECoreTableName.Drivers}`,
  })
  public driver?: DriverEntity;
}
