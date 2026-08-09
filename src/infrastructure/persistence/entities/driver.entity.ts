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
import { EDriverStatus } from '../../../application/shared/enums/e-driver-status';

const PK_NAME = 'PK_' + ECoreTableName.Drivers;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Drivers })
export class DriverEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public employeeId?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public firstName: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public lastName: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 20 })
  public phone: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 150, nullable: true })
  public email?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, unique: true })
  public licenseNumber: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public licenseType?: string;

  @AutoMap(() => Date)
  @Column({ type: 'date', nullable: true })
  public licenseExpiry?: Date;

  @AutoMap(() => Date)
  @Column({ type: 'date', nullable: true })
  public joiningDate?: Date;

  @AutoMap()
  @Column({ type: 'int', nullable: true })
  public experienceYears?: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 5, nullable: true })
  public bloodGroup?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public address?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public emergencyContact?: string;

  @AutoMap()
  @Column({ type: 'enum', enum: EDriverStatus, default: EDriverStatus.Active })
  public status: EDriverStatus;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public profileImage?: string;

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
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Drivers}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;
}
