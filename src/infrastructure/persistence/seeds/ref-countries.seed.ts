import { readFileSync } from 'fs';
import { join } from 'path';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository, DataSource } from "typeorm";
import { BaseSeed } from "../../../common";
import { CountryEntity } from "../entities";

@Injectable()
export class RefCountriesSeed extends BaseSeed<CountryEntity> {
  public get version(): number { return 1; }

  public get seedingData(): Partial<CountryEntity>[] {
    return JSON.parse(readFileSync(join(__dirname, 'data', 'countries.json'), 'utf-8')) as Partial<CountryEntity>[];
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(CountryEntity) repo: Repository<CountryEntity>,
    @InjectPinoLogger(RefCountriesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<CountryEntity>, y: Partial<CountryEntity>): boolean {
    return x.id === y.id;
  }

  protected createFilter(): FindOptionsWhere<CountryEntity> { return {}; }
}
