import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { BaseSeed } from '../../../common';
import { CategoryEntity } from '../entities';

@Injectable()
export class CategoriesSeed extends BaseSeed<CategoryEntity> {
  public get version(): number { return 1; }

    public get seedingData(): Partial<CategoryEntity>[] {
    return [
      {
        id: '00000000-0000-4000-8000-000000000003',
        organizationId: '00000000-0000-4000-8000-000000000001',
        name: 'Electronics',
        isActive: true,
      }
    ];
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(CategoryEntity) repo: Repository<CategoryEntity>,
    @InjectPinoLogger(CategoriesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<CategoryEntity>, y: Partial<CategoryEntity>): boolean {
    return x.name === y.name && x.organizationId === y.organizationId;
  }

  protected createFilter(): FindOptionsWhere<CategoryEntity> { return {}; }
}
