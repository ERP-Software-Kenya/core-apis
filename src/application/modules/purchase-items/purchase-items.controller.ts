import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ClerkAuthGuard, CqrsMediator } from '../../../common';
import { CreatePurchaseItemCommand } from './commands';
import { PurchaseItem } from './domain';
import { CreatePurchaseItemRequest, PurchaseItemResponse } from './models';
import { GetPurchaseItemQuery, ListPurchaseItemsQuery } from './queries';

@ApiBearerAuth()
@ApiTags('PurchaseItems')
@UseGuards(ClerkAuthGuard)
@Controller({ path: 'purchase-items', version: '1' })
export class PurchaseItemsController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(PurchaseItemsController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'List all items for a purchase order' })
  @ApiOkResponse({ type: [PurchaseItemResponse] })
  @ApiParam({ name: 'purchaseOrderId', description: 'Purchase Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Get('by-order/:purchaseOrderId')
  public async listByOrder(@Param('purchaseOrderId') purchaseOrderId: string): Promise<PurchaseItemResponse[]> {
    const query = new ListPurchaseItemsQuery();
    query.purchaseOrderId = purchaseOrderId;
    const result = await this.mediator.execute<ListPurchaseItemsQuery, PurchaseItem[]>(query);
    return this.mapper.mapArray(result, PurchaseItem, PurchaseItemResponse);
  }

  @ApiOperation({ summary: 'Get purchase item by ID' })
  @ApiOkResponse({ type: PurchaseItemResponse })
  @ApiParam({ name: 'id', description: 'PurchaseItem UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<PurchaseItemResponse> {
    const query = new GetPurchaseItemQuery();
    query.id = id;
    const result = await this.mediator.execute<GetPurchaseItemQuery, PurchaseItem>(query);
    return this.mapper.map(result, PurchaseItem, PurchaseItemResponse);
  }

  @ApiOperation({ summary: 'Create a new purchase item' })
  @ApiCreatedResponse({ type: PurchaseItemResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreatePurchaseItemRequest): Promise<PurchaseItemResponse> {
    const command = this.mapper.map(body, CreatePurchaseItemRequest, CreatePurchaseItemCommand);
    const result  = await this.mediator.execute<CreatePurchaseItemCommand, PurchaseItem>(command);
    return this.mapper.map(result, PurchaseItem, PurchaseItemResponse);
  }
}
