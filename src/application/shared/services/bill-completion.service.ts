import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  BILL_REPO,
  CREDIT_APPROVAL_REQUEST_REPO,
  CUSTOMER_REPO,
  CUSTOMER_TYPE_RULE_REPO,
} from '../../constants';
import { IBillRepo } from '../../modules/bills';
import { Bill } from '../../modules/bills/domain';
import { ICustomerRepo } from '../../modules/customers';
import { Customer } from '../../modules/customers/domain';
import { ICustomerTypeRuleRepo } from '../../modules/billing-settings';
import { ICreditApprovalRequestRepo } from '../../modules/credit-approvals';
import {
  ECreditApprovalStatus,
  ESaleType,
} from '../../../infrastructure/persistence/entities';

export class CreditLimitExceededError extends BadRequestException {
  public readonly approvalRequestId: string;

  constructor(approvalRequestId: string) {
    super({
      message: 'Sale exceeds customer credit limit — sent for approval',
      approvalRequestId,
    });
    this.approvalRequestId = approvalRequestId;
  }
}

@Injectable()
export class BillCompletionService {
  constructor(
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    @Inject(CUSTOMER_REPO) private readonly customerRepo: ICustomerRepo,
    @Inject(CUSTOMER_TYPE_RULE_REPO) private readonly typeRuleRepo: ICustomerTypeRuleRepo,
    @Inject(CREDIT_APPROVAL_REQUEST_REPO) private readonly creditApprovalRepo: ICreditApprovalRequestRepo,
    @InjectPinoLogger(BillCompletionService.name) private readonly logger: PinoLogger,
  ) {}

  /** Credit-limit gate for order-linked bills (no stock deduction). */
  public async assertCreditLimitForBill(bill: Bill, requestedById: string): Promise<void> {
    if (bill.saleType !== ESaleType.Credit) return;
    await this.enforceCreditLimit(bill, requestedById);
  }

  public async completeBill(billId: string, performedById: string, creditOverrideApproved = false, paymentMethod?: string): Promise<Bill> {
    const bill = await this.billRepo.getAsync(billId);
    if (!bill) throw new NotFoundException(`Bill ${billId} not found`);
    let creditLimitOverride = creditOverrideApproved;
    if (bill.saleType === ESaleType.Credit && !creditOverrideApproved) {
      creditLimitOverride = await this.enforceCreditLimit(bill, performedById);
    }
    return this.billRepo.completeAsync({
      billId,
      performedById,
      creditLimitOverride,
      paymentMethod,
    });
  }

  private async enforceCreditLimit(bill: Bill, requestedById: string): Promise<boolean> {
    if (!bill.customerId) throw new BadRequestException('Credit sale requires a customer');
    const customer = await this.customerRepo.getAsync(bill.customerId);
    if (!customer) throw new NotFoundException(`Customer ${bill.customerId} not found`);
    if (customer.creditLimit == null) throw new BadRequestException('Customer has no credit limit set');

    const wouldBeBalance = Number(customer.creditBalance) + Number(bill.totalAmount);
    if (wouldBeBalance > Number(customer.creditLimit)) {
      if (await this.shouldSkipCreditApproval(bill, customer)) {
        this.logger.info({ billId: bill.id, customerId: customer.id }, 'credit-limit.skip-approval');
        return true;
      }
      const priorApproved = await this.creditApprovalRepo.allAsync({
        billId: bill.id,
        status: ECreditApprovalStatus.Approved,
      });
      if (priorApproved.length > 0) {
        this.logger.info(
          { billId: bill.id, approvalId: priorApproved[0].id },
          'credit-limit.approved-override',
        );
        return true;
      }
      const approval = await this.creditApprovalRepo.createAsync({
        organizationId: bill.organizationId,
        customerId: bill.customerId,
        billId: bill.id,
        requestedAmount: bill.totalAmount,
        requestedById,
        status: ECreditApprovalStatus.Pending,
      } as never);
      this.logger.warn({ billId: bill.id, approvalId: approval.id }, 'credit-limit.exceeded');
      throw new CreditLimitExceededError(approval.id);
    }
    return false;
  }

  private async shouldSkipCreditApproval(bill: Bill, customer: Customer): Promise<boolean> {
    if (customer.skipOverLimitApproval != null) return customer.skipOverLimitApproval;
    const type = bill.customerType ?? customer.customerType;
    if (!type) return false;
    const rule = await this.typeRuleRepo.findOneAsync({
      organizationId: bill.organizationId,
      customerType: type,
    });
    return rule?.skipOverLimitApproval === true;
  }

}
