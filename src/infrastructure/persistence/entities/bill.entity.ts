import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { SupplierEntity } from './supplier.entity';
import { StoreEntity } from './store.entity';

const PK_NAME = 'PK_' + ECoreTableName.Bills;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Bills })
export class BillEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'supplier_id', type: 'uuid' })
  public supplierId: string;

  @AutoMap()
  @Column({ name: 'store_id', type: 'uuid' })
  public storeId: string;

  @AutoMap()
  @Column({ name: 'total_amount', type: 'decimal', precision: 18, scale: 4 })
  public totalAmount: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, default: 'pending' })
  public status: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => SupplierEntity)
  @ManyToOne(() => SupplierEntity)
  @JoinColumn({
    name: 'supplier_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Bills}__${ECoreTableName.Suppliers}`,
  })
  public supplier: SupplierEntity;

  @AutoMap(() => StoreEntity)
  @ManyToOne(() => StoreEntity)
  @JoinColumn({
    name: 'store_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Bills}__${ECoreTableName.Stores}`,
  })
  public store: StoreEntity;
}
