import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';

const PK_NAME = 'PK_' + ECoreTableName.Platforms;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Platforms })
export class PlatformEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @AutoMap()
  @Column({ type: 'jsonb', nullable: true })
  public config?: Record<string, any>;

  @AutoMap()
  @Column({ name: 'maintenance_mode', type: 'boolean', default: false })
  public maintenanceMode: boolean;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;
}
