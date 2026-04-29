import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CqrsMediator } from '../../../common';
import { IPageable } from '../../../common';
import { CreatePurchaseOrderCommand, DeletePurchaseOrderCommand, UpdatePurchaseOrderCommand } from './commands';
import { PurchaseOrder } from './domain';
import { CreatePurchaseOrderRequest, SearchPurchaseOrdersRequest, ListPurchaseOrdersRequest, PurchaseOrderResponse, PurchaseOrdersPagedResponse, UpdatePurchaseOrderRequest } from './models';
import { GetPurchaseOrderQuery, ListPurchaseOrdersQuery, SearchPurchaseOrdersQuery } from './queries';

@ApiBearerAuth()
@ApiTags('PurchaseOrders')
@Controller({ path: 'purchase-orders', version: '1' })
export class PurchaseOrdersController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(PurchaseOrdersController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search purchase orders (paginated)' })
  @ApiOkResponse({ type: PurchaseOrdersPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(@Query() filter?: SearchPurchaseOrdersRequest): Promise<PurchaseOrdersPagedResponse> {
    const query = this.mapper.map(filter, SearchPurchaseOrdersRequest, SearchPurchaseOrdersQuery);
    const result = await this.mediator.execute<SearchPurchaseOrdersQuery, IPageable<PurchaseOrder>>(query);
    return {
      ...result,
      items: this.mapper.mapArray(result.items, PurchaseOrder, PurchaseOrderResponse),
    };
  }

  @ApiOperation({ summary: 'List all purchase orders' })
  @ApiOkResponse({ type: [PurchaseOrderResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(@Query() filter?: ListPurchaseOrdersRequest): Promise<PurchaseOrderResponse[]> {
    const query = this.mapper.map(filter, ListPurchaseOrdersRequest, ListPurchaseOrdersQuery);
    const result = await this.mediator.execute<ListPurchaseOrdersQuery, PurchaseOrder[]>(query);
    return this.mapper.mapArray(result, PurchaseOrder, PurchaseOrderResponse);
  }

  @ApiOperation({ summary: 'Get purchase order by ID' })
  @ApiOkResponse({ type: PurchaseOrderResponse })
  @ApiParam({ name: 'id', description: 'Purchase Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<PurchaseOrderResponse> {
    const query = new GetPurchaseOrderQuery();
    query.id = id;
    const result = await this.mediator.execute<GetPurchaseOrderQuery, PurchaseOrder>(query);
    return this.mapper.map(result, PurchaseOrder, PurchaseOrderResponse);
  }

  @ApiOperation({ summary: 'Create a new purchase order' })
  @ApiCreatedResponse({ type: PurchaseOrderResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreatePurchaseOrderRequest): Promise<PurchaseOrderResponse> {
    const command = this.mapper.map(body, CreatePurchaseOrderRequest, CreatePurchaseOrderCommand);
    const result  = await this.mediator.execute<CreatePurchaseOrderCommand, PurchaseOrder>(command);
    return this.mapper.map(result, PurchaseOrder, PurchaseOrderResponse);
  }

  @ApiOperation({ summary: 'Update a purchase order' })
  @ApiOkResponse({ type: PurchaseOrderResponse })
  @ApiParam({ name: 'id', description: 'Purchase Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdatePurchaseOrderRequest): Promise<PurchaseOrderResponse> {
    const command = this.mapper.map(body, UpdatePurchaseOrderRequest, UpdatePurchaseOrderCommand);
    command.id    = id;
    const result  = await this.mediator.execute<UpdatePurchaseOrderCommand, PurchaseOrder>(command);
    return this.mapper.map(result, PurchaseOrder, PurchaseOrderResponse);
  }

  @ApiOperation({ summary: 'Delete a purchase order' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Purchase Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeletePurchaseOrderCommand();
    command.id    = id;
    return this.mediator.execute<DeletePurchaseOrderCommand, boolean>(command);
  }
}
