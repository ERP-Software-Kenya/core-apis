import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser, IPageable, RolesGuard, Roles } from '../../../common';
import {
  GetVehicleQuery, SearchVehiclesQuery, ListVehiclesQuery,
  ListVehicleTypesQuery, ListVehicleBrandsQuery, ListFuelTypesQuery,
} from './queries';
import {
  CreateVehicleRequest, UpdateVehicleRequest, SearchVehiclesRequest, ListVehiclesRequest,
  VehicleResponse, VehiclesPagedResponse, VehicleTypeResponse, VehicleBrandResponse, FuelTypeResponse,
  ListVehicleTypesRequest, ListVehicleBrandsRequest, ListFuelTypesRequest,
} from './models';
import { Vehicle, VehicleType, VehicleBrand, FuelType } from './domain';
import { CreateVehicleCommand, DeleteVehicleCommand, UpdateVehicleCommand } from './commands';
import { ERole } from '../../../infrastructure';

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
  @UseGuards(RolesGuard)
  @Roles(ERole.StoreManager, ERole.OrgManager, ERole.OrgAdmin, ERole.SuperAdmin)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeleteVehicleCommand(id);
    return this.mediator.execute<DeleteVehicleCommand, boolean>(command);
  }

  @ApiOperation({ summary: 'List all vehicle types' })
  @ApiOkResponse({ type: [VehicleTypeResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('vehicle-types/list')
  public async listVehicleTypes(@Query() filter?: ListVehicleTypesRequest): Promise<VehicleTypeResponse[]> {
    const query  = this.mapper.map(filter, ListVehicleTypesRequest, ListVehicleTypesQuery);
    const result = await this.mediator.execute<ListVehicleTypesQuery, VehicleType[]>(query);
    return this.mapper.mapArray(result, VehicleType, VehicleTypeResponse);
  }

  @ApiOperation({ summary: 'List all vehicle brands' })
  @ApiOkResponse({ type: [VehicleBrandResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('vehicle-brands/list')
  public async listVehicleBrands(@Query() filter?: ListVehicleBrandsRequest): Promise<VehicleBrandResponse[]> {
    const query  = this.mapper.map(filter, ListVehicleBrandsRequest, ListVehicleBrandsQuery);
    const result = await this.mediator.execute<ListVehicleBrandsQuery, VehicleBrand[]>(query);
    return this.mapper.mapArray(result, VehicleBrand, VehicleBrandResponse);
  }

  @ApiOperation({ summary: 'List all fuel types' })
  @ApiOkResponse({ type: [FuelTypeResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('fuel-types/list')
  public async listFuelTypes(@Query() filter?: ListFuelTypesRequest): Promise<FuelTypeResponse[]> {
    const query  = this.mapper.map(filter, ListFuelTypesRequest, ListFuelTypesQuery);
    const result = await this.mediator.execute<ListFuelTypesQuery, FuelType[]>(query);
    return this.mapper.mapArray(result, FuelType, FuelTypeResponse);
  }
}
