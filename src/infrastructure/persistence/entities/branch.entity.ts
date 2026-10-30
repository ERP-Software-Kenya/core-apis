import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrganizationEntity } from './organization.entity';
import { LocationEntity } from './location.entity';
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.Branches;

@Index('UQ_branches_one_main_per_organization', ['organizationId'], {
  unique: true,
  where: '"is_main" = true AND "deleted_at" IS NULL',
})
@Index('UQ_branches_one_branch_per_manager', ['userId'], {
  unique: true,
  where: '"user_id" IS NOT NULL AND "deleted_at" IS NULL',
})
@Index('UQ_branches_code_per_organization', ['organizationId', 'code'], {
  unique: true,
  where: '"code" IS NOT NULL AND "deleted_at" IS NULL',
})
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Branches })
export class BranchEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 150 })
  public name: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public code?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 300, nullable: true })
  public address?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public city?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public state?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public country?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public phone?: string;

  @AutoMap()
  @Column({ name: 'is_active', type: 'boolean', default: true })
  public isActive: boolean;

  @AutoMap()
  @Column({ name: 'is_main', type: 'boolean', default: false })
  public isMain: boolean;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => Date)
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  public deletedAt?: Date;

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Branches}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap()
  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  public userId?: string | null;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Branches}__${ECoreTableName.Users}`,
  })
  public user?: UserEntity;

  @AutoMap(() => [LocationEntity])
  @OneToMany(() => LocationEntity, (loc) => loc.branch)
  public locations?: LocationEntity[];
}
