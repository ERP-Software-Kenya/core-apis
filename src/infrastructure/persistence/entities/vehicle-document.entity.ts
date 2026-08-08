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
import { EDocumentType } from '../../../application/shared/enums/e-document-type';

const PK_NAME = 'PK_' + ECoreTableName.VehicleDocuments;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.VehicleDocuments })
export class VehicleDocumentEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public vehicleId: string;

  @AutoMap()
  @Column({ type: 'enum', enum: EDocumentType })
  public documentType: EDocumentType;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public documentNumber?: string;

  @AutoMap(() => Date)
  @Column({ type: 'date', nullable: true })
  public issueDate?: Date;

  @AutoMap(() => Date)
  @Column({ type: 'date', nullable: true })
  public expiryDate?: Date;

  @AutoMap()
  @Column({ type: 'text' })
  public fileUrl: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => VehicleEntity)
  @ManyToOne(() => VehicleEntity)
  @JoinColumn({
    name: 'vehicle_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.VehicleDocuments}__${ECoreTableName.Vehicles}`,
  })
  public vehicle: VehicleEntity;
}
