import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { numericTransformer } from './numeric.transformer';
import { OrganizationEntity } from './organization.entity';
import { SupplierEntity } from './supplier.entity';
import { UnpublishedStockPurchaseOrderEntity } from './unpublished-stock-purchase-order.entity';
import { UnpublishedStockPurchaseReturnItemEntity } from './unpublished-stock-purchase-return-item.entity';
import { UserEntity } from './user.entity';

export enum EUnpublishedStockPurchaseReturnStatus { Draft = 'draft', Finalized = 'finalized', Cancelled = 'cancelled' }

@Index(`IX__${ECoreTableName.UnpublishedStockPurchaseReturns}__org_po`, ['organizationId', 'purchaseOrderId'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.UnpublishedStockPurchaseReturns })
export class UnpublishedStockPurchaseReturnEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: `PK_${ECoreTableName.UnpublishedStockPurchaseReturns}` }) id: string;
  @Column({ name: 'return_number', type: 'varchar', length: 50, unique: true }) returnNumber: string;
  @Column({ name: 'organization_id', type: 'uuid' }) organizationId: string;
  @Column({ name: 'purchase_order_id', type: 'uuid' }) purchaseOrderId: string;
  @Column({ name: 'supplier_id', type: 'uuid' }) supplierId: string;
  @Column({ type: 'enum', enum: EUnpublishedStockPurchaseReturnStatus, default: EUnpublishedStockPurchaseReturnStatus.Draft }) status: EUnpublishedStockPurchaseReturnStatus;
  @Column({ name: 'total_amount', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer }) totalAmount: number;
  @Column({ name: 'supplier_credit_amount', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer }) supplierCreditAmount: number;
  @Column({ name: 'refunded_amount', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer }) refundedAmount: number;
  @Column({ type: 'text', nullable: true }) reason?: string;
  @Column({ type: 'text', nullable: true }) notes?: string;
  @Column({ name: 'created_by_id', type: 'uuid', nullable: true }) createdById?: string;
  @Column({ name: 'finalized_by_id', type: 'uuid', nullable: true }) finalizedById?: string;
  @Column({ name: 'finalized_at', type: 'timestamp', nullable: true }) finalizedAt?: Date;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true }) updatedAt?: Date;
  @ManyToOne(() => OrganizationEntity) @JoinColumn({ name: 'organization_id' }) organization: OrganizationEntity;
  @ManyToOne(() => UnpublishedStockPurchaseOrderEntity) @JoinColumn({ name: 'purchase_order_id' }) purchaseOrder: UnpublishedStockPurchaseOrderEntity;
  @ManyToOne(() => SupplierEntity) @JoinColumn({ name: 'supplier_id' }) supplier: SupplierEntity;
  @ManyToOne(() => UserEntity, { nullable: true }) @JoinColumn({ name: 'created_by_id' }) createdBy?: UserEntity;
  @ManyToOne(() => UserEntity, { nullable: true }) @JoinColumn({ name: 'finalized_by_id' }) finalizedBy?: UserEntity;
  @OneToMany(() => UnpublishedStockPurchaseReturnItemEntity, (item) => item.purchaseReturn, { cascade: true }) items: UnpublishedStockPurchaseReturnItemEntity[];
}
