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
import { DriverEntity } from './driver.entity';
import { EDocumentType } from '../../../application/shared/enums/e-document-type';

const PK_NAME = 'PK_' + ECoreTableName.DriverDocuments;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.DriverDocuments })
export class DriverDocumentEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public driverId: string;

  @AutoMap()
  @Column({ type: 'enum', enum: EDocumentType })
  public documentType: EDocumentType;

  @AutoMap()
  @Column({ type: 'text' })
  public fileUrl: string;

  @AutoMap(() => Date)
  @Column({ type: 'date', nullable: true })
  public expiryDate?: Date;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => DriverEntity)
  @ManyToOne(() => DriverEntity)
  @JoinColumn({
    name: 'driver_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.DriverDocuments}__${ECoreTableName.Drivers}`,
  })
  public driver: DriverEntity;
}
