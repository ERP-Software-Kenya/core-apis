import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

const PK_NAME = 'PK_' + ECoreTableName.ProductLogs;

export enum EProductLogAction {
  ProductCreated              = 'product_created',
  ProductUpdated              = 'product_updated',
  ProductDisabled             = 'product_disabled',
  ProductEnabled              = 'product_enabled',
  StockAdded                  = 'stock_added',
  StockRemoved                = 'stock_removed',
  StockAdjusted               = 'stock_adjusted',
  StockReserved               = 'stock_reserved',
  StockReservationReleased    = 'stock_reservation_released',
  StockPublished              = 'stock_published',
  StockDamaged                = 'stock_damaged',
  StockWrittenOff             = 'stock_written_off',
  StockTransferredOut         = 'stock_transferred_out',
  StockTransferredIn          = 'stock_transferred_in',
}

@Index('IDX__product_logs__product_created', ['productId', 'createdAt'])
@Index('IDX__product_logs__org_created', ['organizationId', 'createdAt'])
@Index('IDX__product_logs__inventory_created', ['inventoryId', 'createdAt'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.ProductLogs })
export class ProductLogEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'inventory_id', type: 'uuid', nullable: true })
  public inventoryId?: string;

  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid', nullable: true })
  public locationId?: string;

  @AutoMap()
  @Column({ name: 'performed_by_id', type: 'uuid', nullable: true })
  public performedById?: string;

  @AutoMap(() => String)
  @Column({ type: 'enum', enum: EProductLogAction })
  public action: EProductLogAction;

  /** Field-level change records for PRODUCT_UPDATED events: [{field, oldValue, newValue}] */
  @AutoMap()
  @Column({ name: 'changed_fields', type: 'jsonb', nullable: true })
  public changedFields?: Array<{ field: string; oldValue: unknown; newValue: unknown }>;

  /** Extra context: quantity, movementType, referenceId, unitCost, etc. */
  @AutoMap()
  @Column({ type: 'jsonb', nullable: true })
  public metadata?: Record<string, unknown>;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ProductLogs}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({
    name: 'performed_by_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ProductLogs}__${ECoreTableName.Users}`,
  })
  public performedBy?: UserEntity;
}
