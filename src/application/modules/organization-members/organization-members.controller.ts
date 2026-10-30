import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser, Roles, RolesGuard } from '../../../common';
import { ERole } from '../../../infrastructure';
import { UpdateMemberCommand, RemoveMemberCommand } from './commands';
import { OrganizationMemberResponse, UpdateMemberRequest } from './models';
import { ListMembersQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Organization Members')
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles(ERole.OrgAdmin, ERole.SuperAdmin)
@Controller({ path: 'organization-members', version: '1' })
export class OrganizationMembersController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectPinoLogger(OrganizationMembersController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'List organization members' })
  @ApiOkResponse({ type: [OrganizationMemberResponse] })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async list(@CurrentUser() user: AuthenticatedUser, @Query('organizationId') organizationId?: string): Promise<OrganizationMemberResponse[]> {
    const query = new ListMembersQuery();
    query.organizationId = organizationId;
    query.currentOrganizationId = user.organizationId;
    query.currentRoles = user.roles;
    return this.mediator.execute<ListMembersQuery, OrganizationMemberResponse[]>(query);
  }

  @ApiOperation({ summary: 'Update a member role/status/location' })
  @ApiOkResponse({ type: OrganizationMemberResponse })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public async update(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string, @Body() body: UpdateMemberRequest): Promise<OrganizationMemberResponse> {
    const command = new UpdateMemberCommand();
    command.memberId = id;
    command.roleId = body.roleId;
    command.locationId = body.locationId;
    command.status = body.status;
    command.currentOrganizationId = user.organizationId;
    command.currentRoles = user.roles;
    return this.mediator.execute<UpdateMemberCommand, OrganizationMemberResponse>(command);
  }

  @ApiOperation({ summary: 'Remove a member' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string): Promise<void> {
    const command = new RemoveMemberCommand();
    command.memberId = id;
    command.currentUserId = user.dbUserId ?? '';
    command.currentOrganizationId = user.organizationId;
    command.currentRoles = user.roles;
    await this.mediator.execute<RemoveMemberCommand, void>(command);
  }
}
