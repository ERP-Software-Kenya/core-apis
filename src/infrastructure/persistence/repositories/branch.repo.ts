import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { BranchEntity } from '../entities';
import { Branch, BranchFilter } from '../../../application/modules/branches/domain';
import { IBranchRepo } from 'src/application/modules/branches';

@Injectable()
export class BranchRepo
  extends BaseRepo<BranchEntity, Branch, string, PageableFilter<BranchFilter>, Filter<BranchFilter>>
  implements IBranchRepo
{
  constructor(
    @InjectRepository(BranchEntity) internalRepo: Repository<BranchEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(BranchRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, BranchEntity, Branch);
  }

  public override get idColumnName(): keyof BranchEntity {
    return 'id';
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }
}
