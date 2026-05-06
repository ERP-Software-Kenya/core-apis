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
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.UserAddresses;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.UserAddresses })
export class UserAddressEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'user_id', type: 'uuid' })
  public userId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, default: 'home' })
  public type: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  public line1: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public line2?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public city: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public state?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public country: string;

  @AutoMap()
  @Column({ name: 'postal_code', type: 'varchar', length: 20 })
  public postalCode: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UserAddresses}__${ECoreTableName.Users}`,
  })
  public user: UserEntity;
}
