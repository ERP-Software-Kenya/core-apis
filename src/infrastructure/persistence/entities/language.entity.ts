import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CORE_SCHEMA, ECoreTableName } from './e-core-table-name';

const PK_NAME = 'PK_' + ECoreTableName.Languages;

@Entity({ schema: CORE_SCHEMA, name: ECoreTableName.Languages })
export class LanguageEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('increment', { primaryKeyConstraintName: PK_NAME })
  public id: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 10, unique: true })
  public code: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  public name: string;
}
