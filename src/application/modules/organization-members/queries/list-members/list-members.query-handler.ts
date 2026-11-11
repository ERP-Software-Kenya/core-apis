import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource, FindOptionsWhere, ILike } from 'typeorm';
import { QueryHandlerStrict } from '../../../../../common';
import { ERole, OrgMemberEntity } from '../../../../../infrastructure';
import { ORGANIZATION_MEMBERS_MAX_LIMIT, OrganizationMemberResponse, PaginatedOrganizationMembersResponse } from '../../models';
import { ListMembersQuery } from './list-members.query';

@QueryHandlerStrict(ListMembersQuery)
export class ListMembersQueryHandler implements IQueryHandler<ListMembersQuery, OrganizationMemberResponse[] | PaginatedOrganizationMembersResponse> {
  public constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(ListMembersQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListMembersQuery): Promise<OrganizationMemberResponse[] | PaginatedOrganizationMembersResponse> {
    this.logger.info(`Executing ${ListMembersQuery.name}`);
    const organizationId = this.resolveOrganizationId(query);
    const relations = { user: { userRoles: { role: true, location: true } }, role: true };
    const repo = this.dataSource.getRepository(OrgMemberEntity);
    const paged = query.page !== undefined || query.limit !== undefined;

    if (!paged && !query.search && !query.status) {
      const members = await repo.find({ where: { organizationId }, relations, order: { joinedAt: 'DESC' } });
      return members.map((member) => this.buildMemberResponse(member));
    }

    const page = query.page ?? 1;
    const limit = Math.min(ORGANIZATION_MEMBERS_MAX_LIMIT, query.limit ?? 15);
    const [members, total] = await repo.findAndCount({
      where: this.buildWhere(organizationId, query),
      relations,
      // id tiebreaker keeps pages stable when members share a joinedAt
      order: { joinedAt: 'DESC', id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    const items = members.map((member) => this.buildMemberResponse(member));
    if (!paged) return items;
    return { items, total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) };
  }

  private buildWhere(organizationId: string, query: ListMembersQuery): FindOptionsWhere<OrgMemberEntity> | FindOptionsWhere<OrgMemberEntity>[] {
    const base: FindOptionsWhere<OrgMemberEntity> = { organizationId, ...(query.status ? { status: query.status } : {}) };
    if (!query.search) return base;
    const term = `%${query.search.replace(/[%_\\]/g, '\\$&')}%`;
    return [
      { ...base, user: { email: ILike(term) } },
      { ...base, user: { firstName: ILike(term) } },
      { ...base, user: { lastName: ILike(term) } },
    ];
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
