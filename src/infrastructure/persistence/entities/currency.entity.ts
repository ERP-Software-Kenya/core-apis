import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';

const PK_NAME = 'PK_' + ECoreTableName.Currencies;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Currencies })
export class CurrencyEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('increment', { primaryKeyConstraintName: PK_NAME })
  public id: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 10, unique: true })
  public code: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 10, nullable: true })
  public symbol?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 10, nullable: true })
  public symbolNative?: string;

  @AutoMap()
  @Column({ type: 'int', default: 2 })
  public decimalDigits: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  public rounding: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public namePlural?: string;
}
