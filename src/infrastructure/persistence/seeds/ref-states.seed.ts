import { readFileSync } from 'fs';
import { join } from 'path';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository, DataSource } from "typeorm";
import { BaseSeed } from "../../../common";
import { StateEntity } from "../entities";

@Injectable()
export class RefStatesSeed extends BaseSeed<StateEntity> {
  public get version(): number { return 1; }

  public get seedingData(): Partial<StateEntity>[] {
    return JSON.parse(readFileSync(join(__dirname, 'data', 'states.json'), 'utf-8')) as Partial<StateEntity>[];
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(StateEntity) repo: Repository<StateEntity>,
    @InjectPinoLogger(RefStatesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<StateEntity>, y: Partial<StateEntity>): boolean {
    return x.id === y.id;
  }

  protected createFilter(): FindOptionsWhere<StateEntity> { return {}; }
}
