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
import { CustomerEntity } from './customer.entity';
import { ETripStatus } from '../../../application/shared/enums/e-trip-status';

const PK_NAME = 'PK_' + ECoreTableName.Trips;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Trips })
export class TripEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, unique: true })
  public tripNumber: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public vehicleId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public driverId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public customerId: string;

  @AutoMap()
  @Column({ type: 'text' })
  public pickupLocation: string;

  @AutoMap()
  @Column({ type: 'text' })
  public dropLocation: string;

  @AutoMap(() => Date)
  @Column({ type: 'timestamp' })
  public startDatetime: Date;

  @AutoMap(() => Date)
  @Column({ type: 'timestamp', nullable: true })
  public endDatetime?: Date;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  public estimatedDistance?: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  public actualDistance?: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public estimatedDuration?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public actualDuration?: string;

  @AutoMap()
  @Column({ type: 'enum', enum: ETripStatus, default: ETripStatus.Scheduled })
  public tripStatus: ETripStatus;

  @AutoMap()
  @Column({ type: 'varchar', length: 20, default: 'medium' })
  public priority: string;

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
    foreignKeyConstraintName: `FK__${ECoreTableName.Trips}__${ECoreTableName.Vehicles}`,
  })
  public vehicle: VehicleEntity;

  @AutoMap(() => DriverEntity)
  @ManyToOne(() => DriverEntity)
  @JoinColumn({
    name: 'driver_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Trips}__${ECoreTableName.Drivers}`,
  })
  public driver: DriverEntity;

  @AutoMap(() => CustomerEntity)
  @ManyToOne(() => CustomerEntity)
  @JoinColumn({
    name: 'customer_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Trips}__${ECoreTableName.Customers}`,
  })
  public customer: CustomerEntity;
}
