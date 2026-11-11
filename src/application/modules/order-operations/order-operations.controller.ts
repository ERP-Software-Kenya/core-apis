import { Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  AuthenticatedUser,
  ClerkAuthGuard,
  CqrsMediator,
  CurrentUser,
  Roles,
  RolesGuard,
  assertOrgOwnership,
  requireOrganizationId,
} from '../../../common';
import { ERole } from '../../../infrastructure/persistence/entities/role.entity';
import { OrderDispatchPaymentService } from '../../shared/services/order-dispatch-payment.service';
import { Order } from '../orders/domain';
import { OrderResponse } from '../orders/models';
import { GetOrderQuery } from '../orders/queries';
import { ClaimOrderCommand } from './commands/claim-order/claim-order.command';
import { FulfillFromStoreCommand } from './commands/fulfill-from-store/fulfill-from-store.command';
import { PackOrderCommand } from './commands/pack-order/pack-order.command';
import { MarkOrderPickedUpCommand } from './commands/mark-order-picked-up/mark-order-picked-up.command';
import { RecordOrderPaymentCommand } from './commands/record-order-payment/record-order-payment.command';
import { RecordOrderPaymentResult } from './commands/record-order-payment/record-order-payment.command-handler';
import { GetOrderQueueQuery } from './queries/get-order-queue/get-order-queue.query';
import { SearchPackedOrdersQuery } from './queries/get-packed-orders/get-packed-orders.query';
import { SearchReadyForPickupQuery } from './queries/get-ready-for-pickup/get-ready-for-pickup.query';
import { OrderQueueItem } from './queries/get-order-queue/get-order-queue.query-handler';
import { FulfillFromStoreRequest } from './models/requests/fulfill-from-store.request';
import { PackOrderRequest } from './models/requests/pack-order.request';
import { SearchPackedOrdersRequest } from './models/requests/search-packed-orders.request';
import { SearchReadyForPickupRequest } from './models/requests/search-ready-for-pickup.request';
import { RecordOrderPaymentRequest } from './models/requests/record-order-payment.request';
import { OrderQueueItemResponse } from './models/responses/order-queue-item.response';
import { PackedOrderResponse } from './models/responses/packed-order.response';
import { PackedOrderRow } from '../orders/i-order.repo';
import { IPageable } from '../../../common';

