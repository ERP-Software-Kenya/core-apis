import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { OrderEntity } from './order.entity';

const PK_NAME = 'PK_' + ECoreTableName.Invoices;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Invoices })
export class InvoiceEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public orderId: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, unique: true })
  public invoiceNumber: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 4, default: 0 })
  public totalAmount: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, default: 'DRAFT' })
  public status: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => Date)
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt?: Date;

  @AutoMap(() => OrderEntity)
  @ManyToOne(() => OrderEntity)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.Invoices}__${ECoreTableName.Orders}`,
  })
  public order: OrderEntity;
}
