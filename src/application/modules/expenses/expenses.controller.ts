import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Body, Controller, Get, HttpCode, HttpStatus,
  Param, ParseEnumPipe, Patch, Post, Query,
  UploadedFile, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse,
  ApiOkResponse, ApiOperation, ApiParam, ApiTags,
} from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  ClerkAuthGuard, CqrsMediator, RolesGuard, Roles,
  AuthenticatedUser, CurrentUser, requireOrganizationId, assertOrgOwnership,
} from '../../../common';
import { ERole } from '../../../infrastructure';
import { CreateExpenseCommand, UpdateExpenseStatusCommand, UploadExpenseReceiptCommand } from './commands';
import { Expense } from './domain';
import { CreateExpenseRequest, ExpenseResponse, UpdateExpenseStatusRequest } from './models';
import { GetExpenseQuery, ListExpensesQuery } from './queries';
import { EExpenseStatus } from '../../../infrastructure/e-expense-status';

const PRIVILEGED_ROLES = new Set<ERole>([ERole.OrgAdmin, ERole.SuperAdmin]);

@ApiBearerAuth()
@ApiTags('Expenses')
@UseGuards(ClerkAuthGuard)
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
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<ExpenseResponse[]> {
    const orgId = requireOrganizationId(user);
    const isPrivileged = (user?.roles ?? []).some((role) => PRIVILEGED_ROLES.has(role));
    const query = new ListExpensesQuery();
    query.status            = status;
    query.organizationId    = orgId;
    query.submittedByUserId = isPrivileged ? undefined : user?.dbUserId;
    return this.mediator.execute<ListExpensesQuery, ExpenseResponse[]>(query);
  }

  @ApiOperation({ summary: 'Update expense status' })
  @ApiOkResponse({ type: ExpenseResponse })
  @ApiParam({ name: 'id', description: 'Expense UUID' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ERole.OrgAdmin, ERole.SuperAdmin)
  @Patch(':id/status')
  public async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateExpenseStatusRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ExpenseResponse> {
    const existingQuery = new GetExpenseQuery();
    existingQuery.id = id;
    const existing = await this.mediator.execute<GetExpenseQuery, Expense>(existingQuery);
    assertOrgOwnership(user, existing.organizationId, 'Expense');
    const command = new UpdateExpenseStatusCommand();
    command.id      = id;
    command.status  = body.status;
    command.comment = body.comment;
    const result = await this.mediator.execute<UpdateExpenseStatusCommand, Expense>(command);
    return this.mapper.map(result, Expense, ExpenseResponse);
  }

  @ApiOperation({ summary: 'Get expense by ID' })
  @ApiOkResponse({ type: ExpenseResponse })
  @ApiParam({ name: 'id', description: 'Expense UUID' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ExpenseResponse> {
    const query = new GetExpenseQuery();
    query.id            = id;
    query.callerUserId  = user?.dbUserId;
    query.callerRoles   = user?.roles;
    const result = await this.mediator.execute<GetExpenseQuery, Expense>(query);
    assertOrgOwnership(user, result.organizationId, 'Expense');
    return this.mapper.map(result, Expense, ExpenseResponse);
  }

  @ApiOperation({ summary: 'Create a new expense' })
  @ApiCreatedResponse({ type: ExpenseResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @Body() body: CreateExpenseRequest,
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<ExpenseResponse> {
    const command = this.mapper.map(body, CreateExpenseRequest, CreateExpenseCommand);
    command.organizationId    = requireOrganizationId(user);
    command.submittedByUserId = user?.dbUserId ?? '';
    command.submittedByName   = user?.firstName ?? '';
    const result = await this.mediator.execute<CreateExpenseCommand, Expense>(command);
    return this.mapper.map(result, Expense, ExpenseResponse);
  }

  @ApiOperation({ summary: 'Upload receipt for an expense' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { receipt: { type: 'string', format: 'binary' } } } })
  @ApiCreatedResponse({ type: ExpenseResponse })
  @ApiParam({ name: 'id', description: 'Expense UUID' })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('receipt'))
  @Post(':id/receipt')
  public async uploadReceipt(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ExpenseResponse> {
    const command = new UploadExpenseReceiptCommand();
    command.expenseId    = id;
    command.buffer       = file.buffer;
    command.mimeType     = file.mimetype;
    command.callerUserId = user?.dbUserId ?? '';
    command.callerRoles  = user?.roles ?? [];
    const result = await this.mediator.execute<UploadExpenseReceiptCommand, Expense>(command);
    return this.mapper.map(result, Expense, ExpenseResponse);
  }
}
