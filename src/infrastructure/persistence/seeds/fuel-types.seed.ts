import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { BaseSeed } from '../../../common';
import { FuelTypeEntity } from '../entities';

@Injectable()
export class FuelTypesSeed extends BaseSeed<FuelTypeEntity> {
  public get version(): number {
    return 1;
  }

  public get seedingData(): Partial<FuelTypeEntity>[] {
    return [
      { name: 'Diesel' },
      { name: 'Petrol' },
      { name: 'CNG' },
      { name: 'LNG' },
      { name: 'Electric' },
      { name: 'Hybrid' },
      { name: 'LPG' },
      { name: 'Hydrogen' },
    ];
  }

  public constructor(
    dataSource: DataSource,
    @InjectRepository(FuelTypeEntity) repo: Repository<FuelTypeEntity>,
    @InjectPinoLogger(FuelTypesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<FuelTypeEntity>, y: Partial<FuelTypeEntity>): boolean {
    return x.name === y.name;
  }

  protected createFilter(): FindOptionsWhere<FuelTypeEntity> {
    return {};
  }
}
