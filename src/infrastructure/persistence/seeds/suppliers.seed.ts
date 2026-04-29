import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { BaseSeed } from '../../../common';
import { SupplierEntity } from '../entities';

@Injectable()
export class SuppliersSeed extends BaseSeed<SupplierEntity> {
  public get version(): number { return 1; }
    public get seedingData(): Partial<SupplierEntity>[] {
    return [
      {
        id: '00000000-0000-4000-8000-000000000004',
        organizationId: '00000000-0000-4000-8000-000000000001',
        name: 'Tech Wholesalers Inc.',
        isActive: true,
      }
    ];
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(SupplierEntity) repo: Repository<SupplierEntity>,
    @InjectPinoLogger(SuppliersSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<SupplierEntity>, y: Partial<SupplierEntity>): boolean {
    return x.name === y.name && x.organizationId === y.organizationId;
  }

  protected createFilter(): FindOptionsWhere<SupplierEntity> { return {}; }
}
