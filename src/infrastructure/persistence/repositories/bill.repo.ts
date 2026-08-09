import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, DbException, Filter, PageableFilter } from '../../../common';
import { BillEntity } from '../entities';
import { Bill } from '../../../application/modules/bills/domain';
import { IBillRepo, BillFilter } from '../../../application/modules/bills';

@Injectable()
export class BillRepo extends BaseRepo<BillEntity, Bill, string, PageableFilter<BillFilter>, Filter<BillFilter>> implements IBillRepo {
  constructor(
    @InjectRepository(BillEntity) internalRepo: Repository<BillEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(BillRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, BillEntity, Bill);
  }

  public override get idColumnName(): keyof BillEntity {
    return 'id';
  }

  /**
   * A single bill always carries its lines — the POS resume flow and the bill
   * detail screen both read them from here. List/search stay header-only on
   * purpose so pagination isn't paying for a join it doesn't render.
   */
  public override async getAsync(pk: string): Promise<Bill> {
    try {
      const entity = await this.internalRepo.findOne({
        where: { id: pk } as never,
        relations: { items: true },
        order: { items: { createdAt: 'ASC' } },
      });
      return entity ? this.mapToModel(entity) : null;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }
}
