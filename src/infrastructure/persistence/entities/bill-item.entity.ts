import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { BillEntity } from './bill.entity';
import { ProductEntity } from './product.entity';
import { ProductVariantEntity } from './product-variant.entity';

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

  @AutoMap()
  @Column({ name: 'variant_id', type: 'uuid', nullable: true })
  public variantId?: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public quantity: number;

  @AutoMap()
  @Column({ name: 'unit_price', type: 'decimal', precision: 18, scale: 4 })
  public unitPrice: number;

  @AutoMap()
  @Column({ name: 'tax_rate', type: 'decimal', precision: 5, scale: 2, default: 0 })
  public taxRate: number;

  @AutoMap()
  @Column({ name: 'tax_amount', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public taxAmount: number;

  @AutoMap()
  @Column({ name: 'discount_amount', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public discountAmount: number;

  @AutoMap()
  @Column({ name: 'line_total', type: 'decimal', precision: 18, scale: 4 })
  public lineTotal: number;

  // ─── Relations ──────────────────────────────────────────────────────────────

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

  @AutoMap(() => ProductVariantEntity)
  @ManyToOne(() => ProductVariantEntity)
  @JoinColumn({
    name: 'variant_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.BillItems}__${ECoreTableName.ProductVariants}`,
  })
  public variant?: ProductVariantEntity;
}
