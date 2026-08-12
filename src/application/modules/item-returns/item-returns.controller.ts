import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ClerkAuthGuard, CqrsMediator, RolesGuard, Roles } from '../../../common';
import { IPageable } from '../../../common';
import { ERole } from '../../../infrastructure';
import { CreateItemReturnCommand, DeleteItemReturnCommand, UpdateItemReturnCommand } from './commands';
import { ItemReturn } from './domain';
import { CreateItemReturnRequest, SearchItemReturnsRequest, ListItemReturnsRequest, ItemReturnResponse, ItemReturnsPagedResponse, UpdateItemReturnRequest } from './models';
import { GetItemReturnQuery, ListItemReturnsQuery, SearchItemReturnsQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Item Returns')
@UseGuards(ClerkAuthGuard)
@Controller({ path: 'item-returns', version: '1' })
export class ItemReturnsController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(ItemReturnsController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search item returns (paginated)' })
  @ApiOkResponse({ type: ItemReturnsPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(@Query() filter?: SearchItemReturnsRequest): Promise<ItemReturnsPagedResponse> {
    const query = this.mapper.map(filter, SearchItemReturnsRequest, SearchItemReturnsQuery);
    const result = await this.mediator.execute<SearchItemReturnsQuery, IPageable<ItemReturn>>(query);
    return {
      ...result,
      items: this.mapper.mapArray(result.items, ItemReturn, ItemReturnResponse),
    };
  }

  @ApiOperation({ summary: 'List all item returns' })
  @ApiOkResponse({ type: [ItemReturnResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(@Query() filter?: ListItemReturnsRequest): Promise<ItemReturnResponse[]> {
    const query = this.mapper.map(filter, ListItemReturnsRequest, ListItemReturnsQuery);
    const result = await this.mediator.execute<ListItemReturnsQuery, ItemReturn[]>(query);
    return this.mapper.mapArray(result, ItemReturn, ItemReturnResponse);
  }

  @ApiOperation({ summary: 'Get item return by ID' })
  @ApiOkResponse({ type: ItemReturnResponse })
  @ApiParam({ name: 'id', description: 'Item Return UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<ItemReturnResponse> {
    const query = new GetItemReturnQuery();
    query.id = id;
    const result = await this.mediator.execute<GetItemReturnQuery, ItemReturn>(query);
    return this.mapper.map(result, ItemReturn, ItemReturnResponse);
  }

  @ApiOperation({ summary: 'Create a new item return' })
  @ApiCreatedResponse({ type: ItemReturnResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateItemReturnRequest): Promise<ItemReturnResponse> {
    const command = this.mapper.map(body, CreateItemReturnRequest, CreateItemReturnCommand);
    const result  = await this.mediator.execute<CreateItemReturnCommand, ItemReturn>(command);
    return this.mapper.map(result, ItemReturn, ItemReturnResponse);
  }

  @ApiOperation({ summary: 'Update a item return' })
  @ApiOkResponse({ type: ItemReturnResponse })
  @ApiParam({ name: 'id', description: 'Item Return UUID' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateItemReturnRequest): Promise<ItemReturnResponse> {
    const command = this.mapper.map(body, UpdateItemReturnRequest, UpdateItemReturnCommand);
    command.id    = id;
    const result  = await this.mediator.execute<UpdateItemReturnCommand, ItemReturn>(command);
    return this.mapper.map(result, ItemReturn, ItemReturnResponse);
  }

  @ApiOperation({ summary: 'Delete a item return' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Item Return UUID' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ERole.StoreManager, ERole.OrgManager, ERole.OrgAdmin, ERole.SuperAdmin)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeleteItemReturnCommand();
    command.id    = id;
    return this.mediator.execute<DeleteItemReturnCommand, boolean>(command);
  }
}
