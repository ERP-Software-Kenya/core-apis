import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ParseEnumPipe } from '@nestjs/common';
import { CqrsMediator } from '../../../common';
import { CreateExpenseCommand, UpdateExpenseStatusCommand } from './commands';
import { Expense } from './domain';
import { CreateExpenseRequest, ExpenseResponse, UpdateExpenseStatusRequest } from './models';
import { GetExpenseQuery, ListExpensesQuery } from './queries';
import { EExpenseStatus } from '../../../infrastructure/e-expense-status';

@ApiBearerAuth()
@ApiTags('Expenses')
@Controller({ path: 'expenses', version: '1' })
export class ExpensesController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(ExpensesController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'List all expenses' })
  @ApiOkResponse({ type: [ExpenseResponse] })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  public async list(
    @Query('status', new ParseEnumPipe(EExpenseStatus, { optional: true })) status?: EExpenseStatus,
  ): Promise<ExpenseResponse[]> {
    const query = new ListExpensesQuery();
    query.status = status;
    return this.mediator.execute<ListExpensesQuery, ExpenseResponse[]>(query);
  }

  @ApiOperation({ summary: 'Update expense status (approve / reject)' })
  @ApiOkResponse({ type: ExpenseResponse })
  @ApiParam({ name: 'id', description: 'Expense UUID' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id/status')
  public async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateExpenseStatusRequest,
  ): Promise<ExpenseResponse> {
    const command = new UpdateExpenseStatusCommand();
    command.id = id;
    command.status = body.status;
    const result = await this.mediator.execute<UpdateExpenseStatusCommand, Expense>(command);
    return this.mapper.map(result, Expense, ExpenseResponse);
  }

  @ApiOperation({ summary: 'Get expense by ID' })
  @ApiOkResponse({ type: ExpenseResponse })
  @ApiParam({ name: 'id', description: 'Expense UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<ExpenseResponse> {
    const query = new GetExpenseQuery();
    query.id = id;
    const result = await this.mediator.execute<GetExpenseQuery, Expense>(query);
    return this.mapper.map(result, Expense, ExpenseResponse);
  }

  @ApiOperation({ summary: 'Create a new expense' })
  @ApiCreatedResponse({ type: ExpenseResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateExpenseRequest): Promise<ExpenseResponse> {
    const command = this.mapper.map(body, CreateExpenseRequest, CreateExpenseCommand);
    const result  = await this.mediator.execute<CreateExpenseCommand, Expense>(command);
    return this.mapper.map(result, Expense, ExpenseResponse);
  }
}
