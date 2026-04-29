import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { StoreEntity } from './store.entity';
import { ProductEntity } from './product.entity';
import { StockMovementEntity } from './stock-movement.entity';

const PK_NAME = 'PK_' + ECoreTableName.Inventory;

@Unique(`UQ__${ECoreTableName.Inventory}__store_product`, ['storeId', 'productId'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Inventory })
export class InventoryEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public storeId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public productId: string;

  /** Current on-hand quantity */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public quantityOnHand: number;

  /** Reserved for pending orders — logical hold */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public quantityReserved: number;

  /** Min quantity before reorder alert fires */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public reorderLevel: number;

  /** Max stocking capacity for this store */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, nullable: true })
  public maxStock?: number;

  /** Physical location within the store (aisle/shelf/bin) */
  @AutoMap()
  @Column({ type: 'varchar', length: 100, nullable: true })
  public location?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => StoreEntity)
  @ManyToOne(() => StoreEntity, (store) => store.inventory)
  @JoinColumn({
    name: 'store_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Inventory}__${ECoreTableName.Stores}`,
  })
  public store: StoreEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity, (product) => product.inventory)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Inventory}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;

  @AutoMap(() => [StockMovementEntity])
  @OneToMany(() => StockMovementEntity, (sm) => sm.inventory)
  public stockMovements?: StockMovementEntity[];
}
