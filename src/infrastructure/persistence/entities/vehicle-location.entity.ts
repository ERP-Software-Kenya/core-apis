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

const PK_NAME = 'PK_' + ECoreTableName.VehicleLocations;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.VehicleLocations })
export class VehicleLocationEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public vehicleId: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 8 })
  public latitude: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 11, scale: 8 })
  public longitude: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  public speed?: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  public heading?: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  public altitude?: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  public fuelLevel?: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  public odometer?: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public engineStatus?: string;

  @AutoMap(() => Date)
  @Column({ type: 'timestamp' })
  public gpsTime: Date;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => VehicleEntity)
  @ManyToOne(() => VehicleEntity)
  @JoinColumn({
    name: 'vehicle_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.VehicleLocations}__${ECoreTableName.Vehicles}`,
  })
  public vehicle: VehicleEntity;
}
