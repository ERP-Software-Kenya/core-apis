import { readFileSync } from 'fs';
import { join } from 'path';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository, DataSource } from "typeorm";
import { BaseSeed } from "../../../common";
import { LanguageEntity } from "../entities";

@Injectable()
export class RefLanguagesSeed extends BaseSeed<LanguageEntity> {
  public get version(): number { return 1; }

  public get seedingData(): Partial<LanguageEntity>[] {
    return JSON.parse(readFileSync(join(__dirname, 'data', 'languages.json'), 'utf-8')) as Partial<LanguageEntity>[];
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(LanguageEntity) repo: Repository<LanguageEntity>,
    @InjectPinoLogger(RefLanguagesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<LanguageEntity>, y: Partial<LanguageEntity>): boolean {
    return x.code === y.code;
  }

  protected createFilter(): FindOptionsWhere<LanguageEntity> { return {}; }
}
