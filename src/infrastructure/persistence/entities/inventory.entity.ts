import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { LocationEntity } from './location.entity';
import { ProductEntity } from './product.entity';
import { StockMovementEntity } from './stock-movement.entity';
import { OrganizationEntity } from './organization.entity';

const PK_NAME = 'PK_' + ECoreTableName.Inventory;

@Unique(`UQ__${ECoreTableName.Inventory}__org_location_product`, ['organizationId', 'locationId', 'productId'])
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Inventory })
export class InventoryEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'organization_id', type: 'uuid' })
  public organizationId: string;

  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid' })
  public locationId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  /** Published live stock — visible to all ERP operations */
  @AutoMap()
  @Column({ name: 'quantity_on_hand', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public quantityOnHand: number;

  /** Reserved for pending orders */
  @AutoMap()
  @Column({ name: 'quantity_reserved', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public quantityReserved: number;

  /** Min quantity before reorder alert fires */
  @AutoMap()
  @Column({ name: 'reorder_level', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public reorderLevel: number;

  /** Max stocking capacity for this location */
  @AutoMap()
  @Column({ name: 'max_stock', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public maxStock?: number;

  /** Running weighted average unit cost */
  @AutoMap()
  @Column({ name: 'average_cost', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public averageCost?: number;

  /** Physical location within the store/warehouse (aisle/shelf/bin) */
  @AutoMap()
  @Column({ name: 'bin_location', type: 'varchar', length: 100, nullable: true })
  public binLocation?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => OrganizationEntity)
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Inventory}__${ECoreTableName.Organizations}`,
  })
  public organization: OrganizationEntity;

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity, (loc) => loc.inventory)
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Inventory}__${ECoreTableName.Locations}`,
  })
  public location: LocationEntity;

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
