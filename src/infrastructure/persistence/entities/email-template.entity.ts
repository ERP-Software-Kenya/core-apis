import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';

const PK_NAME = 'PK_' + ECoreTableName.EmailTemplates;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.EmailTemplates })
export class EmailTemplateEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, unique: true })
  public slug: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 500 })
  public subject: string;

  @AutoMap()
  @Column({ name: 'html_body', type: 'text' })
  public htmlBody: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public category?: string;

  @AutoMap()
  @Column({ name: 'is_active', type: 'boolean', default: true })
  public isActive: boolean;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;
}
