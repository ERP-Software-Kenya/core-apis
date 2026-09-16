import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ClerkAuthGuard, CqrsMediator, CurrentUser, AuthenticatedUser, Roles, RolesGuard, assertOrgOwnership, IPageable, requireOrganizationId } from '../../../common';
import { ERole } from '../../../infrastructure';
import { GetLocationQuery } from '../locations/queries';
import { Location } from '../locations/domain';
import { CreateOrderCommand } from './commands';
import { Order, OrderItem } from './domain';
import { CreateOrderRequest, OrderResponse, SearchOrdersRequest } from './models';
import { OrderItemResponse } from './models/responses/order.response';
import { GetOrderQuery, SearchOrdersQuery } from './queries';

class OrdersPagedResponse {
  public items: OrderResponse[];
  public page: number;
  public perPage: number;
  public totalCount: number;
  public totalPages: number;
}

@ApiBearerAuth()
@ApiTags('Orders')
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles(ERole.OrgAdmin, ERole.SuperAdmin)
@Controller({ path: 'orders', version: '1' })
export class OrdersController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(OrdersController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search sales orders (paginated)' })
  @ApiOkResponse({ type: OrdersPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filter?: SearchOrdersRequest,
  ): Promise<OrdersPagedResponse> {
    const query = this.mapper.map(filter ?? new SearchOrdersRequest(), SearchOrdersRequest, SearchOrdersQuery);
    query.organizationId = requireOrganizationId(user);
    query.search = filter?.search?.trim() || filter?.name?.trim() || undefined;
    const result = await this.mediator.execute<SearchOrdersQuery, IPageable<Order>>(query);
    return {
      ...result,
      items: result.items.map((order) => this.toOrderResponse(order)),
    };
  }

  @ApiOperation({ summary: 'Get order by ID' })
  @ApiOkResponse({ type: OrderResponse })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<OrderResponse> {
    const query = new GetOrderQuery();
    query.id = id;
    const result = await this.mediator.execute<GetOrderQuery, Order>(query);

    const locationQuery = new GetLocationQuery();
    locationQuery.id = result.locationId;
    const location = await this.mediator.execute<GetLocationQuery, Location>(locationQuery);
    assertOrgOwnership(user, location.organizationId, 'order');

    return this.toOrderResponse(result);
  }

  @ApiOperation({ summary: 'Create a new order' })
  @ApiCreatedResponse({ type: OrderResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateOrderRequest, @CurrentUser() user: AuthenticatedUser): Promise<OrderResponse> {
    const command = this.mapper.map(body, CreateOrderRequest, CreateOrderCommand);
    command.performedById = user.dbUserId;

    const locationQuery = new GetLocationQuery();
    locationQuery.id = command.locationId;
    const location = await this.mediator.execute<GetLocationQuery, Location>(locationQuery);
    assertOrgOwnership(user, location.organizationId, 'order');

    const result = await this.mediator.execute<CreateOrderCommand, Order>(command);
    return this.toOrderResponse(result);
  }

  private toOrderResponse(order: Order): OrderResponse {
    const response = this.mapper.map(order, Order, OrderResponse);
    if (order.items?.length) {
      response.items = this.mapper.mapArray(order.items, OrderItem, OrderItemResponse);
    }
    return response;
  }
}
