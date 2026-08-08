import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser } from '../../../common';
import { CreateVehicleExpenseRequest, VehicleExpenseResponse } from './models';
import { VehicleExpense } from './domain';
import { CreateVehicleExpenseCommand, DeleteVehicleExpenseCommand } from './commands';
import { GetVehicleExpenseQuery } from './queries';

const FALLBACK_ORG_ID = '00000000-0000-4000-8000-000000000001';

@ApiBearerAuth()
@ApiTags('Vehicle Expenses')
@UseGuards(ClerkAuthGuard)
@Controller({ path: 'vehicle-expenses', version: '1' })
export class VehicleExpensesController {
  public constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(VehicleExpensesController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Get vehicle expense by ID' })
  @ApiOkResponse({ type: VehicleExpenseResponse })
  @ApiParam({ name: 'id', description: 'Vehicle Expense UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<VehicleExpenseResponse> {
    const query  = new GetVehicleExpenseQuery();
    query.id     = id;
    const result = await this.mediator.execute<GetVehicleExpenseQuery, VehicleExpense>(query);
    return this.mapper.map(result, VehicleExpense, VehicleExpenseResponse);
  }

  @ApiOperation({ summary: 'Create a new vehicle expense' })
  @ApiCreatedResponse({ type: VehicleExpenseResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @Body() body: CreateVehicleExpenseRequest,
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<VehicleExpenseResponse> {
    const command           = this.mapper.map(body, CreateVehicleExpenseRequest, CreateVehicleExpenseCommand);
    command.organizationId  = user?.organizationId ?? FALLBACK_ORG_ID;
    const result            = await this.mediator.execute<CreateVehicleExpenseCommand, VehicleExpense>(command);
    return this.mapper.map(result, VehicleExpense, VehicleExpenseResponse);
  }

  @ApiOperation({ summary: 'Delete a vehicle expense' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Vehicle Expense UUID' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeleteVehicleExpenseCommand();
    command.id    = id;
    return this.mediator.execute<DeleteVehicleExpenseCommand, boolean>(command);
  }
}
