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
import { LocationEntity } from './location.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';
import { InventoryEntity } from './inventory.entity';

const PK_NAME = 'PK_' + ECoreTableName.StockMovements;

export enum EMovementType {
  StockIn                 = 'stock_in',
  StockOut                = 'stock_out',
  Adjustment              = 'adjustment',
  TransferIn              = 'transfer_in',
  TransferOut             = 'transfer_out',
  Return                  = 'return',
  Damage                  = 'damage',
  WriteOff                = 'write_off',
  Published               = 'published',
  Reserved                = 'reserved',
  ReservationReleased     = 'reservation_released',
}

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.StockMovements })
export class StockMovementEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'inventory_id', type: 'uuid' })
  public inventoryId: string;

  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid' })
  public locationId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'performed_by_id', type: 'uuid', nullable: true })
  public performedById?: string;

  /** Reference to a purchase order, sale, transfer, or any business document */
  @AutoMap()
  @Column({ name: 'reference_id', type: 'uuid', nullable: true })
  public referenceId?: string;

  @AutoMap()
  @Column({ name: 'reference_type', type: 'varchar', length: 50, nullable: true })
  public referenceType?: string;

  @AutoMap(() => String)
  @Column({ name: 'movement_type', type: 'enum', enum: EMovementType })
  public movementType: EMovementType;

  /** Always positive — direction derived from movementType */
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public quantity: number;

  /** Snapshot of on-hand qty BEFORE this movement */
  @AutoMap()
  @Column({ name: 'quantity_before', type: 'decimal', precision: 18, scale: 4 })
  public quantityBefore: number;

  /** Snapshot of on-hand qty AFTER this movement */
  @AutoMap()
  @Column({ name: 'quantity_after', type: 'decimal', precision: 18, scale: 4 })
  public quantityAfter: number;

  /** Unit cost at time of movement (for avg cost valuation) */
  @AutoMap()
  @Column({ name: 'unit_cost', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public unitCost?: number;

  /** When true, belongs to the unpublished pool — hidden from published stock history */
  @AutoMap()
  @Column({ name: 'is_unpublished_entry', type: 'boolean', default: false })
  public isUnpublishedEntry: boolean;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public notes?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
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

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity, (loc) => loc.stockMovements)
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockMovements}__${ECoreTableName.Locations}`,
  })
  public location: LocationEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockMovements}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({
    name: 'performed_by_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockMovements}__${ECoreTableName.Users}`,
  })
  public performedBy?: UserEntity;
}
