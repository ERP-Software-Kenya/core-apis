import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { numericTransformer } from './numeric.transformer';
import { LocationEntity } from './location.entity';
import { ProductEntity } from './product.entity';
import { UnpublishedStockPurchaseItemEntity } from './unpublished-stock-purchase-item.entity';
import { UnpublishedStockPurchaseReturnEntity } from './unpublished-stock-purchase-return.entity';

@Index(`IX__${ECoreTableName.UnpublishedStockPurchaseReturnItems}__purchase_item`, ['purchaseItemId'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.UnpublishedStockPurchaseReturnItems })
export class UnpublishedStockPurchaseReturnItemEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: `PK_${ECoreTableName.UnpublishedStockPurchaseReturnItems}` }) id: string;
  @Column({ name: 'purchase_return_id', type: 'uuid' }) purchaseReturnId: string;
  @Column({ name: 'purchase_item_id', type: 'uuid' }) purchaseItemId: string;
  @Column({ name: 'product_id', type: 'uuid' }) productId: string;
  @Column({ name: 'location_id', type: 'uuid' }) locationId: string;
  @Column({ type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer }) quantity: number;
  @Column({ name: 'unit_cost', type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer }) unitCost: number;
  @Column({ name: 'line_total', type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer }) lineTotal: number;
  @Column({ type: 'text', nullable: true }) reason?: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) createdAt: Date;
  @ManyToOne(() => UnpublishedStockPurchaseReturnEntity, (ret) => ret.items, { onDelete: 'CASCADE' }) @JoinColumn({ name: 'purchase_return_id' }) purchaseReturn: UnpublishedStockPurchaseReturnEntity;
  @ManyToOne(() => UnpublishedStockPurchaseItemEntity) @JoinColumn({ name: 'purchase_item_id' }) purchaseItem: UnpublishedStockPurchaseItemEntity;
  @ManyToOne(() => ProductEntity) @JoinColumn({ name: 'product_id' }) product: ProductEntity;
  @ManyToOne(() => LocationEntity) @JoinColumn({ name: 'location_id' }) location: LocationEntity;
}
