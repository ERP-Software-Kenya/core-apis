import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { numericTransformer } from './numeric.transformer';
import { UnpublishedStockPurchaseOrderEntity } from './unpublished-stock-purchase-order.entity';
import { SupplierEntity } from './supplier.entity';
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.UnpublishedStockPurchaseOrderPayments;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.UnpublishedStockPurchaseOrderPayments })
export class UnpublishedStockPOPaymentEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'purchase_order_id', type: 'uuid' })
  public purchaseOrderId: string;

  @AutoMap()
  @Column({ name: 'supplier_id', type: 'uuid' })
  public supplierId: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer })
  public amount: number;

  @AutoMap()
  @Column({ name: 'payment_method', type: 'varchar', length: 50 })
  public paymentMethod: string;

  @AutoMap(() => Date)
  @Column({ name: 'paid_at', type: 'timestamp' })
  public paidAt: Date;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public note?: string;

  @AutoMap()
  @Column({ name: 'performed_by_id', type: 'uuid', nullable: true })
  public performedById?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => UnpublishedStockPurchaseOrderEntity)
  @ManyToOne(() => UnpublishedStockPurchaseOrderEntity)
  @JoinColumn({
    name: 'purchase_order_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK__uspop__unpublished_stock_purchase_orders',
  })
  public purchaseOrder: UnpublishedStockPurchaseOrderEntity;

  @AutoMap(() => SupplierEntity)
  @ManyToOne(() => SupplierEntity)
  @JoinColumn({
    name: 'supplier_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UnpublishedStockPurchaseOrderPayments}__${ECoreTableName.Suppliers}`,
  })
  public supplier: SupplierEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({
    name: 'performed_by_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UnpublishedStockPurchaseOrderPayments}__${ECoreTableName.Users}`,
  })
  public performedBy?: UserEntity;
}
