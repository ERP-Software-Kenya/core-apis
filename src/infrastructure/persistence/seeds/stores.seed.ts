import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { BaseSeed } from '../../../common';
import { StoreEntity } from '../entities';

@Injectable()
export class StoresSeed extends BaseSeed<StoreEntity> {
  public get version(): number { return 1; }

    public get seedingData(): Partial<StoreEntity>[] {
    return [
      {
        id: '00000000-0000-4000-8000-000000000002',
        organizationId: '00000000-0000-4000-8000-000000000001',
        name: 'Main HQ Store',
        isActive: true,
      }
    ];
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(StoreEntity) repo: Repository<StoreEntity>,
    @InjectPinoLogger(StoresSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<StoreEntity>, y: Partial<StoreEntity>): boolean {
    return x.name === y.name && x.organizationId === y.organizationId;
  }

  protected createFilter(): FindOptionsWhere<StoreEntity> { return {}; }
}
