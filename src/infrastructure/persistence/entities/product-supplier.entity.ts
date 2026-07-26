import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { ProductEntity } from './product.entity';
import { SupplierEntity } from './supplier.entity';

const PK_NAME = 'PK_' + ECoreTableName.ProductSuppliers;

@Index(`UQ__${ECoreTableName.ProductSuppliers}__product_supplier`, ['productId', 'supplierId'], { unique: true })
@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.ProductSuppliers })
export class ProductSupplierEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'product_id', type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ name: 'supplier_id', type: 'uuid' })
  public supplierId: string;

  /** Only one supplier per product can be default */
  @AutoMap()
  @Column({ name: 'is_default', type: 'boolean', default: false })
  public isDefault: boolean;

  /** Supplier-specific unit cost — overrides product.costPrice when set */
  @AutoMap()
  @Column({ name: 'unit_cost', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public unitCost?: number;

  /** Expected days from PO to delivery */
  @AutoMap()
  @Column({ name: 'lead_time_days', type: 'integer', nullable: true })
  public leadTimeDays?: number;

  /** Minimum units per order */
  @AutoMap()
  @Column({ name: 'min_order_qty', type: 'decimal', precision: 18, scale: 4, nullable: true })
  public minOrderQty?: number;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity, (product) => product.productSuppliers, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ProductSuppliers}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;

  @AutoMap(() => SupplierEntity)
  @ManyToOne(() => SupplierEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'supplier_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ProductSuppliers}__${ECoreTableName.Suppliers}`,
  })
  public supplier: SupplierEntity;
}
