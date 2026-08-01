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
import { PurchaseOrderEntity } from './purchase-order.entity';

const PK_NAME = 'PK_' + ECoreTableName.Stores;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Stores })
export class StoreEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public code?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
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
  @Column({ type: 'varchar', length: 20, nullable: true })
  public phone?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public email?: string;

  @AutoMap()
  @Column({ name: 'image_key', type: 'varchar', length: 500, nullable: true })
  public imageKey?: string;

  @AutoMap()
  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

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
  @ManyToOne(() => OrganizationEntity, (org) => org.stores)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Stores}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => [UserRoleEntity])
  @OneToMany(() => UserRoleEntity, (ur) => ur.store)
  public userRoles?: UserRoleEntity[];

  @AutoMap(() => [PurchaseOrderEntity])
  @OneToMany(() => PurchaseOrderEntity, (po) => po.store)
  public purchaseOrders?: PurchaseOrderEntity[];
}
