import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrganizationEntity } from './organization.entity';
import { EActivityAction } from './activity-log.entity';

const PK_NAME = 'PK_' + ECoreTableName.NotificationSettings;

@Unique(['organizationId', 'event'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.NotificationSettings })
export class NotificationSettingEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap(() => String)
  @Column({ type: 'enum', enum: EActivityAction })
  public event: EActivityAction;

  @AutoMap()
  @Column({ name: 'is_enabled', type: 'boolean', default: false })
  public isEnabled: boolean;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.NotificationSettings}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;
}
