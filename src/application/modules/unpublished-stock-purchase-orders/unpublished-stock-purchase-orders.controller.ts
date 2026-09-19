import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  AuthenticatedUser,
  ClerkAuthGuard,
  CqrsMediator,
  CurrentUser,
  IPageable,
  InventoryNotOwnedByOrgException,
  Roles,
  RolesGuard,
} from '../../../common';
import { ERole } from '../../../infrastructure/persistence/entities';
import {
  AllocateUnpublishedStockPOCommand,
  CreateUnpublishedStockPOCommand,
  DeleteUnpublishedStockPOCommand,
  ReceiveUnpublishedStockPOCommand,
  RecordUnpublishedStockPOPaymentCommand,
  UpdateUnpublishedStockPOCommand,
} from './commands';
import { UnpublishedStockPOPayment, UnpublishedStockPurchaseOrder } from './domain';
import {
  AllocateUnpublishedStockPORequest,
  CreateUnpublishedStockPORequest,
  ListUnpublishedStockPOsRequest,
  ReceiveUnpublishedStockPORequest,
  RecordUnpublishedStockPOPaymentRequest,
  SearchUnpublishedStockPOsRequest,
  UnpublishedStockPOResponse,
  UnpublishedStockPOsPagedResponse,
  UpdateUnpublishedStockPORequest,
} from './models';
import {
  GetUnpublishedStockPOQuery,
  ListUnpublishedStockPOPaymentsQuery,
  ListUnpublishedStockPOsQuery,
  SearchUnpublishedStockPOsQuery,
} from './queries';
import { PurchaseOrderPaymentResponse } from '../purchase-orders/models';

