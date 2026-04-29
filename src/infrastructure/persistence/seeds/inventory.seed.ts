import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { BaseSeed } from '../../../common';
import { InventoryEntity } from '../entities';

@Injectable()
export class InventorySeed extends BaseSeed<InventoryEntity> {
  public get version(): number { return 1; }
    public get seedingData(): Partial<InventoryEntity>[] {
    return [
      {
        storeId: '00000000-0000-4000-8000-000000000002',
        productId: '00000000-0000-4000-8000-000000000005',
        quantityOnHand: 150,
      }
    ];
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(InventoryEntity) repo: Repository<InventoryEntity>,
    @InjectPinoLogger(InventorySeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<InventoryEntity>, y: Partial<InventoryEntity>): boolean {
    return x.storeId === y.storeId && x.productId === y.productId;
  }

  protected createFilter(): FindOptionsWhere<InventoryEntity> { return {}; }
}
