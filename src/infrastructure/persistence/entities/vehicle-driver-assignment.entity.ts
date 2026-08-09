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
import { DriverEntity } from './driver.entity';

const PK_NAME = 'PK_' + ECoreTableName.VehicleDriverAssignments;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.VehicleDriverAssignments })
export class VehicleDriverAssignmentEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public vehicleId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public driverId: string;

  @AutoMap(() => Date)
  @Column({ type: 'timestamp' })
  public assignedDate: Date;

  @AutoMap(() => Date)
  @Column({ type: 'timestamp', nullable: true })
  public releasedDate?: Date;

  @AutoMap()
  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public remarks?: string;

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
    foreignKeyConstraintName: `FK__${ECoreTableName.VehicleDriverAssignments}__${ECoreTableName.Vehicles}`,
  })
  public vehicle: VehicleEntity;

  @AutoMap(() => DriverEntity)
  @ManyToOne(() => DriverEntity)
  @JoinColumn({
    name: 'driver_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.VehicleDriverAssignments}__${ECoreTableName.Drivers}`,
  })
  public driver: DriverEntity;
}
