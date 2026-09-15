import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { numericTransformer } from './numeric.transformer';
import { OrganizationEntity } from './organization.entity';
import { PurchaseOrderEntity } from './purchase-order.entity';
import { PurchaseReturnItemEntity } from './purchase-return-item.entity';
import { SupplierEntity } from './supplier.entity';
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.PurchaseReturns;

export enum EPurchaseReturnStatus {
  Draft     = 'draft',
  Finalized = 'finalized',
  Cancelled = 'cancelled',
}

export enum EPurchaseReturnDispatchStatus {
  PendingDispatch = 'pending_dispatch',
  Dispatched      = 'dispatched',
  Credited        = 'credited',
}

@Index(`IX__${ECoreTableName.PurchaseReturns}__org_status`, ['organizationId', 'status'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.PurchaseReturns })
export class PurchaseReturnEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'return_number', type: 'varchar', length: 50, unique: true })
  public returnNumber: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'purchase_order_id', type: 'uuid' })
  public purchaseOrderId: string;

  @AutoMap()
  @Column({ name: 'supplier_id', type: 'uuid' })
  public supplierId: string;

  @AutoMap(() => String)
  @Column({ type: 'enum', enum: EPurchaseReturnStatus, default: EPurchaseReturnStatus.Draft })
  public status: EPurchaseReturnStatus;

  @AutoMap(() => String)
  @Column({ name: 'dispatch_status', type: 'enum', enum: EPurchaseReturnDispatchStatus, default: EPurchaseReturnDispatchStatus.PendingDispatch })
  public dispatchStatus: EPurchaseReturnDispatchStatus;

  @AutoMap()
  @Column({ name: 'total_amount', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public totalAmount: number;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public reason?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public notes?: string;

  @AutoMap()
  @Column({ name: 'created_by_id', type: 'uuid', nullable: true })
  public createdById?: string;

  @AutoMap()
  @Column({ name: 'finalized_by_id', type: 'uuid', nullable: true })
  public finalizedById?: string;

  @AutoMap(() => Date)
  @Column({ name: 'finalized_at', type: 'timestamp', nullable: true })
  public finalizedAt?: Date;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.PurchaseReturns}__${ECoreTableName.Organizations}` })
  public organization: OrganizationEntity;

  @AutoMap(() => PurchaseOrderEntity)
  @ManyToOne(() => PurchaseOrderEntity)
  @JoinColumn({ name: 'purchase_order_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.PurchaseReturns}__${ECoreTableName.PurchaseOrders}` })
  public purchaseOrder: PurchaseOrderEntity;

  @AutoMap(() => SupplierEntity)
  @ManyToOne(() => SupplierEntity)
  @JoinColumn({ name: 'supplier_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.PurchaseReturns}__${ECoreTableName.Suppliers}` })
  public supplier: SupplierEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.PurchaseReturns}__${ECoreTableName.Users}` })
  public createdBy?: UserEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'finalized_by_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.PurchaseReturns}__finalized_by` })
  public finalizedBy?: UserEntity;

  @AutoMap(() => [PurchaseReturnItemEntity])
  @OneToMany(() => PurchaseReturnItemEntity, (item) => item.purchaseReturn, { cascade: true })
  public items?: PurchaseReturnItemEntity[];
}
