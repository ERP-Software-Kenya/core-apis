import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { ORGANIZATION_UNIT_REPO } from '../../../../constants';
import { OrganizationUnit } from '../../domain';
import { IOrganizationUnitRepo } from '../../i-organization-unit.repo';
import { ListOrganizationUnitsQuery } from './list-organization-units.query';

@QueryHandlerStrict(ListOrganizationUnitsQuery)
export class ListOrganizationUnitsQueryHandler implements IQueryHandler<ListOrganizationUnitsQuery, OrganizationUnit[]> {
  constructor(
    @Inject(ORGANIZATION_UNIT_REPO) private readonly repo: IOrganizationUnitRepo,
    @InjectPinoLogger(ListOrganizationUnitsQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListOrganizationUnitsQuery): Promise<OrganizationUnit[]> {
    this.logger.info(`Executing Query "${ListOrganizationUnitsQuery.name}"`);
    return this.repo.allAsync({ organizationId: query.organizationId, name: query.name, symbol: query.symbol, isActive: query.isActive });
  }
}
