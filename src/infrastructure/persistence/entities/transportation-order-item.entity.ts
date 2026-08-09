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
import { TransportationOrderEntity } from './transportation-order.entity';
import { ProductEntity } from './product.entity';

const PK_NAME = 'PK_' + ECoreTableName.TransportationOrderItems;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.TransportationOrderItems })
export class TransportationOrderItemEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public orderId: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public productId: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public quantity: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  public weight?: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  public volume?: number;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => TransportationOrderEntity)
  @ManyToOne(() => TransportationOrderEntity, (order) => order.items)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.TransportationOrderItems}__${ECoreTableName.TransportationOrders}`,
  })
  public order: TransportationOrderEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.TransportationOrderItems}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;
}
