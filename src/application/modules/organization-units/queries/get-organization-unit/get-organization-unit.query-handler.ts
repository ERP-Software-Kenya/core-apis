import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { ORGANIZATION_UNIT_REPO } from '../../../../constants';
import { OrganizationUnit } from '../../domain';
import { IOrganizationUnitRepo } from '../../i-organization-unit.repo';
import { GetOrganizationUnitQuery } from './get-organization-unit.query';

@QueryHandlerStrict(GetOrganizationUnitQuery)
export class GetOrganizationUnitQueryHandler implements IQueryHandler<GetOrganizationUnitQuery, OrganizationUnit> {
  constructor(
    @Inject(ORGANIZATION_UNIT_REPO) private readonly repo: IOrganizationUnitRepo,
    @InjectPinoLogger(GetOrganizationUnitQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetOrganizationUnitQuery): Promise<OrganizationUnit> {
    this.logger.info(`Executing ${GetOrganizationUnitQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
