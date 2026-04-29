import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { ORGANIZATION_REPO } from '../../../../constants';
import { Organization } from '../../domain';
import { IOrganizationRepo } from '../..';
import { GetOrganizationQuery } from './get-organization.query';

@QueryHandlerStrict(GetOrganizationQuery)
export class GetOrganizationQueryHandler implements IQueryHandler<GetOrganizationQuery, Organization> {
  constructor(
    @Inject(ORGANIZATION_REPO) private readonly repo: IOrganizationRepo,
    @InjectPinoLogger(GetOrganizationQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetOrganizationQuery): Promise<Organization> {
    this.logger.info(`Executing ${GetOrganizationQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
