import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CqrsMediator } from '../../../common';
import { IPageable } from '../../../common';
import { CreateBillCommand, DeleteBillCommand, UpdateBillCommand } from './commands';
import { Bill } from './domain';
import { CreateBillRequest, SearchBillsRequest, ListBillsRequest, BillResponse, BillsPagedResponse, UpdateBillRequest } from './models';
import { GetBillQuery, ListBillsQuery, SearchBillsQuery } from './queries';

@ApiBearerAuth()
@ApiTags('Bills')
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
    const query = this.mapper.map(filter, SearchBillsRequest, SearchBillsQuery);
    const result = await this.mediator.execute<SearchBillsQuery, IPageable<Bill>>(query);
    return {
      ...result,
      items: this.mapper.mapArray(result.items, Bill, BillResponse),
    };
  }

  @ApiOperation({ summary: 'List all bills' })
  @ApiOkResponse({ type: [BillResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(@Query() filter?: ListBillsRequest): Promise<BillResponse[]> {
    const query = this.mapper.map(filter, ListBillsRequest, ListBillsQuery);
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
    query.id = id;
    const result = await this.mediator.execute<GetBillQuery, Bill>(query);
    return this.mapper.map(result, Bill, BillResponse);
  }

  @ApiOperation({ summary: 'Create a new bill' })
  @ApiCreatedResponse({ type: BillResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateBillRequest): Promise<BillResponse> {
    const command = this.mapper.map(body, CreateBillRequest, CreateBillCommand);
    const result  = await this.mediator.execute<CreateBillCommand, Bill>(command);
    return this.mapper.map(result, Bill, BillResponse);
  }

  @ApiOperation({ summary: 'Update a bill' })
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

  @ApiOperation({ summary: 'Delete a bill' })
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', description: 'Bill UUID' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const command = new DeleteBillCommand();
    command.id    = id;
    return this.mediator.execute<DeleteBillCommand, boolean>(command);
  }
}
