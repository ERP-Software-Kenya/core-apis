import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { UnpublishedStockPurchaseOrderEntity } from './unpublished-stock-purchase-order.entity';
import { ProductEntity } from './product.entity';

const PK_NAME = 'PK_' + ECoreTableName.UnpublishedStockPurchaseItems;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.UnpublishedStockPurchaseItems })
export class UnpublishedStockPurchaseItemEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public purchaseOrderId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public quantityOrdered: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public quantityReceived: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public quantityAllocated: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public unitCost: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public totalCost: number;

  @AutoMap()
  @Column({ name: 'pack_quantity', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public packQuantity?: number;

  @AutoMap()
  @Column({ name: 'pack_size_snapshot', type: 'integer', nullable: true })
  public packSizeSnapshot?: number;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => UnpublishedStockPurchaseOrderEntity)
  @ManyToOne(() => UnpublishedStockPurchaseOrderEntity, (po) => po.items, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'purchase_order_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UnpublishedStockPurchaseItems}__${ECoreTableName.UnpublishedStockPurchaseOrders}`,
  })
  public purchaseOrder: UnpublishedStockPurchaseOrderEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.UnpublishedStockPurchaseItems}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;
}
