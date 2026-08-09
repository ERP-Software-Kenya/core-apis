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

const PK_NAME = 'PK_' + ECoreTableName.TripCheckpoints;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.TripCheckpoints })
export class TripCheckpointEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public tripId: string;

  @AutoMap()
  @Column({ type: 'text' })
  public location: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 8 })
  public latitude: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 11, scale: 8 })
  public longitude: number;

  @AutoMap(() => Date)
  @Column({ type: 'timestamp', nullable: true })
  public arrivalTime?: Date;

  @AutoMap(() => Date)
  @Column({ type: 'timestamp', nullable: true })
  public departureTime?: Date;

  @AutoMap()
  @Column({ type: 'int' })
  public sequence: number;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => TripEntity)
  @ManyToOne(() => TripEntity)
  @JoinColumn({
    name: 'trip_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.TripCheckpoints}__${ECoreTableName.Trips}`,
  })
  public trip: TripEntity;
}
