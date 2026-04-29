import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { SupplierEntity } from '../entities';
import { Supplier, SupplierFilter } from 'src/application/modules/suppliers/domain';
import { ISupplierRepo } from 'src/application/modules/suppliers';

@Injectable()
export class SupplierRepo extends BaseRepo<SupplierEntity, Supplier, string, PageableFilter<SupplierFilter>, Filter<SupplierFilter>> implements ISupplierRepo {
  constructor(
    @InjectRepository(SupplierEntity) internalRepo: Repository<SupplierEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(SupplierRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, SupplierEntity, Supplier);
  }

  public override get idColumnName(): keyof SupplierEntity {
    return 'id';
  }
}
