import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { numericTransformer } from './numeric.transformer';
import { LocationEntity } from './location.entity';
import { ProductEntity } from './product.entity';
import { PurchaseItemEntity } from './purchase-item.entity';
import { PurchaseReturnEntity } from './purchase-return.entity';

const PK_NAME = 'PK_' + ECoreTableName.PurchaseReturnItems;

export enum EPurchaseReturnItemSourceType {
  UnallocatedReceived = 'unallocated_received',
  AllocatedStock      = 'allocated_stock',
}

@Index(`IX__${ECoreTableName.PurchaseReturnItems}__purchase_item`, ['purchaseItemId'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.PurchaseReturnItems })
export class PurchaseReturnItemEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'purchase_return_id', type: 'uuid' })
  public purchaseReturnId: string;

  @AutoMap()
  @Column({ name: 'purchase_item_id', type: 'uuid' })
  public purchaseItemId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer })
  public quantity: number;

  @AutoMap()
  @Column({ name: 'unit_cost', type: 'decimal', precision: 18, scale: 4, transformer: numericTransformer })
  public unitCost: number;

  @AutoMap()
  @Column({ name: 'line_total', type: 'decimal', precision: 18, scale: 4, default: 0, transformer: numericTransformer })
  public lineTotal: number;

  @AutoMap(() => String)
  @Column({ name: 'source_type', type: 'enum', enum: EPurchaseReturnItemSourceType })
  public sourceType: EPurchaseReturnItemSourceType;

  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid', nullable: true })
  public locationId?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public reason?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => PurchaseReturnEntity)
  @ManyToOne(() => PurchaseReturnEntity, (ret) => ret.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchase_return_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.PurchaseReturnItems}__${ECoreTableName.PurchaseReturns}` })
  public purchaseReturn: PurchaseReturnEntity;

  @AutoMap(() => PurchaseItemEntity)
  @ManyToOne(() => PurchaseItemEntity)
  @JoinColumn({ name: 'purchase_item_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.PurchaseReturnItems}__${ECoreTableName.PurchaseItems}` })
  public purchaseItem: PurchaseItemEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.PurchaseReturnItems}__${ECoreTableName.Products}` })
  public product: ProductEntity;

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity, { nullable: true })
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id', foreignKeyConstraintName: `FK__${ECoreTableName.PurchaseReturnItems}__${ECoreTableName.Locations}` })
  public location?: LocationEntity;
}
