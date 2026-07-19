import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CqrsMediator } from '../../../common';
import { CreateMaintenanceRequest, MaintenanceResponse } from './models';
import { CreateMaintenanceCommand } from './commands';
import { Maintenance } from './domain';

@ApiBearerAuth()
@ApiTags('Maintenance')
@Controller({ path: 'maintenance', version: '1' })
export class MaintenanceController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
  ) {}

  @ApiOperation({ summary: 'Create a new maintenance record' })
  @ApiCreatedResponse({ type: MaintenanceResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateMaintenanceRequest): Promise<MaintenanceResponse> {
    const command = this.mapper.map(body, CreateMaintenanceRequest, CreateMaintenanceCommand);
    const result  = await this.mediator.execute<CreateMaintenanceCommand, Maintenance>(command);
    return this.mapper.map(result, Maintenance, MaintenanceResponse);
  }
}
