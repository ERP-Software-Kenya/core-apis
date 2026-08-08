import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser } from '../../../common';
import { CreateMaintenanceRequest, MaintenanceResponse } from './models';
import { CreateMaintenanceCommand } from './commands';
import { Maintenance } from './domain';

const FALLBACK_ORG_ID = '00000000-0000-4000-8000-000000000001';

@ApiBearerAuth()
@ApiTags('Maintenance')
@UseGuards(ClerkAuthGuard)
@Controller({ path: 'maintenance', version: '1' })
export class MaintenanceController {
  public constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(MaintenanceController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Create a new maintenance record' })
  @ApiCreatedResponse({ type: MaintenanceResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @Body() body: CreateMaintenanceRequest,
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<MaintenanceResponse> {
    const command           = this.mapper.map(body, CreateMaintenanceRequest, CreateMaintenanceCommand);
    command.organizationId  = user?.organizationId ?? FALLBACK_ORG_ID;
    command.createdBy       = user?.dbUserId;
    const result            = await this.mediator.execute<CreateMaintenanceCommand, Maintenance>(command);
    return this.mapper.map(result, Maintenance, MaintenanceResponse);
  }
}
