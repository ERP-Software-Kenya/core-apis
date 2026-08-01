import { readFileSync } from 'fs';
import { join } from 'path';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository, DataSource } from "typeorm";
import { BaseSeed } from "../../../common";
import { CurrencyEntity } from "../entities";

@Injectable()
export class RefCurrenciesSeed extends BaseSeed<CurrencyEntity> {
  public get version(): number { return 1; }

  public get seedingData(): Partial<CurrencyEntity>[] {
    return JSON.parse(readFileSync(join(__dirname, 'data', 'currencies.json'), 'utf-8')) as Partial<CurrencyEntity>[];
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(CurrencyEntity) repo: Repository<CurrencyEntity>,
    @InjectPinoLogger(RefCurrenciesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<CurrencyEntity>, y: Partial<CurrencyEntity>): boolean {
    return x.code === y.code;
  }

  protected createFilter(): FindOptionsWhere<CurrencyEntity> { return {}; }
}
