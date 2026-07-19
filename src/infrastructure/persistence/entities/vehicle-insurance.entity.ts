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

const PK_NAME = 'PK_' + ECoreTableName.VehicleInsurance;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.VehicleInsurance })
export class VehicleInsuranceEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public vehicleId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public provider: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public policyNumber: string;

  @AutoMap(() => Date)
  @Column({ type: 'date' })
  public startDate: Date;

  @AutoMap(() => Date)
  @Column({ type: 'date' })
  public expiryDate: Date;

  @AutoMap()
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  public premium: number;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public coverage?: string;

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
    foreignKeyConstraintName: `FK__${ECoreTableName.VehicleInsurance}__${ECoreTableName.Vehicles}`,
  })
  public vehicle: VehicleEntity;
}
