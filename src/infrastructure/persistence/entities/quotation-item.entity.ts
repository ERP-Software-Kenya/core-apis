import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { numericTransformer } from './numeric.transformer';
import { QuotationEntity } from './quotation.entity';
import { ProductEntity } from './product.entity';
import { ProductVariantEntity } from './product-variant.entity';

const PK_NAME = 'PK_' + ECoreTableName.QuotationItems;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.QuotationItems })
export class QuotationItemEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'quotation_id', type: 'uuid' })
  public quotationId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'variant_id', type: 'uuid', nullable: true })
  public variantId?: string;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 4,
    transformer: numericTransformer,
  })
  public quantity: number;

  @AutoMap()
  @Column({
    name: 'unit_price_inclusive',
    type: 'decimal',
    precision: 18,
    scale: 4,
    transformer: numericTransformer,
  })
  public unitPriceInclusive: number;

  @AutoMap()
  @Column({
    name: 'unit_taxable',
    type: 'decimal',
    precision: 18,
    scale: 4,
    transformer: numericTransformer,
  })
  public unitTaxable: number;

  @AutoMap()
  @Column({
    name: 'tax_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
    transformer: numericTransformer,
  })
  public taxRate: number;

  @AutoMap()
  @Column({
    name: 'tax_amount',
    type: 'decimal',
    precision: 18,
    scale: 4,
    default: 0,
    transformer: numericTransformer,
  })
  public taxAmount: number;

  @AutoMap()
  @Column({
    name: 'line_total',
    type: 'decimal',
    precision: 18,
    scale: 4,
    transformer: numericTransformer,
  })
  public lineTotal: number;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => QuotationEntity)
  @ManyToOne(() => QuotationEntity, (quotation) => quotation.items, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'quotation_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.QuotationItems}__${ECoreTableName.Quotations}`,
  })
  public quotation: QuotationEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.QuotationItems}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;

  @AutoMap(() => ProductVariantEntity)
  @ManyToOne(() => ProductVariantEntity, { nullable: true })
  @JoinColumn({
    name: 'variant_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.QuotationItems}__product_variants`,
  })
  public variant?: ProductVariantEntity;
}
