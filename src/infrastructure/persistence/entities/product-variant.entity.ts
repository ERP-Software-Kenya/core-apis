import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { ProductEntity } from './product.entity';

const PK_NAME = 'PK_' + ECoreTableName.ProductVariants;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.ProductVariants })
@Index(['productId', 'sku'], { unique: true })
export class ProductVariantEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public sku: string;

  @AutoMap()
  @Column({ type: 'jsonb', nullable: true })
  public attributes?: Record<string, any>;

  @AutoMap()
  @Column({ name: 'unit_price', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public unitPrice: number;

  @AutoMap()
  @Column({ name: 'cost_price', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public costPrice: number;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ProductVariants}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;
}
