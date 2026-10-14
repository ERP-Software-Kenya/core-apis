import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { numericTransformer } from './numeric.transformer';
import { OrganizationEntity } from './organization.entity';
import { SupplierEntity } from './supplier.entity';
import { UnpublishedStockPurchaseReturnEntity } from './unpublished-stock-purchase-return.entity';
import { UserEntity } from './user.entity';

@Index(`IX__${ECoreTableName.UnpublishedStockPurchaseReturnRefunds}__return`, ['purchaseReturnId'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.UnpublishedStockPurchaseReturnRefunds })
export class UnpublishedStockPurchaseReturnRefundEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: `PK_${ECoreTableName.UnpublishedStockPurchaseReturnRefunds}` }) id: string;
  @Column({ name: 'organization_id', type: 'uuid' }) organizationId: string;
  @Column({ name: 'purchase_return_id', type: 'uuid' }) purchaseReturnId: string;
  @Column({ name: 'supplier_id', type: 'uuid' }) supplierId: string;
  @Column({ type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer }) amount: number;
  @Column({ name: 'payment_method', type: 'varchar', length: 50 }) paymentMethod: string;
  @Column({ name: 'received_at', type: 'timestamp' }) receivedAt: Date;
  @Column({ type: 'text', nullable: true }) note?: string;
  @Column({ name: 'performed_by_id', type: 'uuid', nullable: true }) performedById?: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) createdAt: Date;
  @ManyToOne(() => OrganizationEntity) @JoinColumn({ name: 'organization_id' }) organization: OrganizationEntity;
  @ManyToOne(() => UnpublishedStockPurchaseReturnEntity) @JoinColumn({ name: 'purchase_return_id' }) purchaseReturn: UnpublishedStockPurchaseReturnEntity;
  @ManyToOne(() => SupplierEntity) @JoinColumn({ name: 'supplier_id' }) supplier: SupplierEntity;
  @ManyToOne(() => UserEntity, { nullable: true }) @JoinColumn({ name: 'performed_by_id' }) performedBy?: UserEntity;
}
