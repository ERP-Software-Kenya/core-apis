import { BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { ORGANIZATION_INVITATION_REPO } from '../../../../constants';
import { ERole } from '../../../../../infrastructure';
import { OrganizationInvitation } from '../../domain';
import { IOrganizationInvitationRepo } from '../../i-organization-invitation.repo';
import { OrganizationInvitationResponse } from '../../models';
import { ListInvitationsQuery } from './list-invitations.query';

@QueryHandlerStrict(ListInvitationsQuery)
export class ListInvitationsQueryHandler implements IQueryHandler<ListInvitationsQuery, OrganizationInvitationResponse[]> {
  public constructor(
    @Inject(ORGANIZATION_INVITATION_REPO) private readonly repo: IOrganizationInvitationRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(ListInvitationsQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListInvitationsQuery): Promise<OrganizationInvitationResponse[]> {
    this.logger.info(`Executing ${ListInvitationsQuery.name}`);
    const organizationId = this.resolveOrganizationId(query);
    await this.repo.bulkExpirePendingForOrganizationAsync(organizationId);
    const invitations = await this.repo.listByOrganizationWithRelationsAsync(organizationId);
    return this.mapper.mapArray(invitations, OrganizationInvitation, OrganizationInvitationResponse);
  }

  private resolveOrganizationId(query: ListInvitationsQuery): string {
    if (query.currentRoles.includes(ERole.SuperAdmin)) {
      const orgId = query.organizationId ?? query.currentOrganizationId;
      if (!orgId) throw new BadRequestException('Organization is required');
      return orgId;
    }
    if (!query.currentOrganizationId) throw new ForbiddenException('No organization assigned');
    return query.currentOrganizationId;
  }
}
