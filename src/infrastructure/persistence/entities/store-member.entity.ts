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
import { StoreEntity } from './store.entity';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';

const PK_NAME = 'PK_' + ECoreTableName.StoreMembers;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.StoreMembers })
@Index(['storeId', 'userId'], { unique: true })
export class StoreMemberEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'store_id', type: 'uuid' })
  public storeId: string;

  @AutoMap()
  @Column({ name: 'user_id', type: 'uuid' })
  public userId: string;

  @AutoMap()
  @Column({ name: 'role_id', type: 'uuid' })
  public roleId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, default: 'active' })
  public status: string;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => StoreEntity)
  @ManyToOne(() => StoreEntity)
  @JoinColumn({
    name: 'store_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StoreMembers}__${ECoreTableName.Stores}`,
  })
  public store: StoreEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StoreMembers}__${ECoreTableName.Users}`,
  })
  public user: UserEntity;

  @AutoMap(() => RoleEntity)
  @ManyToOne(() => RoleEntity)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StoreMembers}__${ECoreTableName.Roles}`,
  })
  public role: RoleEntity;
}
