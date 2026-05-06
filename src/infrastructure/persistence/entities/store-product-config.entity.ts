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
import { StoreEntity } from './store.entity';
import { ProductEntity } from './product.entity';
import { ProductVariantEntity } from './product-variant.entity';

const PK_NAME = 'PK_' + ECoreTableName.StoreProductConfig;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.StoreProductConfig })
@Index(['storeId', 'productId', 'variantId'], { unique: true })
export class StoreProductConfigEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'store_id', type: 'uuid' })
  public storeId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'variant_id', type: 'uuid', nullable: true })
  public variantId?: string;

  @AutoMap()
  @Column({ name: 'selling_price', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public sellingPrice: number;

  @AutoMap()
  @Column({ name: 'min_stock_level', type: 'integer', default: 0 })
  public minStockLevel: number;

  @AutoMap()
  @Column({ name: 'is_available', type: 'boolean', default: true })
  public isAvailable: boolean;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => StoreEntity)
  @ManyToOne(() => StoreEntity)
  @JoinColumn({
    name: 'store_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StoreProductConfig}__${ECoreTableName.Stores}`,
  })
  public store: StoreEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StoreProductConfig}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;

  @AutoMap(() => ProductVariantEntity)
  @ManyToOne(() => ProductVariantEntity)
  @JoinColumn({
    name: 'variant_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StoreProductConfig}__${ECoreTableName.ProductVariants}`,
  })
  public variant?: ProductVariantEntity;
}
