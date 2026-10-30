import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AllowAnonymous, ClerkAuthGuard, CqrsMediator } from '../../../common';
import { PublicOrganizationInvitationResponse } from './models';
import { ValidatePublicInvitationQuery } from './queries';

@ApiTags('Public Organization Invitations')
@UseGuards(ClerkAuthGuard)
@Controller({ path: 'public/organization-invitations', version: '1' })
export class PublicOrganizationInvitationsController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectPinoLogger(PublicOrganizationInvitationsController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Validate a public invitation token' })
  @ApiOkResponse({ type: PublicOrganizationInvitationResponse })
  @HttpCode(HttpStatus.OK)
  @AllowAnonymous()
  @Get(':token')
  public async validate(@Param('token') token: string): Promise<PublicOrganizationInvitationResponse> {
    const query = new ValidatePublicInvitationQuery();
    query.rawToken = token;
    return this.mediator.execute<ValidatePublicInvitationQuery, PublicOrganizationInvitationResponse>(query);
  }
}
