import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Between, Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { BillEntity } from '../entities';
import { Bill } from '../../../application/modules/bills/domain';
import { IBillRepo, BillFilter } from '../../../application/modules/bills';

@Injectable()
export class BillRepo
  extends BaseRepo<BillEntity, Bill, string, PageableFilter<BillFilter>, Filter<BillFilter>>
  implements IBillRepo
{
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

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  public async countForDateAsync(date: Date): Promise<number> {
    const yr = date.getUTCFullYear(), mo = date.getUTCMonth(), dy = date.getUTCDate();
    const start = new Date(Date.UTC(yr, mo, dy, 0, 0, 0, 0));
    const end   = new Date(Date.UTC(yr, mo, dy, 23, 59, 59, 999));
    return this.internalRepo.count({ where: { createdAt: Between(start, end) }, withDeleted: true });
  }
}
