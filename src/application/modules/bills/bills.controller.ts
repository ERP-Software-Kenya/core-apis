import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiProduces, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser, IPageable } from '../../../common';

const FALLBACK_ORG_ID  = '00000000-0000-4000-8000-000000000001';
const FALLBACK_USER_ID = '61e0d78b-2e23-4e9f-9433-2138e9fda878';
import {
  CreateBillCommand,
  DeleteBillCommand,
  UpdateBillCommand,
  AddBillItemCommand,
  UpdateBillItemCommand,
  RemoveBillItemCommand,
  TransitionBillStatusCommand,
} from './commands';
import { Bill } from './domain';
import {
  CreateBillRequest,
  UpdateBillRequest,
  SearchBillsRequest,
  ListBillsRequest,
  CreateBillItemRequest,
  UpdateBillItemRequest,
  TransitionBillStatusRequest,
  BillResponse,
  BillsPagedResponse,
} from './models';
import { GetBillQuery, ListBillsQuery, SearchBillsQuery, ExportBillQuery } from './queries';
import { PdfDocument } from '../../../common/pdf-export';

@ApiBearerAuth()
@ApiTags('Bills')
@UseGuards(ClerkAuthGuard)
@Controller({ path: 'bills', version: '1' })
export class BillsController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(BillsController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Search bills (paginated)' })
  @ApiOkResponse({ type: BillsPagedResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async search(@Query() filter?: SearchBillsRequest): Promise<BillsPagedResponse> {
    const query  = this.mapper.map(filter, SearchBillsRequest, SearchBillsQuery);
    const result = await this.mediator.execute<SearchBillsQuery, IPageable<Bill>>(query);
    return { ...result, items: this.mapper.mapArray(result.items, Bill, BillResponse) };
  }

  @ApiOperation({ summary: 'List bills (flat)' })
  @ApiOkResponse({ type: [BillResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(@Query() filter?: ListBillsRequest): Promise<BillResponse[]> {
    const query  = this.mapper.map(filter, ListBillsRequest, ListBillsQuery);
    const result = await this.mediator.execute<ListBillsQuery, Bill[]>(query);
    return this.mapper.mapArray(result, Bill, BillResponse);
  }

  @ApiOperation({ summary: 'Get bill by ID' })
  @ApiOkResponse({ type: BillResponse })
  @ApiParam({ name: 'id', description: 'Bill UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<BillResponse> {
    const query = new GetBillQuery();
    query.id    = id;
    const result = await this.mediator.execute<GetBillQuery, Bill>(query);
    return this.mapper.map(result, Bill, BillResponse);
  }

  @ApiOperation({ summary: 'Create a new bill' })
  @ApiCreatedResponse({ type: BillResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @Body() body: CreateBillRequest,
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<BillResponse> {
    const command = this.mapper.map(body, CreateBillRequest, CreateBillCommand);
    command.organizationId = user?.organizationId ?? FALLBACK_ORG_ID;
    command.createdById    = user?.dbUserId ?? FALLBACK_USER_ID;
    const result  = await this.mediator.execute<CreateBillCommand, Bill>(command);
    return this.mapper.map(result, Bill, BillResponse);
  }

  @ApiOperation({ summary: 'Update bill header (INITIATED only)' })
  @ApiOkResponse({ type: BillResponse })
  @ApiParam({ name: 'id', description: 'Bill UUID' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateBillRequest): Promise<BillResponse> {
    const command = this.mapper.map(body, UpdateBillRequest, UpdateBillCommand);
    command.id    = id;
    const result  = await this.mediator.execute<UpdateBillCommand, Bill>(command);
    return this.mapper.map(result, Bill, BillResponse);
  }

  @ApiOperation({ summary: 'Delete a bill (INITIATED or DRAFT only)' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Bill UUID' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeleteBillCommand();
    command.id    = id;
    return this.mediator.execute<DeleteBillCommand, boolean>(command);
  }

  @ApiOperation({ summary: 'Add an item to a bill (INITIATED only)' })
  @ApiCreatedResponse({ type: BillResponse })
  @ApiParam({ name: 'id', description: 'Bill UUID' })
  @HttpCode(HttpStatus.CREATED)
  @Post(':id/items')
  public async addItem(@Param('id') id: string, @Body() body: CreateBillItemRequest): Promise<BillResponse> {
    const command  = this.mapper.map(body, CreateBillItemRequest, AddBillItemCommand);
    command.billId = id;
    const result   = await this.mediator.execute<AddBillItemCommand, Bill>(command);
    return this.mapper.map(result, Bill, BillResponse);
  }

  @ApiOperation({ summary: 'Update a bill item (INITIATED only)' })
  @ApiOkResponse({ type: BillResponse })
  @ApiParam({ name: 'id', description: 'Bill UUID' })
  @ApiParam({ name: 'itemId', description: 'Bill item UUID' })
  @HttpCode(HttpStatus.OK)
  @Put(':id/items/:itemId')
  public async updateItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() body: UpdateBillItemRequest,
  ): Promise<BillResponse> {
    const command    = this.mapper.map(body, UpdateBillItemRequest, UpdateBillItemCommand);
    command.billId   = id;
    command.itemId   = itemId;
    const result     = await this.mediator.execute<UpdateBillItemCommand, Bill>(command);
    return this.mapper.map(result, Bill, BillResponse);
  }

  @ApiOperation({ summary: 'Remove a bill item (INITIATED only)' })
  @ApiOkResponse({ type: BillResponse })
  @ApiParam({ name: 'id', description: 'Bill UUID' })
  @ApiParam({ name: 'itemId', description: 'Bill item UUID' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id/items/:itemId')
  public async removeItem(@Param('id') id: string, @Param('itemId') itemId: string): Promise<BillResponse> {
    const command  = new RemoveBillItemCommand();
    command.billId = id;
    command.itemId = itemId;
    const result   = await this.mediator.execute<RemoveBillItemCommand, Bill>(command);
    return this.mapper.map(result, Bill, BillResponse);
  }

  @ApiOperation({ summary: 'Transition bill status' })
  @ApiOkResponse({ type: BillResponse })
  @ApiParam({ name: 'id', description: 'Bill UUID' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id/status')
  public async transitionStatus(
    @Param('id') id: string,
    @Body() body: TransitionBillStatusRequest,
  ): Promise<BillResponse> {
    const command    = this.mapper.map(body, TransitionBillStatusRequest, TransitionBillStatusCommand);
    command.billId   = id;
    const result     = await this.mediator.execute<TransitionBillStatusCommand, Bill>(command);
    return this.mapper.map(result, Bill, BillResponse);
  }

  @ApiOperation({ summary: 'Export bill as PDF' })
  @ApiProduces('application/pdf')
  @ApiParam({ name: 'id', description: 'Bill UUID' })
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/pdf')
  @Get(':id/export')
  public async exportPdf(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const query  = new ExportBillQuery();
    query.id     = id;
    const doc: PdfDocument = await this.mediator.execute<ExportBillQuery, PdfDocument>(query);
    res.setHeader('Content-Disposition', `attachment; filename="${doc.filename}"`);
    res.setHeader('Content-Length', doc.sizeBytes);
    res.end(doc.buffer);
  }
}
