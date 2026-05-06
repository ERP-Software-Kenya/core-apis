import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CqrsMediator } from '../../../common';
import { CreateStockMovementCommand } from './commands';
import { StockMovement } from './domain';
import { CreateStockMovementRequest, StockMovementResponse } from './models';
import { GetStockMovementQuery } from './queries';

@ApiBearerAuth()
@ApiTags('StockMovements')
@Controller({ path: 'stock-movements', version: '1' })
export class StockMovementsController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(StockMovementsController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Get stock movement by ID' })
  @ApiOkResponse({ type: StockMovementResponse })
  @ApiParam({ name: 'id', description: 'StockMovement UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<StockMovementResponse> {
    const query = new GetStockMovementQuery();
    query.id = id;
    const result = await this.mediator.execute<GetStockMovementQuery, StockMovement>(query);
    return this.mapper.map(result, StockMovement, StockMovementResponse);
  }

  @ApiOperation({ summary: 'Create a new stock movement' })
  @ApiCreatedResponse({ type: StockMovementResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateStockMovementRequest): Promise<StockMovementResponse> {
    const command = this.mapper.map(body, CreateStockMovementRequest, CreateStockMovementCommand);
    const result  = await this.mediator.execute<CreateStockMovementCommand, StockMovement>(command);
    return this.mapper.map(result, StockMovement, StockMovementResponse);
  }
}
