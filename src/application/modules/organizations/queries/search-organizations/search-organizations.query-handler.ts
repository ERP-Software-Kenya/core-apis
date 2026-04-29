import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { IFilterNormalizer, IPageable } from '../../../../../common';
import { ORGANIZATION_REPO } from '../../../../constants';
import { Organization, OrganizationFilter } from '../../domain';
import { IOrganizationRepo } from '../..';
import { OrganizationFilterNormalizer } from '../../helpers';
import { SearchOrganizationsQuery } from './search-organizations.query';

@QueryHandlerStrict(SearchOrganizationsQuery)
export class SearchOrganizationsQueryHandler implements IQueryHandler<SearchOrganizationsQuery, IPageable<Organization>> {
  constructor(
    @Inject(ORGANIZATION_REPO) protected readonly repo: IOrganizationRepo,
    @Inject(OrganizationFilterNormalizer) protected readonly filterNormalizer: IFilterNormalizer<OrganizationFilter>,
    @InjectPinoLogger(SearchOrganizationsQueryHandler.name) protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchOrganizationsQuery): Promise<IPageable<Organization>> {
    this.logger.info(`Executing Query "${SearchOrganizationsQuery.name}"`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    return this.repo.pagedAsync(filter);
  }
}
