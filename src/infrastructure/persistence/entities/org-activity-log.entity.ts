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
import { OrganizationEntity } from './organization.entity';
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.OrgActivityLogs;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.OrgActivityLogs })
export class OrgActivityLogEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'org_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'actor_id', type: 'uuid', nullable: true })
  public actorId?: string;

  @AutoMap()
  @Column({ name: 'event_type', type: 'varchar', length: 100 })
  public eventType: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'org_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.OrgActivityLogs}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'actor_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.OrgActivityLogs}__actor`,
  })
  public actor?: UserEntity;
}
