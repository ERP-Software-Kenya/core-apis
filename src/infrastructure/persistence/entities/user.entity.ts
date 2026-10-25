import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrganizationEntity } from './organization.entity';
import { UserRoleEntity } from './user-role.entity';
import { StockMovementEntity } from './stock-movement.entity';
import { ActivityLogEntity } from './activity-log.entity';

const PK_NAME = 'PK_' + ECoreTableName.Users;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Users })
export class UserEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  public organizationId?: string;


  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public firstName?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public lastName?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, unique: true })
  public email: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  public clerkUserId?: string;

  /** Hashed via bcrypt — never expose via API response. Nullable for Clerk-managed accounts. */
  @Column({ type: 'varchar', length: 255, select: false, nullable: true })
  public passwordHash?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 20, nullable: true })
  public phone?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public avatarUrl?: string;

  @AutoMap()
  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  @AutoMap(() => Date)
  @Column({ type: 'timestamp', nullable: true })
  public lastLoginAt?: Date;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => Date)
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt?: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity, (org) => org.users)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Users}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => [UserRoleEntity])
  @OneToMany(() => UserRoleEntity, (ur) => ur.user)
  public userRoles?: UserRoleEntity[];

  @AutoMap(() => [StockMovementEntity])
  @OneToMany(() => StockMovementEntity, (sm) => sm.performedBy)
  public stockMovements?: StockMovementEntity[];

  @AutoMap(() => [ActivityLogEntity])
  @OneToMany(() => ActivityLogEntity, (log) => log.user)
  public activityLogs?: ActivityLogEntity[];
}
