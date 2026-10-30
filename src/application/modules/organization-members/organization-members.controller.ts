import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous, AuthenticatedUser, ClerkAuthGuard, CurrentUser, Roles, RolesGuard } from '../../../common';
import { ERole } from '../../../infrastructure';
import { CreateOrganizationInvitationRequest, UpdateOrganizationMemberRequest } from './models';
import { OrganizationMembersService } from './organization-members.service';

@ApiBearerAuth()
@ApiTags('Organization Invitations')
@Controller({ path: 'organization-invitations', version: '1' })
@UseGuards(ClerkAuthGuard)
export class OrganizationInvitationsController {
  constructor(private readonly service: OrganizationMembersService) {}

  @Post() @HttpCode(HttpStatus.CREATED) @ApiCreatedResponse()
  @UseGuards(RolesGuard) @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  public create(@CurrentUser() user: AuthenticatedUser, @Body() body: CreateOrganizationInvitationRequest) { return this.service.create(user, body); }

  @Get() @ApiOkResponse() @UseGuards(RolesGuard) @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  public list(@CurrentUser() user: AuthenticatedUser, @Query('organizationId') organizationId?: string) { return this.service.list(user, organizationId); }

  @Post(':token/accept') @ApiOkResponse()
  public accept(@CurrentUser() user: AuthenticatedUser, @Param('token') token: string) { return this.service.accept(user, token); }

  @Post(':id/resend') @ApiOkResponse() @UseGuards(RolesGuard) @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  public resend(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) { return this.service.resend(user, id); }

  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) @UseGuards(RolesGuard) @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  public revoke(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) { return this.service.revoke(user, id); }
}

@ApiTags('Public Organization Invitations')
@Controller({ path: 'public/organization-invitations', version: '1' })
@UseGuards(ClerkAuthGuard)
export class PublicOrganizationInvitationsController {
  constructor(private readonly service: OrganizationMembersService) {}
  @Get(':token') @AllowAnonymous() @ApiOkResponse()
  public validate(@Param('token') token: string) { return this.service.validatePublic(token); }
}

@ApiBearerAuth()
@ApiTags('Organization Members')
@Controller({ path: 'organization-members', version: '1' })
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles(ERole.OrgAdmin, ERole.SuperAdmin)
export class OrganizationMembersController {
  constructor(private readonly service: OrganizationMembersService) {}
  @Get() public list(@CurrentUser() user: AuthenticatedUser, @Query('organizationId') organizationId?: string) { return this.service.listMembers(user, organizationId); }
  @Patch(':id') public update(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string, @Body() body: UpdateOrganizationMemberRequest) { return this.service.updateMember(user, id, body); }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) public remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) { return this.service.removeMember(user, id); }
}
