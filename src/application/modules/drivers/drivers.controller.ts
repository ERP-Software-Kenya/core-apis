import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CqrsMediator } from '../../../common';
import { CreateDriverRequest, SearchDriversRequest, ListDriversRequest, DriversPagedResponse } from './models';
import { Driver } from './domain';
import { GetDriverQuery, SearchDriversQuery, ListDriversQuery } from './queries';
import { CreateDriverCommand } from './commands';

@ApiBearerAuth()
@ApiTags('Drivers')
@Controller({ path: 'drivers', version: '1' })
export class DriversController {
  @Inject(CqrsMediator) protected readonly mediator: CqrsMediator;
  @InjectMapper() protected readonly mapper: Mapper;

  @ApiOperation({ summary: 'Search drivers (paginated)' })
  @ApiOkResponse({ type: DriversPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(@Query() filter?: SearchDriversRequest): Promise<DriversPagedResponse> {
    const query = this.mapper.map(filter, SearchDriversRequest, SearchDriversQuery);
    const result = await this.mediator.execute<SearchDriversQuery, any>(query);
    return {
      ...result,
      items: this.mapper.mapArray(result.items, Driver, Driver),
    };
  }

  @ApiOperation({ summary: 'List all drivers' })
  @ApiOkResponse({ type: [Driver] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(@Query() filter?: ListDriversRequest): Promise<Driver[]> {
    const query = this.mapper.map(filter, ListDriversRequest, ListDriversQuery);
    return await this.mediator.execute<ListDriversQuery, Driver[]>(query);
  }

  @ApiOperation({ summary: 'Get driver by ID' })
  @ApiOkResponse({ type: Driver })
  @ApiParam({ name: 'id', description: 'Driver UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Driver> {
    const query = new GetDriverQuery();
    query.id = id;
    return await this.mediator.execute<GetDriverQuery, Driver>(query);
  }

  @ApiOperation({ summary: 'Create a new driver' })
  @ApiCreatedResponse({ type: Driver })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateDriverRequest): Promise<Driver> {
    const command = this.mapper.map(body, CreateDriverRequest, CreateDriverCommand);
    const result  = await this.mediator.execute<CreateDriverCommand, Driver>(command);
    return result;
  }
}
