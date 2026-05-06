import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CqrsMediator } from '../../../common';
import { CreateStockTransferCommand } from './commands';
import { StockTransfer } from './domain';
import { CreateStockTransferRequest, StockTransferResponse } from './models';
import { GetStockTransferQuery } from './queries';

@ApiBearerAuth()
@ApiTags('StockTransfers')
@Controller({ path: 'stock-transfers', version: '1' })
export class StockTransfersController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(StockTransfersController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Get stock transfer by ID' })
  @ApiOkResponse({ type: StockTransferResponse })
  @ApiParam({ name: 'id', description: 'StockTransfer UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<StockTransferResponse> {
    const query = new GetStockTransferQuery();
    query.id = id;
    const result = await this.mediator.execute<GetStockTransferQuery, StockTransfer>(query);
    return this.mapper.map(result, StockTransfer, StockTransferResponse);
  }

  @ApiOperation({ summary: 'Create a new stock transfer' })
  @ApiCreatedResponse({ type: StockTransferResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateStockTransferRequest): Promise<StockTransferResponse> {
    const command = this.mapper.map(body, CreateStockTransferRequest, CreateStockTransferCommand);
    const result  = await this.mediator.execute<CreateStockTransferCommand, StockTransfer>(command);
    return this.mapper.map(result, StockTransfer, StockTransferResponse);
  }
}
