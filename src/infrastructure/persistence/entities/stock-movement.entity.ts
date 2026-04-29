import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { StoreEntity } from './store.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';
import { InventoryEntity } from './inventory.entity';

const PK_NAME = 'PK_' + ECoreTableName.StockMovements;

export enum EMovementType {
  StockIn       = 'stock_in',
  StockOut      = 'stock_out',
  Adjustment    = 'adjustment',
  Transfer      = 'transfer',
  Return        = 'return',
  Damage        = 'damage',
  PurchaseReceipt = 'purchase_receipt',
}

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.StockMovements })
export class StockMovementEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public inventoryId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public storeId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  public performedById?: string;

  /** Reference to a purchase order, sale, or any business document */
  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  public referenceId?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public referenceType?: string;

  @AutoMap(() => String)
  @Column({ type: 'enum', enum: EMovementType })
  public movementType: EMovementType;

  /** Always positive — sign derived from movementType */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public quantity: number;

  /** Snapshot of on-hand qty BEFORE this movement */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public quantityBefore: number;

  /** Snapshot of on-hand qty AFTER this movement */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public quantityAfter: number;

  /** Unit cost at time of movement (for FIFO/avg cost valuation) */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, nullable: true })
  public unitCost?: number;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public notes?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => InventoryEntity)
  @ManyToOne(() => InventoryEntity, (inv) => inv.stockMovements)
  @JoinColumn({
    name: 'inventory_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockMovements}__${ECoreTableName.Inventory}`,
  })
  public inventory: InventoryEntity;

  @AutoMap(() => StoreEntity)
  @ManyToOne(() => StoreEntity, (store) => store.stockMovements)
  @JoinColumn({
    name: 'store_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockMovements}__${ECoreTableName.Stores}`,
  })
  public store: StoreEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockMovements}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.stockMovements, { nullable: true })
  @JoinColumn({
    name: 'performed_by_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockMovements}__${ECoreTableName.Users}`,
  })
  public performedBy?: UserEntity;
}
