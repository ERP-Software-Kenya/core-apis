import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { BaseSeed } from '../../../common';
import { ProductEntity } from '../entities';

@Injectable()
export class ProductsSeed extends BaseSeed<ProductEntity> {
  public get version(): number { return 1; }
    public get seedingData(): Partial<ProductEntity>[] {
    return [
      {
        id: '00000000-0000-4000-8000-000000000005',
        organizationId: '00000000-0000-4000-8000-000000000001',
        categoryId: '00000000-0000-4000-8000-000000000003',
        name: 'High-End Laptop',
        isActive: true,
      }
    ];
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(ProductEntity) repo: Repository<ProductEntity>,
    @InjectPinoLogger(ProductsSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<ProductEntity>, y: Partial<ProductEntity>): boolean {
    return x.sku === y.sku && x.organizationId === y.organizationId;
  }

  protected createFilter(): FindOptionsWhere<ProductEntity> { return {}; }
}
