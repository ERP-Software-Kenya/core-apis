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

const PK_NAME = 'PK_' + ECoreTableName.GpsDevices;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.GpsDevices })
export class GpsDeviceEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, unique: true })
  public deviceNumber: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, unique: true })
  public imei: string;

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  public vehicleId?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public provider?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, default: 'active' })
  public status: string;

  @AutoMap(() => Date)
  @Column({ type: 'timestamp', nullable: true })
  public lastSync?: Date;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => VehicleEntity)
  @ManyToOne(() => VehicleEntity, { nullable: true })
  @JoinColumn({
    name: 'vehicle_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.GpsDevices}__${ECoreTableName.Vehicles}`,
  })
  public vehicle?: VehicleEntity;
}
