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
import { numericTransformer } from './numeric.transformer';
import { BillEntity } from './bill.entity';
import { ProductEntity } from './product.entity';

const PK_NAME = 'PK_' + ECoreTableName.BillItems;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.BillItems })
export class BillItemEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'bill_id', type: 'uuid' })
  public billId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  /** Optional product variant. Plain column — no relation object is needed by consumers. */
  @AutoMap()
  @Column({ name: 'variant_id', type: 'uuid', nullable: true })
  public variantId?: string;

  /** Per-item stock location override — falls back to bill.locationId when null. */
  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid', nullable: true })
  public locationId?: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer })
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
  @Column({ name: 'unit_price', type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer })
  public unitPrice: number;

  /** Weighted-average inventory cost captured when the bill is completed. */
  @AutoMap()
  @Column({ name: 'unit_cost_snapshot', type: 'decimal', precision: 18, scale: 4, nullable: true, transformer: numericTransformer })
  public unitCostSnapshot?: number;

  /** Tax percentage applied to this line, e.g. 18 for 18%. */
  @AutoMap()
  @Column({ name: 'tax_rate', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public taxRate: number;

  /** Computed: taxable base x taxRate / 100 */
  @AutoMap()
  @Column({ name: 'tax_amount', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public taxAmount: number;

  @AutoMap()
  @Column({ name: 'discount_amount', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public discountAmount: number;

  /** Computed: quantity x unitPrice - discountAmount + taxAmount */
  @AutoMap()
  @Column({ name: 'line_total', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public lineTotal: number;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  // ─── Relations ────────────────────────────────────────────────────────────────

  @AutoMap(() => BillEntity)
  @ManyToOne(() => BillEntity, (bill) => bill.items, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'bill_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.BillItems}__${ECoreTableName.Bills}`,
  })
  public bill: BillEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.BillItems}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;
}
