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
import { OrganizationEntity } from './organization.entity';
import { LocationEntity } from './location.entity';

const PK_NAME = 'PK_' + ECoreTableName.ActivityLogs;

export enum EActivityAction {
  // Auth
  Login               = 'login',
  Logout              = 'logout',
  // Inventory
  AddStock            = 'add_stock',
  RemoveStock         = 'remove_stock',
  AdjustStock         = 'adjust_stock',
  TransferStock       = 'transfer_stock',
  // Products
  CreateProduct       = 'create_product',
  UpdateProduct       = 'update_product',
  DeleteProduct       = 'delete_product',
  // Orders
  CreatePurchaseOrder = 'create_purchase_order',
  ReceivePurchaseOrder= 'receive_purchase_order',
  CancelPurchaseOrder = 'cancel_purchase_order',
  // Stores
  CreateStore         = 'create_store',
  UpdateStore         = 'update_store',
  // Users
  CreateUser          = 'create_user',
  UpdateUser          = 'update_user',
  DeactivateUser      = 'deactivate_user',
}

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.ActivityLogs })
export class ActivityLogEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  public userId?: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid', nullable: true })
  public locationId?: string;

  @AutoMap(() => String)
  @Column({ type: 'enum', enum: EActivityAction })
  public action: EActivityAction;

  /** Entity type affected e.g. "Product", "Inventory", "PurchaseOrder" */
  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public entityType?: string;

  /** PK of the entity that was affected */
  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  public entityId?: string;

  /** Full JSON diff / payload snapshot for audit trail */
  @AutoMap()
  @Column({ type: 'jsonb', nullable: true })
  public metadata?: Record<string, unknown>;

  /** IP address of client */
  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public ipAddress?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public userAgent?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.activityLogs, { nullable: true })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ActivityLogs}__${ECoreTableName.Users}`,
  })
  public user?: UserEntity;

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ActivityLogs}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity, { nullable: true })
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ActivityLogs}__${ECoreTableName.Locations}`,
  })
  public location?: LocationEntity;
}
