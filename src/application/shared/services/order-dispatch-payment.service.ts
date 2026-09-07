import { Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { BILL_REPO, CREDIT_APPROVAL_REQUEST_REPO, ORDER_REPO, PAYMENT_TRANSACTION_REPO } from '../../constants';
import { IBillRepo } from '../../modules/bills';
import { ICreditApprovalRequestRepo } from '../../modules/credit-approvals';
import { IOrderRepo } from '../../modules/orders';
import { IPaymentTransactionRepo } from '../../modules/payment-transactions';
import { EPaymentTiming, ECreditApprovalStatus } from '../../../infrastructure/persistence/entities';
import {
  OrderDispatchBlockedException,
  OrderDispatchPaymentEvaluation,
} from './order-dispatch-payment.types';

@Injectable()
export class OrderDispatchPaymentService {
  public constructor(
    @Inject(ORDER_REPO) private readonly orderRepo: IOrderRepo,
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    @Inject(PAYMENT_TRANSACTION_REPO) private readonly paymentTxnRepo: IPaymentTransactionRepo,
    @Inject(CREDIT_APPROVAL_REQUEST_REPO) private readonly creditApprovalRepo: ICreditApprovalRequestRepo,
    @InjectPinoLogger(OrderDispatchPaymentService.name) private readonly logger: PinoLogger,
  ) {}

  public async evaluateOrderAsync(orderId: string): Promise<OrderDispatchPaymentEvaluation> {
    const order = await this.orderRepo.getAsync(orderId);
    if (!order) {
      return this.blocked(EPaymentTiming.Cod, 'Order not found', 0, 0, false);
    }

    const bill = await this.billRepo.findBySourceOrderIdAsync(orderId);
    const timing = bill?.paymentTiming ?? EPaymentTiming.Cod;
    const label = this.paymentLabel(timing);
    const totalAmount = Number(bill?.totalAmount ?? order.totalAmount ?? 0);
    const amountPaid = bill ? await this.paymentTxnRepo.sumCompletedByReferenceAsync(bill.id, 'bill') : 0;
    const amountRequired = this.requiredAmount(timing, totalAmount, bill?.partialAmount);
    const creditApprovalPending = bill ? await this.hasPendingCreditApprovalAsync(bill.id) : false;

    if (creditApprovalPending) {
      return {
        canDispatch: false,
        canFulfill: false,
        paymentTiming: timing,
        paymentLabel: label,
        amountPaid,
        amountRequired,
        blockReason: 'Credit approval pending',
        creditApprovalPending: true,
      };
    }

    const paymentOk = this.isPaymentSatisfied(timing, amountPaid, amountRequired, totalAmount);
    if (!paymentOk) {
      return {
        canDispatch: false,
        canFulfill: true,
        paymentTiming: timing,
        paymentLabel: label,
        amountPaid,
        amountRequired,
        blockReason: this.paymentBlockReason(timing, amountPaid, amountRequired),
        creditApprovalPending: false,
      };
    }

    return {
      canDispatch: true,
      canFulfill: true,
      paymentTiming: timing,
      paymentLabel: label,
      amountPaid,
      amountRequired,
      creditApprovalPending: false,
    };
  }

  public async assertCanDispatchAsync(orderId: string, orderNumber?: string): Promise<void> {
    const evaluation = await this.evaluateOrderAsync(orderId);
    if (!evaluation.canDispatch) {
      const ref = orderNumber ? `Order #${orderNumber}` : 'Order';
      throw new OrderDispatchBlockedException(
        `${ref} cannot dispatch: ${evaluation.blockReason ?? 'payment requirements not met'}`,
      );
    }
  }

  public async assertCanFulfillAsync(orderId: string, orderNumber?: string): Promise<void> {
    const evaluation = await this.evaluateOrderAsync(orderId);
    if (!evaluation.canFulfill) {
      const ref = orderNumber ? `Order #${orderNumber}` : 'Order';
      throw new OrderDispatchBlockedException(
        `${ref} cannot be fulfilled: ${evaluation.blockReason ?? 'blocked'}`,
      );
    }
  }

  public async syncOrderPaymentStatusAsync(orderId: string): Promise<void> {
    const order = await this.orderRepo.getAsync(orderId);
    if (!order) return;
    const bill = await this.billRepo.findBySourceOrderIdAsync(orderId);
    if (!bill) return;

    const totalAmount = Number(bill.totalAmount ?? 0);
    const amountPaid = await this.paymentTxnRepo.sumCompletedByReferenceAsync(bill.id, 'bill');
    let paymentStatus = 'UNPAID';
    if (amountPaid >= totalAmount && totalAmount > 0) {
      paymentStatus = 'PAID';
    } else if (amountPaid > 0) {
      paymentStatus = 'PARTIAL';
    }
    if (order.paymentStatus !== paymentStatus) {
      order.paymentStatus = paymentStatus;
      await this.orderRepo.updateAsync(order);
    }
  }

  private async hasPendingCreditApprovalAsync(billId: string): Promise<boolean> {
    const pending = await this.creditApprovalRepo.allAsync({
      billId,
      status: ECreditApprovalStatus.Pending,
    });
    return pending.length > 0;
  }

  private requiredAmount(timing: EPaymentTiming, total: number, partial?: number): number {
    switch (timing) {
      case EPaymentTiming.BeforeDelivery:
        return total;
      case EPaymentTiming.Half:
        return Number(partial ?? 0) > 0 ? Number(partial) : total / 2;
      default:
        return 0;
    }
  }

  private isPaymentSatisfied(
    timing: EPaymentTiming,
    amountPaid: number,
    amountRequired: number,
    total: number,
  ): boolean {
    switch (timing) {
      case EPaymentTiming.BeforeDelivery:
        return amountPaid >= total - 0.0001;
      case EPaymentTiming.Half:
        return amountPaid >= amountRequired - 0.0001;
      case EPaymentTiming.Cod:
      case EPaymentTiming.AfterDelivery:
      default:
        return true;
    }
  }

  private paymentLabel(timing: EPaymentTiming): string {
    switch (timing) {
      case EPaymentTiming.BeforeDelivery:
        return 'Prepaid';
      case EPaymentTiming.Half:
        return 'Partial';
      case EPaymentTiming.AfterDelivery:
        return 'Credit';
      case EPaymentTiming.Cod:
      default:
        return 'COD';
    }
  }

  private paymentBlockReason(timing: EPaymentTiming, paid: number, required: number): string {
    if (timing === EPaymentTiming.BeforeDelivery) {
      return `Prepayment required (${paid.toFixed(2)} paid, ${required.toFixed(2)} required)`;
    }
    if (timing === EPaymentTiming.Half) {
      return `Deposit required (${paid.toFixed(2)} paid, ${required.toFixed(2)} required)`;
    }
    return 'Payment requirements not met';
  }

  private blocked(
    timing: EPaymentTiming,
    reason: string,
    amountPaid: number,
    amountRequired: number,
    creditPending: boolean,
  ): OrderDispatchPaymentEvaluation {
    return {
      canDispatch: false,
      canFulfill: false,
      paymentTiming: timing,
      paymentLabel: this.paymentLabel(timing),
      amountPaid,
      amountRequired,
      blockReason: reason,
      creditApprovalPending: creditPending,
    };
  }
}
