import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser, IPageable } from '../../../common';
import { GetVehicleQuery, SearchVehiclesQuery, ListVehiclesQuery } from './queries';
import { CreateVehicleRequest, UpdateVehicleRequest, SearchVehiclesRequest, ListVehiclesRequest, VehicleResponse, VehiclesPagedResponse } from './models';
import { Vehicle } from './domain';
import { CreateVehicleCommand, DeleteVehicleCommand, UpdateVehicleCommand } from './commands';

const FALLBACK_ORG_ID = '00000000-0000-4000-8000-000000000001';

@ApiBearerAuth()
@ApiTags('Vehicles')
@UseGuards(ClerkAuthGuard)
@Controller({ path: 'vehicles', version: '1' })
export class VehiclesController {
  public constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(VehiclesController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search vehicles (paginated)' })
  @ApiOkResponse({ type: VehiclesPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(@Query() filter?: SearchVehiclesRequest): Promise<VehiclesPagedResponse> {
    const query  = this.mapper.map(filter, SearchVehiclesRequest, SearchVehiclesQuery);
    const result = await this.mediator.execute<SearchVehiclesQuery, IPageable<Vehicle>>(query);
    return { ...result, items: this.mapper.mapArray(result.items, Vehicle, VehicleResponse) };
  }

  @ApiOperation({ summary: 'List all vehicles' })
  @ApiOkResponse({ type: [VehicleResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(@Query() filter?: ListVehiclesRequest): Promise<VehicleResponse[]> {
    const query  = this.mapper.map(filter, ListVehiclesRequest, ListVehiclesQuery);
    const result = await this.mediator.execute<ListVehiclesQuery, Vehicle[]>(query);
    return this.mapper.mapArray(result, Vehicle, VehicleResponse);
  }

  @ApiOperation({ summary: 'Get vehicle by ID' })
  @ApiOkResponse({ type: VehicleResponse })
  @ApiParam({ name: 'id', description: 'Vehicle UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<VehicleResponse> {
    const query  = new GetVehicleQuery();
    query.id     = id;
    const result = await this.mediator.execute<GetVehicleQuery, Vehicle>(query);
    return this.mapper.map(result, Vehicle, VehicleResponse);
  }

  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiCreatedResponse({ type: VehicleResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @Body() body: CreateVehicleRequest,
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<VehicleResponse> {
    const command       = this.mapper.map(body, CreateVehicleRequest, CreateVehicleCommand);
    command.companyId   = user?.organizationId ?? FALLBACK_ORG_ID;
    const result        = await this.mediator.execute<CreateVehicleCommand, Vehicle>(command);
    return this.mapper.map(result, Vehicle, VehicleResponse);
  }

  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiOkResponse({ type: VehicleResponse })
  @ApiParam({ name: 'id', description: 'Vehicle UUID' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateVehicleRequest): Promise<VehicleResponse> {
    const command = this.mapper.map(body, UpdateVehicleRequest, UpdateVehicleCommand);
    command.id    = id;
    const result  = await this.mediator.execute<UpdateVehicleCommand, Vehicle>(command);
    return this.mapper.map(result, Vehicle, VehicleResponse);
  }

  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Vehicle UUID' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeleteVehicleCommand(id);
    return this.mediator.execute<DeleteVehicleCommand, boolean>(command);
  }
}
