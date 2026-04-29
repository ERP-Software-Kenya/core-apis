import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer } from '../../../../../common';
import { ORGANIZATION_REPO } from '../../../../constants';
import { Organization, OrganizationFilter } from '../../domain';
import { IOrganizationRepo } from '../..';
import { OrganizationFilterNormalizer } from '../../helpers';
import { ListOrganizationsQuery } from './list-organizations.query';

@QueryHandlerStrict(ListOrganizationsQuery)
export class ListOrganizationsQueryHandler implements IQueryHandler<ListOrganizationsQuery, Organization[]> {
  constructor(
    @Inject(ORGANIZATION_REPO) protected readonly repo: IOrganizationRepo,
    @Inject(OrganizationFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<OrganizationFilter>,
    @InjectPinoLogger(ListOrganizationsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListOrganizationsQuery): Promise<Organization[]> {
    this.logger.info(`Executing Query "${ListOrganizationsQuery.name}"`);
    const filter = this.filterNormalizer.normalize(query);
    return this.repo.allAsync(filter);
  }
}
