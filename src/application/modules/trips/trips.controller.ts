import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CqrsMediator } from '../../../common';
import { GetTripQuery, SearchTripsQuery, ListTripsQuery } from './queries';
import { CreateTripRequest, UpdateTripRequest, SearchTripsRequest, ListTripsRequest, CreateTripResponse, TripsPagedResponse } from './models';
import { Trip } from './domain';
import { CreateTripCommand, DeleteTripCommand, UpdateTripCommand } from './commands';

@ApiBearerAuth()
@ApiTags('Trips')
@Controller({ path: 'trips', version: '1' })
export class TripsController {
  @Inject(CqrsMediator) protected readonly mediator: CqrsMediator;
  @InjectMapper() protected readonly mapper: Mapper;

  @ApiOperation({ summary: 'Search trips (paginated)' })
  @ApiOkResponse({ type: TripsPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(@Query() filter?: SearchTripsRequest): Promise<TripsPagedResponse> {
    const query = this.mapper.map(filter, SearchTripsRequest, SearchTripsQuery);
    const result = await this.mediator.execute<SearchTripsQuery, any>(query);
    return {
      ...result,
      items: this.mapper.mapArray(result.items, Trip, CreateTripResponse),
    };
  }

  @ApiOperation({ summary: 'List all trips' })
  @ApiOkResponse({ type: [CreateTripResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(@Query() filter?: ListTripsRequest): Promise<CreateTripResponse[]> {
    const query = this.mapper.map(filter, ListTripsRequest, ListTripsQuery);
    const result = await this.mediator.execute<ListTripsQuery, Trip[]>(query);
    return this.mapper.mapArray(result, Trip, CreateTripResponse);
  }

  @ApiOperation({ summary: 'Get trip by ID' })
  @ApiOkResponse({ type: CreateTripResponse })
  @ApiParam({ name: 'id', description: 'Trip UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<CreateTripResponse> {
    const query = new GetTripQuery();
    query.id = id;
    const result = await this.mediator.execute<GetTripQuery, Trip>(query);
    return this.mapper.map(result, Trip, CreateTripResponse);
  }

  @ApiOperation({ summary: 'Create a new trip' })
  @ApiCreatedResponse({ type: CreateTripResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateTripRequest): Promise<CreateTripResponse> {
    const command = this.mapper.map(body, CreateTripRequest, CreateTripCommand);
    const result  = await this.mediator.execute<CreateTripCommand, Trip>(command);
    return this.mapper.map(result, Trip, CreateTripResponse);
  }

  @ApiOperation({ summary: 'Update a trip' })
  @ApiOkResponse({ type: CreateTripResponse })
  @ApiParam({ name: 'id', description: 'Trip UUID' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateTripRequest): Promise<CreateTripResponse> {
    const command = this.mapper.map(body, UpdateTripRequest, UpdateTripCommand);
    command.id    = id;
    const result  = await this.mediator.execute<UpdateTripCommand, Trip>(command);
    return this.mapper.map(result, Trip, CreateTripResponse);
  }

  @ApiOperation({ summary: 'Delete a trip' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Trip UUID' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeleteTripCommand(id);
    return this.mediator.execute<DeleteTripCommand, boolean>(command);
  }
}
