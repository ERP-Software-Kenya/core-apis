import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EntityManager, Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { UnpublishedStockMovementEntity } from '../entities';
import { UnpublishedStockMovement, UnpublishedStockMovementFilter, IUnpublishedStockMovementRepo } from 'src/application/modules/unpublished-stock';
import { UnpublishedStockMovementInput } from 'src/application/shared/interfaces/i-stock-operation.interface';

@Injectable()
export class UnpublishedStockMovementRepo
  extends BaseRepo<UnpublishedStockMovementEntity, UnpublishedStockMovement, string, PageableFilter<UnpublishedStockMovementFilter>, Filter<UnpublishedStockMovementFilter>>
  implements IUnpublishedStockMovementRepo
{
  constructor(
    @InjectRepository(UnpublishedStockMovementEntity) internalRepo: Repository<UnpublishedStockMovementEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(UnpublishedStockMovementRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, UnpublishedStockMovementEntity, UnpublishedStockMovement);
  }

  public override get idColumnName(): keyof UnpublishedStockMovementEntity {
    return 'id';
  }

  public async createWithManagerAsync(input: UnpublishedStockMovementInput, manager: EntityManager): Promise<UnpublishedStockMovement> {
    const entity = this.mapper.map(input, UnpublishedStockMovementInput, UnpublishedStockMovementEntity);
    await manager.save(UnpublishedStockMovementEntity, entity);
    return this.mapper.map(entity, UnpublishedStockMovementEntity, UnpublishedStockMovement);
  }

  public async listByUnpublishedStockAsync(unpublishedStockId: string): Promise<UnpublishedStockMovement[]> {
    const entities = await this.internalRepo.find({
      where: { unpublishedStockId },
      order: { createdAt: 'DESC' },
    });
    return this.mapper.mapArray(entities, UnpublishedStockMovementEntity, UnpublishedStockMovement);
  }
}
