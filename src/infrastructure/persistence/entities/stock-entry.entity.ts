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
import { SupplierEntity } from './supplier.entity';

const PK_NAME = 'PK_' + ECoreTableName.StockEntries;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.StockEntries })
export class StockEntryEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid' })
  public locationId: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'supplier_id', type: 'uuid', nullable: true })
  public supplierId?: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4 })
  public quantity: number;

  @AutoMap()
  @Column({ name: 'unit_cost', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public unitCost: number;

  @AutoMap()
  @Column({ name: 'entry_type', type: 'varchar', length: 50, default: 'purchase' })
  public entryType: string;

  @AutoMap()
  @Column({ name: 'reference_number', type: 'varchar', length: 100, nullable: true })
  public referenceNumber?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, default: 'completed' })
  public status: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity)
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockEntries}__${ECoreTableName.Locations}`,
  })
  public location: LocationEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockEntries}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;

  @AutoMap(() => SupplierEntity)
  @ManyToOne(() => SupplierEntity)
  @JoinColumn({
    name: 'supplier_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.StockEntries}__${ECoreTableName.Suppliers}`,
  })
  public supplier?: SupplierEntity;
}
