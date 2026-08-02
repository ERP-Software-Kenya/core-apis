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
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { LocationEntity } from './location.entity';
import { OrderEntity } from './order.entity';
import { SupplierEntity } from './supplier.entity';
import { ReturnItemEntity } from './return-item.entity';

const PK_NAME = 'PK_' + ECoreTableName.ItemReturns;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.ItemReturns })
export class ItemReturnEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ name: 'location_id', type: 'uuid' })
  public locationId: string;

  @AutoMap()
  @Column({ name: 'order_id', type: 'uuid', nullable: true })
  public orderId?: string;

  @AutoMap()
  @Column({ name: 'supplier_id', type: 'uuid', nullable: true })
  public supplierId?: string;

  @AutoMap()
  @Column({ name: 'return_type', type: 'varchar', length: 50 })
  public returnType: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, default: 'pending' })
  public status: string;

  @AutoMap()
  @Column({ name: 'total_amount', type: 'decimal', precision: 18, scale: 4, default: 0 })
  public totalAmount: number;

  @AutoMap(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @AutoMap(() => LocationEntity)
  @ManyToOne(() => LocationEntity)
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ItemReturns}__${ECoreTableName.Locations}`,
  })
  public location: LocationEntity;

  @AutoMap(() => OrderEntity)
  @ManyToOne(() => OrderEntity)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ItemReturns}__${ECoreTableName.Orders}`,
  })
  public order?: OrderEntity;

  @AutoMap(() => SupplierEntity)
  @ManyToOne(() => SupplierEntity)
  @JoinColumn({
    name: 'supplier_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.ItemReturns}__${ECoreTableName.Suppliers}`,
  })
  public supplier?: SupplierEntity;

  @AutoMap(() => [ReturnItemEntity])
  @OneToMany(() => ReturnItemEntity, (item) => item.return)
  public items?: ReturnItemEntity[];
}
