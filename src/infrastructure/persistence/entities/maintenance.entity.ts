import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { VehicleEntity } from './vehicle.entity';
import { MaintenanceTypeEntity } from './maintenance-type.entity';
import { EMaintenanceStatus } from '../../../application/shared/enums/e-maintenance-status';

const PK_NAME = 'PK_' + ECoreTableName.Maintenance;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Maintenance })
export class MaintenanceEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public vehicleId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public maintenanceTypeId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public serviceCenter: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public description?: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  public cost: number;

  @AutoMap(() => Date)
  @Column({ type: 'date' })
  public serviceDate: Date;

  @AutoMap(() => Date)
  @Column({ type: 'date', nullable: true })
  public nextServiceDate?: Date;

  @AutoMap()
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  public odometer?: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public invoiceNumber?: string;

  @AutoMap()
  @Column({ type: 'enum', enum: EMaintenanceStatus, default: EMaintenanceStatus.Pending })
  public status: EMaintenanceStatus;

  @AutoMap()
  @Column({ type: 'uuid' })
  public createdBy: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => VehicleEntity)
  @ManyToOne(() => VehicleEntity)
  @JoinColumn({
    name: 'vehicle_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Maintenance}__${ECoreTableName.Vehicles}`,
  })
  public vehicle: VehicleEntity;

  @AutoMap(() => MaintenanceTypeEntity)
  @ManyToOne(() => MaintenanceTypeEntity)
  @JoinColumn({
    name: 'maintenance_type_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Maintenance}__${ECoreTableName.MaintenanceTypes}`,
  })
  public maintenanceType: MaintenanceTypeEntity;
}
