import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

const PK_NAME = 'PK_' + ECoreTableName.OrderItems;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.OrderItems })
export class OrderItemEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'order_id', type: 'uuid' })
  public orderId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'variant_id', type: 'uuid', nullable: true })
  public variantId?: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public quantity: number;

  @AutoMap() @Column({ name: 'product_unit_id', type: 'uuid', nullable: true }) public productUnitId?: string;
  @AutoMap() @Column({ name: 'selected_unit_id', type: 'uuid', nullable: true }) public selectedUnitId?: string;
  @AutoMap() @Column({ name: 'selected_unit_name_snapshot', type: 'varchar', length: 100, nullable: true }) public selectedUnitNameSnapshot?: string;
  @AutoMap() @Column({ name: 'selected_unit_symbol_snapshot', type: 'varchar', length: 20, nullable: true }) public selectedUnitSymbolSnapshot?: string;
  @AutoMap() @Column({ name: 'entered_quantity', type: 'decimal', precision: 24, scale: 8, nullable: true }) public enteredQuantity?: string;
  @AutoMap() @Column({ name: 'conversion_factor_snapshot', type: 'decimal', precision: 24, scale: 8, nullable: true }) public conversionFactorSnapshot?: string;
  @AutoMap() @Column({ name: 'base_unit_id', type: 'uuid', nullable: true }) public baseUnitId?: string;
  @AutoMap() @Column({ name: 'price_per_base_unit', type: 'decimal', precision: 18, scale: 4, nullable: true }) public baseUnitPrice?: number;

  @AutoMap()
  @Column({ name: 'unit_price', type: 'decimal', precision: 18, scale: 4 })
  public unitPrice: number;

  @AutoMap()
  @Column({ name: 'tax_amount', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public taxAmount: number;

  @AutoMap()
  @Column({ name: 'line_total', type: 'decimal', precision: 18, scale: 4 })
  public lineTotal: number;

  /** Quantity expressed in packs at sale time; null when sale was entered in raw units */
  @AutoMap()
  @Column({ name: 'pack_quantity', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public packQuantity?: number;

  /** Product packSize snapshotted at time of sale for historical accuracy */
  @AutoMap()
  @Column({ name: 'pack_size_snapshot', type: 'integer', nullable: true })
  public packSizeSnapshot?: number;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => OrderEntity)
  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.OrderItems}__${ECoreTableName.Orders}`,
  })
  public order: OrderEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.OrderItems}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;
}
