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

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer })
  public quantity: number;

  @AutoMap()
  @Column({ name: 'unit_price', type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer })
  public unitPrice: number;

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
