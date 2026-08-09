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
import { CustomerEntity } from './customer.entity';
import { EOrderPriority } from '../../../application/shared/enums/e-order-priority';
import { EOrderStatus } from '../../../application/shared/enums/e-order-status';
import { TransportationOrderItemEntity } from './transportation-order-item.entity';

const PK_NAME = 'PK_' + ECoreTableName.TransportationOrders;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.TransportationOrders })
export class TransportationOrderEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, unique: true })
  public orderNumber: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public customerId: string;

  @AutoMap()
  @Column({ type: 'text' })
  public pickupAddress: string;

  @AutoMap()
  @Column({ type: 'text' })
  public deliveryAddress: string;

  @AutoMap(() => Date)
  @Column({ type: 'timestamp' })
  public expectedDelivery: Date;

  @AutoMap()
  @Column({ type: 'enum', enum: EOrderStatus, default: EOrderStatus.Pending })
  public status: EOrderStatus;

  @AutoMap()
  @Column({ type: 'enum', enum: EOrderPriority, default: EOrderPriority.Medium })
  public priority: EOrderPriority;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public remarks?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => Date)
  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  public updatedAt?: Date;

  @AutoMap(() => CustomerEntity)
  @ManyToOne(() => CustomerEntity)
  @JoinColumn({
    name: 'customer_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.TransportationOrders}__${ECoreTableName.Customers}`,
  })
  public customer: CustomerEntity;

  @AutoMap(() => [TransportationOrderItemEntity])
  @OneToMany(() => TransportationOrderItemEntity, (item) => item.order)
  public items?: TransportationOrderItemEntity[];
}
