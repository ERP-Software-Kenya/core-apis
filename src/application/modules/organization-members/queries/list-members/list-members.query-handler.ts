import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from '../../../../../common';
import { ERole, OrgMemberEntity } from '../../../../../infrastructure';
import { OrganizationMemberResponse } from '../../models';
import { ListMembersQuery } from './list-members.query';

@QueryHandlerStrict(ListMembersQuery)
export class ListMembersQueryHandler implements IQueryHandler<ListMembersQuery, OrganizationMemberResponse[]> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(ListMembersQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListMembersQuery): Promise<OrganizationMemberResponse[]> {
    this.logger.info(`Executing ${ListMembersQuery.name}`);
    const organizationId = this.resolveOrganizationId(query);
    const members = await this.dataSource.getRepository(OrgMemberEntity).find({
      where: { organizationId },
      relations: { user: { userRoles: { role: true, location: true } }, role: true },
      order: { joinedAt: 'DESC' },
    });
    return members.map((member) => this.buildMemberResponse(member));
  }

  private resolveOrganizationId(query: ListMembersQuery): string {
    if (query.currentRoles.includes(ERole.SuperAdmin)) {
      const orgId = query.organizationId ?? query.currentOrganizationId;
      if (!orgId) throw new BadRequestException('Organization is required');
      return orgId;
    }
    if (!query.currentOrganizationId) throw new ForbiddenException('No organization assigned');
    return query.currentOrganizationId;
  }

  private buildMemberResponse(member: OrgMemberEntity): OrganizationMemberResponse {
    const ur = member.user?.userRoles?.[0];
    const response = new OrganizationMemberResponse();
    response.id = member.id; response.userId = member.userId;
    response.email = member.user?.email ?? ''; response.firstName = member.user?.firstName;
    response.lastName = member.user?.lastName; response.roleId = member.roleId;
    response.roleName = member.role?.name ?? ur?.role?.name ?? '';
    response.locationId = ur?.locationId; response.locationName = ur?.location?.name;
    response.status = member.status; response.joinedAt = member.joinedAt;
    return response;
  }
}
