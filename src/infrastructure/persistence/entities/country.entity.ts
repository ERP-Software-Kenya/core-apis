import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { StateEntity } from './state.entity';

const PK_NAME = 'PK_' + ECoreTableName.Countries;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Countries })
export class CountryEntity {
  @AutoMap()
  @PrimaryColumn({ type: 'int', primaryKeyConstraintName: PK_NAME })
  public id: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 3 })
  public iso3: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 2 })
  public iso2: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 25, nullable: true })
  public phoneCode?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 10, nullable: true })
  public currency?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 10, nullable: true })
  public currencySymbol?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public native?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public region?: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  public latitude?: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  public longitude?: number;

  @AutoMap()
  @Column({ type: 'jsonb', nullable: true })
  public timezones?: any[];

  // ─── Relations ──────────────────────────────────────────────────────────────

  @OneToMany(() => StateEntity, (state) => state.country)
  public states?: StateEntity[];
}
