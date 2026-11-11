import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  AuthenticatedUser,
  ClerkAuthGuard,
  CqrsMediator,
  CurrentUser,
  Roles,
  RolesGuard,
  requireOrganizationId,
} from '../../../common';
import { ERole } from '../../../infrastructure/persistence/entities/role.entity';
import { UpsertNotificationSettingsCommand } from './commands';
import { NotificationSetting } from './domain';
import { UpsertNotificationSettingsRequest, NotificationSettingResponse } from './models';
import { GetNotificationSettingsQuery } from './queries';

const ADMIN_ROLES = [ERole.OrgAdmin, ERole.SuperAdmin];

@ApiBearerAuth()
@ApiTags('Notification Settings')
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles(...ADMIN_ROLES)
@Controller({ path: 'notification-settings', version: '1' })
export class NotificationSettingsController {
  public constructor(
    private readonly mediator: CqrsMediator,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(NotificationSettingsController.name) private readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Get all notification settings for the organization' })
  @ApiOkResponse({ type: [NotificationSettingResponse] })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async getSettings(@CurrentUser() user: AuthenticatedUser): Promise<NotificationSettingResponse[]> {
    const orgId = requireOrganizationId(user);
    const query = new GetNotificationSettingsQuery();
    query.organizationId = orgId;
    const settings = await this.mediator.execute<GetNotificationSettingsQuery, NotificationSetting[]>(query);
    return this.mapper.mapArray(settings, NotificationSetting, NotificationSettingResponse);
  }

  @ApiOperation({ summary: 'Save notification settings for the organization' })
  @ApiOkResponse({ type: [NotificationSettingResponse] })
  @HttpCode(HttpStatus.OK)
  @Put()
  public async upsertSettings(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: UpsertNotificationSettingsRequest,
  ): Promise<NotificationSettingResponse[]> {
    const orgId = requireOrganizationId(user);
    const command = this.mapper.map(body, UpsertNotificationSettingsRequest, UpsertNotificationSettingsCommand);
    command.organizationId = orgId;
    const settings = await this.mediator.execute<UpsertNotificationSettingsCommand, NotificationSetting[]>(command);
    return this.mapper.mapArray(settings, NotificationSetting, NotificationSettingResponse);
  }
}
