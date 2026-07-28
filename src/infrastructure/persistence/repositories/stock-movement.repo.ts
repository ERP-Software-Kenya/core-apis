import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EntityManager, Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { StockMovementEntity } from '../entities';
import { StockMovement, StockMovementFilter, IStockMovementRepo } from 'src/application/modules/stock-movements';
import { StockMovementInput } from 'src/application/shared/interfaces/i-stock-operation.interface';

@Injectable()
export class StockMovementRepo
  extends BaseRepo<StockMovementEntity, StockMovement, string, PageableFilter<StockMovementFilter>, Filter<StockMovementFilter>>
  implements IStockMovementRepo
{
  constructor(
    @InjectRepository(StockMovementEntity) internalRepo: Repository<StockMovementEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(StockMovementRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, StockMovementEntity, StockMovement);
  }

  public override get idColumnName(): keyof StockMovementEntity {
    return 'id';
  }

  public async createWithManagerAsync(input: StockMovementInput, manager: EntityManager): Promise<StockMovement> {
    const entity = this.mapper.map(input, StockMovementInput, StockMovementEntity);
    await manager.save(StockMovementEntity, entity);
    return this.mapper.map(entity, StockMovementEntity, StockMovement);
  }

  public async listByInventoryAsync(inventoryId: string): Promise<StockMovement[]> {
    const entities = await this.internalRepo.find({
      where: { inventoryId, isUnpublishedEntry: false },
      order: { createdAt: 'DESC' },
    });
    return this.mapper.mapArray(entities, StockMovementEntity, StockMovement);
  }
}
