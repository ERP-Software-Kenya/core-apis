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
import { PurchaseOrderEntity } from './purchase-order.entity';
import { ProductEntity } from './product.entity';

const PK_NAME = 'PK_' + ECoreTableName.PurchaseItems;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.PurchaseItems })
export class PurchaseItemEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public purchaseOrderId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public productId: string;

  /** Quantity ordered */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public quantityOrdered: number;

  @AutoMap() @Column({ name: 'product_unit_id', type: 'uuid', nullable: true }) public productUnitId?: string;
  @AutoMap() @Column({ name: 'selected_unit_id', type: 'uuid', nullable: true }) public selectedUnitId?: string;
  @AutoMap() @Column({ name: 'selected_unit_name_snapshot', type: 'varchar', length: 100, nullable: true }) public selectedUnitNameSnapshot?: string;
  @AutoMap() @Column({ name: 'selected_unit_symbol_snapshot', type: 'varchar', length: 20, nullable: true }) public selectedUnitSymbolSnapshot?: string;
  @AutoMap() @Column({ name: 'entered_quantity', type: 'decimal', precision: 24, scale: 8, nullable: true }) public enteredQuantity?: string;
  @AutoMap() @Column({ name: 'conversion_factor_snapshot', type: 'decimal', precision: 24, scale: 8, nullable: true }) public conversionFactorSnapshot?: string;
  @AutoMap() @Column({ name: 'base_unit_id', type: 'uuid', nullable: true }) public baseUnitId?: string;
  @AutoMap() @Column({ name: 'price_per_selected_unit', type: 'decimal', precision: 18, scale: 4, nullable: true }) public selectedUnitCost?: number;

  /** Quantity actually received (partial deliveries supported) */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public quantityReceived: number;

  /** Quantity allocated to specific locations so far */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public quantityAllocated: number;

  /** Agreed unit cost at time of order */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public unitCost: number;

  /** Computed: quantityOrdered × unitCost */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public totalCost: number;

  /** Quantity expressed in packs; null when entered in raw units */
  @AutoMap()
  @Column({ name: 'pack_quantity', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public packQuantity?: number;

  /** Product packSize snapshotted at time of PO for historical accuracy */
  @AutoMap()
  @Column({ name: 'pack_size_snapshot', type: 'integer', nullable: true })
  public packSizeSnapshot?: number;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => PurchaseOrderEntity)
  @ManyToOne(() => PurchaseOrderEntity, (po) => po.items, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'purchase_order_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.PurchaseItems}__${ECoreTableName.PurchaseOrders}`,
  })
  public purchaseOrder: PurchaseOrderEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity, (product) => product.purchaseItems)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.PurchaseItems}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;
}
