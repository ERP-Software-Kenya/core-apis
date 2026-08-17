import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ClerkAuthGuard, CqrsMediator } from '../../../common';
import { CreateOrderCommand } from './commands';
import { Order } from './domain';
import { CreateOrderRequest, OrderResponse } from './models';
import { GetOrderQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Orders')
@UseGuards(ClerkAuthGuard)
@Controller({ path: 'orders', version: '1' })
export class OrdersController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(OrdersController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Get order by ID' })
  @ApiOkResponse({ type: OrderResponse })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<OrderResponse> {
    const query = new GetOrderQuery();
    query.id = id;
    const result = await this.mediator.execute<GetOrderQuery, Order>(query);
    return this.mapper.map(result, Order, OrderResponse);
  }

  @ApiOperation({ summary: 'Create a new order' })
  @ApiCreatedResponse({ type: OrderResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateOrderRequest): Promise<OrderResponse> {
    const command = this.mapper.map(body, CreateOrderRequest, CreateOrderCommand);
    const result  = await this.mediator.execute<CreateOrderCommand, Order>(command);
    return this.mapper.map(result, Order, OrderResponse);
  }
}
