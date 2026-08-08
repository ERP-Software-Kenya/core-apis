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
import { MaintenanceEntity } from './maintenance.entity';

const PK_NAME = 'PK_' + ECoreTableName.MaintenanceParts;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.MaintenanceParts })
export class MaintenancePartEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public maintenanceId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public partName: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public quantity: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public price: number;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => MaintenanceEntity)
  @ManyToOne(() => MaintenanceEntity)
  @JoinColumn({
    name: 'maintenance_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.MaintenanceParts}__${ECoreTableName.Maintenance}`,
  })
  public maintenance: MaintenanceEntity;
}
