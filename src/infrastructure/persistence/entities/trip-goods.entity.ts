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
import { TripEntity } from './trip.entity';
import { ProductEntity } from './product.entity';

const PK_NAME = 'PK_' + ECoreTableName.TripGoods;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.TripGoods })
export class TripGoodsEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public tripId: string;

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

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public remarks?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => TripEntity)
  @ManyToOne(() => TripEntity)
  @JoinColumn({
    name: 'trip_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.TripGoods}__${ECoreTableName.Trips}`,
  })
  public trip: TripEntity;

  @AutoMap(() => ProductEntity)
  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.TripGoods}__${ECoreTableName.Products}`,
  })
  public product: ProductEntity;
}
