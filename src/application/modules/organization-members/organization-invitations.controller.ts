import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser, Roles, RolesGuard } from '../../../common';
import { ERole } from '../../../infrastructure';
import { CreateInvitationCommand, ResendInvitationCommand, RevokeInvitationCommand } from './commands';
import { AcceptInvitationCommand } from './commands/accept-invitation';
import { OrganizationInvitationResponse, CreateInvitationRequest, AcceptInvitationResponse } from './models';
import { ListInvitationsQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Organization Invitations')
@UseGuards(ClerkAuthGuard)
@Controller({ path: 'organization-invitations', version: '1' })
export class OrganizationInvitationsController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(OrganizationInvitationsController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Create an organization invitation' })
  @ApiCreatedResponse({ type: OrganizationInvitationResponse })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @Post()
  public async create(@CurrentUser() user: AuthenticatedUser, @Body() body: CreateInvitationRequest): Promise<OrganizationInvitationResponse> {
    const command = this.mapper.map(body, CreateInvitationRequest, CreateInvitationCommand);
    command.currentUserId = user.dbUserId ?? '';
    command.currentOrganizationId = user.organizationId;
    command.currentRoles = user.roles;
    return this.mediator.execute<CreateInvitationCommand, OrganizationInvitationResponse>(command);
  }

  @ApiOperation({ summary: 'List organization invitations' })
  @ApiOkResponse({ type: [OrganizationInvitationResponse] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @Get()
  public async list(@CurrentUser() user: AuthenticatedUser, @Query('organizationId') organizationId?: string): Promise<OrganizationInvitationResponse[]> {
    const query = new ListInvitationsQuery();
    query.organizationId = organizationId;
    query.currentOrganizationId = user.organizationId;
    query.currentRoles = user.roles;
    return this.mediator.execute<ListInvitationsQuery, OrganizationInvitationResponse[]>(query);
  }

  @ApiOperation({ summary: 'Accept an invitation' })
  @ApiOkResponse({ type: AcceptInvitationResponse })
  @HttpCode(HttpStatus.OK)
  @Post(':token/accept')
  public async accept(@CurrentUser() user: AuthenticatedUser, @Param('token') token: string): Promise<AcceptInvitationResponse> {
    const command = new AcceptInvitationCommand();
    command.rawToken = token;
    command.authenticatedEmail = user.email ?? '';
    command.clerkUserId = user.clerkUserId;
    command.firstName = user.firstName;
    command.lastName = user.lastName;
    command.imageUrl = user.imageUrl;
    return this.mediator.execute<AcceptInvitationCommand, AcceptInvitationResponse>(command);
  }

  @ApiOperation({ summary: 'Resend an invitation' })
  @ApiOkResponse({ type: OrganizationInvitationResponse })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @Post(':id/resend')
  public async resend(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string): Promise<OrganizationInvitationResponse> {
    const command = new ResendInvitationCommand();
    command.id = id;
    command.currentOrganizationId = user.organizationId;
    command.currentRoles = user.roles;
    return this.mediator.execute<ResendInvitationCommand, OrganizationInvitationResponse>(command);
  }

  @ApiOperation({ summary: 'Revoke an invitation' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @Delete(':id')
  public async revoke(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string): Promise<void> {
    const command = new RevokeInvitationCommand();
    command.id = id;
    command.currentUserId = user.dbUserId ?? '';
    command.currentOrganizationId = user.organizationId;
    command.currentRoles = user.roles;
    await this.mediator.execute<RevokeInvitationCommand, void>(command);
  }
}
