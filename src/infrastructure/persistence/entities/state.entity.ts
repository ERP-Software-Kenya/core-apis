import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { CountryEntity } from './country.entity';
import { CityEntity } from './city.entity';

const PK_NAME = 'PK_' + ECoreTableName.States;
const FK_COUNTRY = 'FK_' + ECoreTableName.States + '_country';

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.States })
export class StateEntity {
  @AutoMap()
  @PrimaryColumn({ type: 'int', primaryKeyConstraintName: PK_NAME })
  public id: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @AutoMap()
  @Column({ type: 'int' })
  public countryId: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 2, nullable: true })
  public countryCode?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 10, nullable: true })
  public fipsCode?: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 10, nullable: true })
  public iso2?: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  public latitude?: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  public longitude?: number;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @ManyToOne(() => CountryEntity, (country) => country.states)
  @JoinColumn({ name: 'country_id', foreignKeyConstraintName: FK_COUNTRY })
  public country?: CountryEntity;

  @OneToMany(() => CityEntity, (city) => city.state)
  public cities?: CityEntity[];
}
