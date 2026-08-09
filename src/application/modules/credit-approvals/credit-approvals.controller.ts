import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser, Roles, RolesGuard } from '../../../common';
import { ERole } from '../../../infrastructure/persistence/entities/role.entity';
import { Bill } from '../bills/domain';
import { BillResponse } from '../bills/models';
import {
  ApproveCreditApprovalCommand,
  MarkCommissionPaidCommand,
  RejectCreditApprovalCommand,
} from './commands';
import { CommissionPayable, CreditApprovalRequest } from './domain';
import {
  BlackLedgerResponse,
  CommissionPayableResponse,
  CreditApprovalRequestResponse,
} from './models';
import { GetBlackLedgerQuery, BlackLedgerResult } from './queries/get-black-ledger';
import { ListPendingCreditApprovalsQuery } from './queries/list-pending-credit-approvals';

@ApiBearerAuth()
@ApiTags('Credit Approvals')
@Controller({ path: 'credit-approvals', version: '1' })
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles(ERole.OrgAdmin, ERole.OrgManager, ERole.SuperAdmin)
export class CreditApprovalsController {
  constructor(
    protected readonly mediator: CqrsMediator,
    @InjectMapper() protected readonly mapper: Mapper,
    @InjectPinoLogger(CreditApprovalsController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'List pending credit approval requests' })
  @ApiOkResponse({ type: [CreditApprovalRequestResponse] })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async listPending(@CurrentUser() user: AuthenticatedUser): Promise<CreditApprovalRequestResponse[]> {
    const query = new ListPendingCreditApprovalsQuery();
    query.organizationId = user.organizationId;
    const result = await this.mediator.execute<ListPendingCreditApprovalsQuery, CreditApprovalRequest[]>(query);
    return this.mapper.mapArray(result, CreditApprovalRequest, CreditApprovalRequestResponse);
  }

  @ApiOperation({ summary: 'Black ledger — black bills + commission payables' })
  @ApiOkResponse({ type: BlackLedgerResponse })
  @HttpCode(HttpStatus.OK)
  @Get('black-ledger')
  public async blackLedger(@CurrentUser() user: AuthenticatedUser): Promise<BlackLedgerResponse> {
    const query = new GetBlackLedgerQuery();
    query.organizationId = user.organizationId;
    const result = await this.mediator.execute<GetBlackLedgerQuery, BlackLedgerResult>(query);
    return {
      bills: this.mapper.mapArray(result.bills, Bill, BillResponse),
      commissions: this.mapper.mapArray(result.commissions, CommissionPayable, CommissionPayableResponse),
    };
  }

  @ApiOperation({ summary: 'Approve a credit approval request — completes the underlying bill' })
  @ApiOkResponse({ type: CreditApprovalRequestResponse })
  @HttpCode(HttpStatus.OK)
  @Post(':id/approve')
  public async approve(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<CreditApprovalRequestResponse> {
    const command = new ApproveCreditApprovalCommand();
    command.id = id;
    command.decidedById = user.dbUserId;
    const result = await this.mediator.execute<ApproveCreditApprovalCommand, CreditApprovalRequest>(command);
    return this.mapper.map(result, CreditApprovalRequest, CreditApprovalRequestResponse);
  }

  @ApiOperation({ summary: 'Reject a credit approval request — bill stays incomplete' })
  @ApiOkResponse({ type: CreditApprovalRequestResponse })
  @HttpCode(HttpStatus.OK)
  @Post(':id/reject')
  public async reject(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<CreditApprovalRequestResponse> {
    const command = new RejectCreditApprovalCommand();
    command.id = id;
    command.decidedById = user.dbUserId;
    const result = await this.mediator.execute<RejectCreditApprovalCommand, CreditApprovalRequest>(command);
    return this.mapper.map(result, CreditApprovalRequest, CreditApprovalRequestResponse);
  }

  @ApiOperation({ summary: 'Mark a commission payable as paid' })
  @ApiOkResponse({ type: CommissionPayableResponse })
  @HttpCode(HttpStatus.OK)
  @Post('commissions/:id/mark-paid')
  public async markCommissionPaid(@Param('id') id: string): Promise<CommissionPayableResponse> {
    const command = new MarkCommissionPaidCommand();
    command.id = id;
    const result = await this.mediator.execute<MarkCommissionPaidCommand, CommissionPayable>(command);
    return this.mapper.map(result, CommissionPayable, CommissionPayableResponse);
  }
}
