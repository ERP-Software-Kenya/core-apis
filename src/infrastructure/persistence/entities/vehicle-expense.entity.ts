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
import { VehicleEntity } from './vehicle.entity';
import { TripEntity } from './trip.entity';
import { EExpenseType } from '../../../application/shared/enums/e-expense-type';

const PK_NAME = 'PK_' + ECoreTableName.VehicleExpenses;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.VehicleExpenses })
export class VehicleExpenseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  public id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  public vehicleId: string;

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  public tripId?: string;

  @AutoMap()
  @Column({ type: 'enum', enum: EExpenseType })
  public expenseType: EExpenseType;

  @AutoMap()
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  public amount: number;

  @AutoMap(() => Date)
  @Column({ type: 'date' })
  public expenseDate: Date;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public remarks?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  public attachment?: string;

  @AutoMap(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @AutoMap(() => VehicleEntity)
  @ManyToOne(() => VehicleEntity)
  @JoinColumn({
    name: 'vehicle_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.VehicleExpenses}__${ECoreTableName.Vehicles}`,
  })
  public vehicle: VehicleEntity;

  @AutoMap(() => TripEntity)
  @ManyToOne(() => TripEntity, { nullable: true })
  @JoinColumn({
    name: 'trip_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ECoreTableName.VehicleExpenses}__${ECoreTableName.Trips}`,
  })
  public trip?: TripEntity;
}
