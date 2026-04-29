import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CqrsMediator } from '../../../common';
import { IPageable } from '../../../common';
import { CreateStoreCommand, DeleteStoreCommand, UpdateStoreCommand } from './commands';
import { Store } from './domain';
import { CreateStoreRequest, SearchStoresRequest, ListStoresRequest, StoreResponse, StoresPagedResponse, UpdateStoreRequest } from './models';
import { GetStoreQuery, ListStoresQuery, SearchStoresQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Stores')
@Controller({ path: 'stores', version: '1' })
export class StoresController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(StoresController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search stores (paginated)' })
  @ApiOkResponse({ type: StoresPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(@Query() filter?: SearchStoresRequest): Promise<StoresPagedResponse> {
    const query = this.mapper.map(filter, SearchStoresRequest, SearchStoresQuery);
    const result = await this.mediator.execute<SearchStoresQuery, IPageable<Store>>(query);
    return {
      ...result,
      items: this.mapper.mapArray(result.items, Store, StoreResponse),
    };
  }

  @ApiOperation({ summary: 'List all stores' })
  @ApiOkResponse({ type: [StoreResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(@Query() filter?: ListStoresRequest): Promise<StoreResponse[]> {
    const query = this.mapper.map(filter, ListStoresRequest, ListStoresQuery);
    const result = await this.mediator.execute<ListStoresQuery, Store[]>(query);
    return this.mapper.mapArray(result, Store, StoreResponse);
  }

  @ApiOperation({ summary: 'Get store by ID' })
  @ApiOkResponse({ type: StoreResponse })
  @ApiParam({ name: 'id', description: 'Store UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<StoreResponse> {
    const query = new GetStoreQuery();
    query.id = id;
    const result = await this.mediator.execute<GetStoreQuery, Store>(query);
    return this.mapper.map(result, Store, StoreResponse);
  }

  @ApiOperation({ summary: 'Create a new store' })
  @ApiCreatedResponse({ type: StoreResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateStoreRequest): Promise<StoreResponse> {
    const command = this.mapper.map(body, CreateStoreRequest, CreateStoreCommand);
    const result  = await this.mediator.execute<CreateStoreCommand, Store>(command);
    return this.mapper.map(result, Store, StoreResponse);
  }

  @ApiOperation({ summary: 'Update a store' })
  @ApiOkResponse({ type: StoreResponse })
  @ApiParam({ name: 'id', description: 'Store UUID' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateStoreRequest): Promise<StoreResponse> {
    const command = this.mapper.map(body, UpdateStoreRequest, UpdateStoreCommand);
    command.id    = id;
    const result  = await this.mediator.execute<UpdateStoreCommand, Store>(command);
    return this.mapper.map(result, Store, StoreResponse);
  }

  @ApiOperation({ summary: 'Delete a store' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Store UUID' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeleteStoreCommand();
    command.id    = id;
    return this.mediator.execute<DeleteStoreCommand, boolean>(command);
  }
}