@ApiBearerAuth()
@ApiTags('UnpublishedStockPurchaseOrders')
@Controller({ path: 'unpublished-stock-purchase-orders', version: '1' })
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles(ERole.OrgAdmin, ERole.SuperAdmin, ERole.BranchManager)
export class UnpublishedStockPurchaseOrdersController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(UnpublishedStockPurchaseOrdersController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search unpublished stock purchase orders (paginated)' })
  @ApiOkResponse({ type: UnpublishedStockPOsPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filter?: SearchUnpublishedStockPOsRequest,
  ): Promise<UnpublishedStockPOsPagedResponse> {
    if (!user.organizationId) return { items: [], page: 1, perPage: 15, totalCount: 0, totalPages: 0 };
    const query          = this.mapper.map(filter, SearchUnpublishedStockPOsRequest, SearchUnpublishedStockPOsQuery);
    query.organizationId = user.organizationId;
    const result         = await this.mediator.execute<SearchUnpublishedStockPOsQuery, IPageable<UnpublishedStockPurchaseOrder>>(query);
    return { ...result, items: this.mapper.mapArray(result.items, UnpublishedStockPurchaseOrder, UnpublishedStockPOResponse) };
  }

  @ApiOperation({ summary: 'List all unpublished stock purchase orders' })
  @ApiOkResponse({ type: [UnpublishedStockPOResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filter?: ListUnpublishedStockPOsRequest,
  ): Promise<UnpublishedStockPOResponse[]> {
    if (!user.organizationId) return [];
    const query          = this.mapper.map(filter, ListUnpublishedStockPOsRequest, ListUnpublishedStockPOsQuery);
    query.organizationId = user.organizationId;
    const result         = await this.mediator.execute<ListUnpublishedStockPOsQuery, UnpublishedStockPurchaseOrder[]>(query);
    return this.mapper.mapArray(result, UnpublishedStockPurchaseOrder, UnpublishedStockPOResponse);
  }

  @ApiOperation({ summary: 'Get unpublished stock purchase order by ID' })
  @ApiOkResponse({ type: UnpublishedStockPOResponse })
  @ApiParam({ name: 'id', description: 'Purchase Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<UnpublishedStockPOResponse> {
    const query  = new GetUnpublishedStockPOQuery();
    query.id     = id;
    const result = await this.mediator.execute<GetUnpublishedStockPOQuery, UnpublishedStockPurchaseOrder>(query);
    if (result.organizationId !== user.organizationId) throw new InventoryNotOwnedByOrgException();
    return this.mapper.map(result, UnpublishedStockPurchaseOrder, UnpublishedStockPOResponse);
  }

  @ApiOperation({ summary: 'Create a new unpublished stock purchase order' })
  @ApiCreatedResponse({ type: UnpublishedStockPOResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@CurrentUser() user: AuthenticatedUser, @Body() body: CreateUnpublishedStockPORequest): Promise<UnpublishedStockPOResponse> {
    const command          = this.mapper.map(body, CreateUnpublishedStockPORequest, CreateUnpublishedStockPOCommand);
    command.organizationId = user.organizationId;
    command.createdById    = user.dbUserId;
    command.items          = body.items;
    const result           = await this.mediator.execute<CreateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder>(command);
    return this.mapper.map(result, UnpublishedStockPurchaseOrder, UnpublishedStockPOResponse);
  }

  @ApiOperation({ summary: 'Update unpublished stock purchase order' })
  @ApiOkResponse({ type: UnpublishedStockPOResponse })
  @ApiParam({ name: 'id', description: 'Purchase Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateUnpublishedStockPORequest): Promise<UnpublishedStockPOResponse> {
    const command = this.mapper.map(body, UpdateUnpublishedStockPORequest, UpdateUnpublishedStockPOCommand);
    command.id    = id;
    const result  = await this.mediator.execute<UpdateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder>(command);
    return this.mapper.map(result, UnpublishedStockPurchaseOrder, UnpublishedStockPOResponse);
  }

  @ApiOperation({ summary: 'Record received quantities for purchase order items' })
  @ApiOkResponse({ type: UnpublishedStockPOResponse })
  @ApiParam({ name: 'id', description: 'Purchase Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Post(':id/receive')
  public async receive(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser, @Body() body: ReceiveUnpublishedStockPORequest): Promise<UnpublishedStockPOResponse> {
    const command           = new ReceiveUnpublishedStockPOCommand();
    command.purchaseOrderId = id;
    command.organizationId  = user.organizationId;
    command.items           = body.items;
    command.performedById   = user.dbUserId;
    command.notes           = body.notes;
    const result            = await this.mediator.execute<ReceiveUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder>(command);
    return this.mapper.map(result, UnpublishedStockPurchaseOrder, UnpublishedStockPOResponse);
  }

  @ApiOperation({ summary: 'Allocate received stock to unpublished stock locations' })
  @ApiOkResponse({ type: UnpublishedStockPOResponse })
  @ApiParam({ name: 'id', description: 'Purchase Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Post(':id/allocate')
  public async allocate(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser, @Body() body: AllocateUnpublishedStockPORequest): Promise<UnpublishedStockPOResponse> {
    const command           = new AllocateUnpublishedStockPOCommand();
    command.purchaseOrderId = id;
    command.organizationId  = user.organizationId;
    command.allocations     = body.allocations;
    command.performedById   = user.dbUserId;
    command.notes           = body.notes;
    const result            = await this.mediator.execute<AllocateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder>(command);
    return this.mapper.map(result, UnpublishedStockPurchaseOrder, UnpublishedStockPOResponse);
  }

  @ApiOperation({ summary: 'Record a payment against an unpublished stock purchase order' })
  @ApiOkResponse({ type: UnpublishedStockPOResponse })
  @ApiParam({ name: 'id', description: 'Purchase Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Post(':id/payments')
  public async recordPayment(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser, @Body() body: RecordUnpublishedStockPOPaymentRequest): Promise<UnpublishedStockPOResponse> {
    const command           = new RecordUnpublishedStockPOPaymentCommand();
    command.purchaseOrderId = id;
    command.organizationId  = user.organizationId;
    command.amount          = body.amount;
    command.paymentMethod   = body.paymentMethod;
    command.paidAt          = body.paidAt ?? new Date();
    command.note            = body.note;
    command.performedById   = user.dbUserId;
    const result            = await this.mediator.execute<RecordUnpublishedStockPOPaymentCommand, UnpublishedStockPurchaseOrder>(command);
    return this.mapper.map(result, UnpublishedStockPurchaseOrder, UnpublishedStockPOResponse);
  }

  @ApiOperation({ summary: 'List payments for an unpublished stock purchase order' })
  @ApiOkResponse({ type: [PurchaseOrderPaymentResponse] })
  @ApiParam({ name: 'id', description: 'Purchase Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id/payments')
  public async listPayments(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<PurchaseOrderPaymentResponse[]> {
    const query           = new ListUnpublishedStockPOPaymentsQuery();
    query.purchaseOrderId = id;
    query.organizationId  = user.organizationId;
    const result          = await this.mediator.execute<ListUnpublishedStockPOPaymentsQuery, UnpublishedStockPOPayment[]>(query);
    return this.mapper.mapArray(result, UnpublishedStockPOPayment, PurchaseOrderPaymentResponse);
  }

  @ApiOperation({ summary: 'Delete an unpublished stock purchase order' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Purchase Order UUID' })
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeleteUnpublishedStockPOCommand();
    command.id    = id;
    return this.mediator.execute<DeleteUnpublishedStockPOCommand, boolean>(command);
  }
}
