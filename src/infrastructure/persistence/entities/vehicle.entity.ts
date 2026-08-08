import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrganizationEntity } from './organization.entity';
import { VehicleTypeEntity } from './vehicle-type.entity';
import { VehicleBrandEntity } from './vehicle-brand.entity';
import { FuelTypeEntity } from './fuel-type.entity';
import { EVehicleStatus } from '../../../application/shared/enums/e-vehicle-status';

const PK_NAME = 'PK_' + ECoreTableName.Vehicles;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Vehicles })
export class VehicleEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 30, unique: true })
  public vehicleNumber: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public vinNumber?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public registrationNumber?: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public companyId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public vehicleTypeId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public brandId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public model?: string;

  @AutoMap()
  @Column({ type: 'int', nullable: true })
  public manufactureYear?: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public color?: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public fuelTypeId: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  public tankCapacity?: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  public payloadCapacity?: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  public mileage?: number;

  @AutoMap(() => Date)
  @Column({ type: 'date', nullable: true })
  public purchaseDate?: Date;

  @AutoMap()
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public purchasePrice?: number;

  @AutoMap(() => Date)
  @Column({ type: 'date', nullable: true })
  public insuranceExpiry?: Date;

  @AutoMap(() => Date)
  @Column({ type: 'date', nullable: true })
  public registrationExpiry?: Date;

  @AutoMap()
  @Column({ type: 'enum', enum: EVehicleStatus, default: EVehicleStatus.Available })
  public status: EVehicleStatus;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public imageUrl?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public notes?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => Date)
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt?: Date;

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Vehicles}__${ECoreTableName.Organizations}`,
  })
  public company: OrganizationEntity;

  @AutoMap(() => VehicleTypeEntity)
  @ManyToOne(() => VehicleTypeEntity)
  @JoinColumn({
    name: 'vehicle_type_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Vehicles}__${ECoreTableName.VehicleTypes}`,
  })
  public vehicleType: VehicleTypeEntity;

  @AutoMap(() => VehicleBrandEntity)
  @ManyToOne(() => VehicleBrandEntity)
  @JoinColumn({
    name: 'brand_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Vehicles}__${ECoreTableName.VehicleBrands}`,
  })
  public brand: VehicleBrandEntity;

  @AutoMap(() => FuelTypeEntity)
  @ManyToOne(() => FuelTypeEntity)
  @JoinColumn({
    name: 'fuel_type_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Vehicles}__${ECoreTableName.FuelTypes}`,
  })
  public fuelType: FuelTypeEntity;
}
