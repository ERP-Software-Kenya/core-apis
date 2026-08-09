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
import { ETripEventType } from '../../../application/shared/enums/e-trip-event-type';

const PK_NAME = 'PK_' + ECoreTableName.TripEvents;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.TripEvents })
export class TripEventEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public tripId: string;

  @AutoMap()
  @Column({ type: 'enum', enum: ETripEventType })
  public eventType: ETripEventType;

  @AutoMap()
  @Column({ type: 'varchar', length: 100 })
  public title: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public description?: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  public latitude?: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  public longitude?: number;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => TripEntity)
  @ManyToOne(() => TripEntity)
  @JoinColumn({
    name: 'trip_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.TripEvents}__${ECoreTableName.Trips}`,
  })
  public trip: TripEntity;
}
