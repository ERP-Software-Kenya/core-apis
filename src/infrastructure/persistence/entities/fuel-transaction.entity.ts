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
import { TripEntity } from './trip.entity';

const PK_NAME = 'PK_' + ECoreTableName.FuelTransactions;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.FuelTransactions })
export class FuelTransactionEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public vehicleId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public driverId: string;

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  public tripId?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public fuelStation: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public fuelQuantity: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public pricePerLiter: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public totalCost: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  public odometer?: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public paymentMode?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public receiptImage?: string;

  @AutoMap(() => Date)
  @Column({ type: 'timestamp' })
  public filledAt: Date;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => VehicleEntity)
  @ManyToOne(() => VehicleEntity)
  @JoinColumn({
    name: 'vehicle_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.FuelTransactions}__${ECoreTableName.Vehicles}`,
  })
  public vehicle: VehicleEntity;

  @AutoMap(() => DriverEntity)
  @ManyToOne(() => DriverEntity)
  @JoinColumn({
    name: 'driver_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.FuelTransactions}__${ECoreTableName.Drivers}`,
  })
  public driver: DriverEntity;

  @AutoMap(() => TripEntity)
  @ManyToOne(() => TripEntity, { nullable: true })
  @JoinColumn({
    name: 'trip_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.FuelTransactions}__${ECoreTableName.Trips}`,
  })
  public trip?: TripEntity;
}
