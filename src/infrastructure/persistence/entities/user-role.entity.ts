import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';
import { LocationEntity } from './location.entity';

const PK_NAME = 'PK_' + ECoreTableName.UserRoles;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.UserRoles })
export class UserRoleEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public userId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public roleId: string;

  /** Optional scope — null means org-wide, non-null scopes role to a specific store.
   *  DB column was renamed location_id → store_id by migration 1786301965722. */
  @AutoMap()
  @Column({ name: 'store_id', type: 'uuid', nullable: true })
  public locationId?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.userRoles)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UserRoles}__${ECoreTableName.Users}`,
  })
  public user: UserEntity;

  @AutoMap(() => RoleEntity)
  @ManyToOne(() => RoleEntity, (role) => role.userRoles)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UserRoles}__${ECoreTableName.Roles}`,
  })
  public role: RoleEntity;

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity, { nullable: true })
  @JoinColumn({
    name: 'store_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UserRoles}__${ECoreTableName.Locations}`,
  })
  public location?: LocationEntity;
}