@ApiBearerAuth()
@ApiTags('Warehouse Order Operations')
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.BranchManager)
@Controller({ path: 'warehouse/orders', version: '1' })
export class OrderOperationsController {
  public constructor(
    protected readonly mediator: CqrsMediator,
    private readonly dispatchPaymentService: OrderDispatchPaymentService,
    @InjectPinoLogger(OrderOperationsController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Get packed delivery orders ready for dispatch (paginated)' })
  @ApiOkResponse({ description: 'Paged packed orders' })
  @HttpCode(HttpStatus.OK)
  @Get('packed')
  public async getPackedOrders(
    @Query() filter: SearchPackedOrdersRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<IPageable<PackedOrderResponse>> {
    const organizationId = requireOrganizationId(user);
    const query = new SearchPackedOrdersQuery();
    query.organizationId = organizationId;
    query.search = filter.name?.trim() || undefined;
    query.$page = filter.$page ?? 1;
    query.$perPage = filter.$perPage ?? 20;
    const result = await this.mediator.execute<SearchPackedOrdersQuery, IPageable<PackedOrderRow>>(query);
    return {
      ...result,
      items: await Promise.all(
        result.items.map(async (row) => this.toPackedOrderResponse(row)),
      ),
    };
  }

  private async toPackedOrderResponse(row: PackedOrderRow): Promise<PackedOrderResponse> {
    const payment = await this.dispatchPaymentService.evaluateOrderAsync(row.id);
    return {
      id: row.id,
      orderNumber: row.orderNumber,
      customerId: row.customerId,
      customerName: row.customerName,
      deliveryAddress: row.deliveryAddress,
      pickerName: row.pickerName,
      packedAt: row.packedAt,
      itemCount: row.itemCount,
      locationId: row.locationId,
      organizationId: row.organizationId,
      paymentLabel: payment.paymentLabel,
      canDispatch: payment.canDispatch,
      blockReason: payment.blockReason,
      amountPaid: payment.amountPaid,
      amountRequired: payment.amountRequired,
      creditApprovalPending: payment.creditApprovalPending,
    };
  }

  @ApiOperation({ summary: 'Get unclaimed confirmed orders queue for a location' })
  @ApiOkResponse({ type: [OrderQueueItemResponse] })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.BranchManager, ERole.Packer)
  @Get('queue')
  public async getQueue(
    @Query('locationId') locationId: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<OrderQueueItemResponse[]> {
    const organizationId = requireOrganizationId(user);
    this.assertLocationAccess(user, locationId);
    const query = new GetOrderQueueQuery();
    query.locationId = locationId;
    query.organizationId = organizationId;
    const items = await this.mediator.execute<GetOrderQueueQuery, OrderQueueItem[]>(query);
    return items.map((item) => ({
      id: item.id,
      orderNumber: item.orderNumber,
      customerId: item.customerId,
      locationId: item.locationId,
      status: item.status,
      totalAmount: item.totalAmount,
      createdAt: item.createdAt,
      fulfillmentMode: item.fulfillmentMode,
    }));
  }

  @ApiOperation({ summary: 'Get packed pickup orders waiting for customer collection' })
  @ApiOkResponse({ description: 'Paged ready-for-pickup orders' })
  @HttpCode(HttpStatus.OK)
  @Get('ready-for-pickup')
  public async getReadyForPickup(
    @Query() filter: SearchReadyForPickupRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<IPageable<PackedOrderResponse>> {
    const organizationId = requireOrganizationId(user);
    const query = new SearchReadyForPickupQuery();
    query.organizationId = organizationId;
    query.locationId = filter.locationId;
    query.search = filter.name?.trim() || undefined;
    query.$page = filter.$page ?? 1;
    query.$perPage = filter.$perPage ?? 20;
    const result = await this.mediator.execute<SearchReadyForPickupQuery, IPageable<PackedOrderRow>>(query);
    return {
      ...result,
      items: await Promise.all(
        result.items.map(async (row) => this.toPackedOrderResponse(row)),
      ),
    };
  }

  @ApiOperation({ summary: 'Record payment against an order linked bill' })
  @ApiOkResponse({ description: 'Updated payment totals' })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Post(':id/record-payment')
  public async recordPayment(
    @Param('id') id: string,
    @Body() body: RecordOrderPaymentRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<RecordOrderPaymentResult> {
    const organizationId = requireOrganizationId(user);
    const command = new RecordOrderPaymentCommand();
    command.orderId = id;
    command.organizationId = organizationId;
    command.amount = body.amount;
    command.method = body.method;
    command.reference = body.reference;
    command.performedById = user.dbUserId;
    return this.mediator.execute<RecordOrderPaymentCommand, RecordOrderPaymentResult>(command);
  }

  @ApiOperation({ summary: 'Claim an order for picking' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.BranchManager, ERole.Packer)
  @Post(':id/claim')
  public async claimOrder(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<boolean> {
    const organizationId = requireOrganizationId(user);
    const pickerUserId = this.requireDbUserId(user);
    await this.assertOrderAccess(id, user);
    const command = new ClaimOrderCommand();
    command.orderId = id;
    command.pickerUserId = pickerUserId;
    command.organizationId = organizationId;
    await this.mediator.execute<ClaimOrderCommand, Order>(command);
    return true;
  }

  @ApiOperation({ summary: 'Pack an order after picking' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.BranchManager, ERole.Packer)
  @Post(':id/pack')
  public async packOrder(
    @Param('id') id: string,
    @Body() body: PackOrderRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<boolean> {
    const organizationId = requireOrganizationId(user);
    const packerUserId = this.requireDbUserId(user);
    await this.assertOrderAccess(id, user);
    const command = new PackOrderCommand();
    command.orderId = id;
    command.packerUserId = packerUserId;
    command.organizationId = organizationId;
    command.items = body.items;
    await this.mediator.execute<PackOrderCommand, Order>(command);
    return true;
  }

  @ApiOperation({ summary: 'Fulfill an order directly from store (skip warehouse claim/pack)' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id/fulfill-from-store')
  public async fulfillFromStore(
    @Param('id') id: string,
    @Body() body: FulfillFromStoreRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<boolean> {
    const organizationId = requireOrganizationId(user);
    const command = new FulfillFromStoreCommand();
    command.orderId = id;
    command.userId = body.userId;
    command.organizationId = organizationId;
    await this.mediator.execute<FulfillFromStoreCommand, Order>(command);
    return true;
  }

  @ApiOperation({ summary: 'Mark a packed pickup order as collected by customer' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id/pickup-complete')
  public async markPickupComplete(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<boolean> {
    const organizationId = requireOrganizationId(user);
    const command = new MarkOrderPickedUpCommand();
    command.orderId = id;
    command.userId = user.dbUserId ?? '';
    command.organizationId = organizationId;
    await this.mediator.execute<MarkOrderPickedUpCommand, Order>(command);
    return true;
  }

  @ApiOperation({ summary: 'Get order by ID' })
  @ApiOkResponse({ type: OrderResponse })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.BranchManager, ERole.Packer)
  @Get(':id')
  public async getById(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<Order> {
    const query = new GetOrderQuery();
    query.id = id;
    const order = await this.mediator.execute<GetOrderQuery, Order>(query);
    this.assertOrderScope(order, user);
    return order;
  }

  private async assertOrderAccess(id: string, user: AuthenticatedUser): Promise<void> {
    const query = new GetOrderQuery();
    query.id = id;
    const order = await this.mediator.execute<GetOrderQuery, Order>(query);
    this.assertOrderScope(order, user);
  }

  private assertOrderScope(order: Order, user: AuthenticatedUser): void {
    assertOrgOwnership(user, order.organizationId, 'order');
    this.assertLocationAccess(user, order.locationId);
  }

  private assertLocationAccess(user: AuthenticatedUser, locationId: string): void {
    const isOrgAdmin = user.roles.some((role) => role === ERole.OrgAdmin || role === ERole.SuperAdmin);
    if (!isOrgAdmin && !user.locationIds.includes(locationId)) {
      throw new ForbiddenException('Location is outside the authenticated user scope');
    }
  }

  private requireDbUserId(user: AuthenticatedUser): string {
    if (!user.dbUserId) throw new ForbiddenException('Authenticated user is not synchronized');
    return user.dbUserId;
  }
}
