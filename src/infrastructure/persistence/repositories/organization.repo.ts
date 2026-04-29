import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { OrganizationEntity } from '../entities';
import { OrganizationFilter, Organization } from '../../../application/modules/organizations/domain';
import { IOrganizationRepo } from 'src/application/modules/organizations';

@Injectable()
export class OrganizationRepo extends BaseRepo<OrganizationEntity, Organization, string, PageableFilter<OrganizationFilter>, Filter<OrganizationFilter>> implements IOrganizationRepo {
  constructor(
    @InjectRepository(OrganizationEntity) internalRepo: Repository<OrganizationEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(OrganizationRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, OrganizationEntity, Organization);
  }

  public override get idColumnName(): keyof OrganizationEntity {
    return 'id';
  }
}
