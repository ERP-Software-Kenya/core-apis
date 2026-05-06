import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.UserProfiles;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.UserProfiles })
export class UserProfileEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'user_id', type: 'uuid', unique: true })
  public userId: string;

  @AutoMap()
  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  public firstName: string;

  @AutoMap()
  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  public lastName: string;

  @AutoMap()
  @Column({ name: 'avatar_url', type: 'varchar', length: 255, nullable: true })
  public avatarUrl?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, default: 'UTC' })
  public timezone: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 10, default: 'en' })
  public locale: string;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => UserEntity)
  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UserProfiles}__${ECoreTableName.Users}`,
  })
  public user: UserEntity;
}
