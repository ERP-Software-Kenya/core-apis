import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, DbException, Filter, PageableFilter } from '../../../common';
import { IPurchaseReturnRepo, PurchaseReturn, PurchaseReturnFilter } from '../../../application/modules/purchase-returns';
import { PurchaseReturnEntity } from '../entities';

@Injectable()
export class PurchaseReturnRepo
  extends BaseRepo<PurchaseReturnEntity, PurchaseReturn, string, PageableFilter<PurchaseReturnFilter>, Filter<PurchaseReturnFilter>>
  implements IPurchaseReturnRepo
{
  constructor(
    @InjectRepository(PurchaseReturnEntity) internalRepo: Repository<PurchaseReturnEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(PurchaseReturnRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, PurchaseReturnEntity, PurchaseReturn);
  }

  public override get idColumnName(): keyof PurchaseReturnEntity {
    return 'id';
  }

  public async getWithItemsAsync(id: string): Promise<PurchaseReturn | null> {
    try {
      const entity = await this.internalRepo.findOne({
        where: { id },
        relations: { items: true },
        order: { items: { createdAt: 'ASC' } },
      });
      return entity ? this.mapToModel(entity) : null;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public override async getAsync(id: string): Promise<PurchaseReturn> {
    return this.getWithItemsAsync(id);
  }
}
