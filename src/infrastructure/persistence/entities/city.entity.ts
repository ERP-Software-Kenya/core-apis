import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';
import { StateEntity } from './state.entity';
import { CountryEntity } from './country.entity';

const PK_NAME = 'PK_' + ECoreTableName.Cities;
const FK_STATE = 'FK_' + ECoreTableName.Cities + '_state';
const FK_COUNTRY = 'FK_' + ECoreTableName.Cities + '_country';

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Cities })
export class CityEntity {
  @AutoMap()
  @PrimaryColumn({ type: 'int', primaryKeyConstraintName: PK_NAME })
  public id: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @AutoMap()
  @Column({ type: 'int' })
  public stateId: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 10, nullable: true })
  public stateCode?: string;

  @AutoMap()
  @Column({ type: 'int' })
  public countryId: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 2, nullable: true })
  public countryCode?: string;

  @AutoMap()
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  public latitude?: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  public longitude?: number;

  // ─── Relations ──────────────────────────────────────────────────────────────

  @ManyToOne(() => StateEntity, (state) => state.cities)
  @JoinColumn({ name: 'state_id', foreignKeyConstraintName: FK_STATE })
  public state?: StateEntity;

  @ManyToOne(() => CountryEntity)
  @JoinColumn({ name: 'country_id', foreignKeyConstraintName: FK_COUNTRY })
  public country?: CountryEntity;
}
