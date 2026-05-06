import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';

const PK_NAME = 'PK_' + ECoreTableName.PlatformConfigurations;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.PlatformConfigurations })
export class PlatformConfigurationEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, unique: true })
  public configKey: string;

  @AutoMap()
  @Column({ type: 'jsonb', nullable: true })
  public configValue: Record<string, any>;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public description?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => Date)
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt?: Date;
}
