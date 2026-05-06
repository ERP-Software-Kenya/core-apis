import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrganizationEntity } from './organization.entity';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';

const PK_NAME = 'PK_' + ECoreTableName.OrgMembers;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.OrgMembers })
@Index(['organizationId', 'userId'], { unique: true })
export class OrgMemberEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'org_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'user_id', type: 'uuid' })
  public userId: string;

  @AutoMap()
  @Column({ name: 'role_id', type: 'uuid' })
  public roleId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, default: 'active' })
  public status: string;

  @AutoMap()
  @Column({ name: 'invited_by', type: 'uuid', nullable: true })
  public invitedById?: string;

  @AutoMap(() => Date)
  @Column({ name: 'joined_at', type: 'timestamp', nullable: true })
  public joinedAt?: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'org_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.OrgMembers}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.OrgMembers}__${ECoreTableName.Users}`,
  })
  public user: UserEntity;

  @AutoMap(() => RoleEntity)
  @ManyToOne(() => RoleEntity)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.OrgMembers}__${ECoreTableName.Roles}`,
  })
  public role: RoleEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'invited_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.OrgMembers}__invited_by`,
  })
  public invitedBy?: UserEntity;
}
