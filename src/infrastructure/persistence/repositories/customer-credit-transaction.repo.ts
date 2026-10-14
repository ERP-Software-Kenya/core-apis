import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, countPages, Filter, IPageable, PageableFilter } from '../../../common';
import { CustomerCreditTransactionEntity, CustomerEntity, ECreditTransactionType } from '../entities';
import {
  CreditTransactionDocument,
  CustomerCreditTransaction,
  SearchCreditTransactionsFilter,
} from '../../../application/modules/credit-approvals/domain';
import {
  CustomerBalanceTransactionInput,
  ICustomerCreditTransactionRepo,
} from '../../../application/modules/credit-approvals/i-customer-credit-transaction.repo';
import type { Customer } from '../../../application/modules/customers/domain';
import { OFFICIAL_ACCOUNT_CODES } from '../../../application/modules/accounting';
import { postOfficialJournal } from './ledger-posting';

@Injectable()
export class CustomerCreditTransactionRepo
  extends BaseRepo<
    CustomerCreditTransactionEntity,
    CustomerCreditTransaction,
    string,
    PageableFilter<CustomerCreditTransaction>,
    Filter<CustomerCreditTransaction>
  >
  implements ICustomerCreditTransactionRepo
{
  constructor(
    @InjectRepository(CustomerCreditTransactionEntity) internalRepo: Repository<CustomerCreditTransactionEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(CustomerCreditTransactionRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, CustomerCreditTransactionEntity, CustomerCreditTransaction);
  }

  public override get idColumnName(): keyof CustomerCreditTransactionEntity {
    return 'id';
  }

  public async recordCustomerBalanceTransactionAsync(
    input: CustomerBalanceTransactionInput,
  ): Promise<Customer> {
    if (!Number.isFinite(input.amount) || input.amount === 0) {
      throw new BadRequestException('Transaction amount must be a non-zero number');
    }
    if (input.type === 'payment' && input.amount < 0) {
      throw new BadRequestException('Payment amount must be greater than 0');
    }

    return this.internalRepo.manager.transaction(async (manager) => {
      const customer = await manager.findOne(CustomerEntity, {
        where: { id: input.customerId, organizationId: input.organizationId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!customer) throw new NotFoundException(`Customer ${input.customerId} not found`);

      const before = Number(customer.creditBalance ?? 0);
      if (input.type === 'payment' && input.amount > before) {
        throw new BadRequestException(
          `Payment amount ${input.amount} exceeds outstanding balance ${before}`,
        );
      }
      const after = before + (input.type === 'payment' ? -input.amount : input.amount);
      if (after < 0) {
        throw new BadRequestException('Transaction would create a customer advance balance');
      }

      const transaction = await manager.save(
        CustomerCreditTransactionEntity,
        manager.create(CustomerCreditTransactionEntity, {
          customerId: input.customerId,
          type:
            input.type === 'payment'
              ? ECreditTransactionType.Payment
              : ECreditTransactionType.Adjustment,
          amount: Math.abs(input.amount),
          balanceBefore: before,
          balanceAfter: after,
          paymentMethod: input.paymentMethod,
          note: input.note,
          performedById: input.performedById,
        }),
      );
      const amount = Math.abs(input.amount);
      const lines = input.type === 'payment'
        ? [
            {
              accountCode: input.paymentMethod?.toLowerCase() === 'cash'
                ? OFFICIAL_ACCOUNT_CODES.Cash
                : OFFICIAL_ACCOUNT_CODES.Bank,
              debit: amount,
              credit: 0,
              customerId: customer.id,
            },
            {
              accountCode: OFFICIAL_ACCOUNT_CODES.AccountsReceivable,
              debit: 0,
              credit: amount,
              customerId: customer.id,
            },
          ]
        : input.amount > 0
          ? [
              {
                accountCode: OFFICIAL_ACCOUNT_CODES.AccountsReceivable,
                debit: amount,
                credit: 0,
                customerId: customer.id,
              },
              {
                accountCode: OFFICIAL_ACCOUNT_CODES.OtherIncome,
                debit: 0,
                credit: amount,
                customerId: customer.id,
              },
            ]
          : [
              {
                accountCode: OFFICIAL_ACCOUNT_CODES.AdjustmentExpense,
                debit: amount,
                credit: 0,
                customerId: customer.id,
              },
              {
                accountCode: OFFICIAL_ACCOUNT_CODES.AccountsReceivable,
                debit: 0,
                credit: amount,
                customerId: customer.id,
              },
            ];
      await postOfficialJournal(manager, {
        organizationId: input.organizationId,
        idempotencyKey: `customer-credit-transaction:${transaction.id}`,
        sourceType: 'customer_credit_transaction',
        sourceId: transaction.id,
        occurredAt: new Date(),
        description: input.type === 'payment' ? 'Customer payment' : 'Customer balance adjustment',
        createdBy: input.performedById,
        lines,
      });
      customer.creditBalance = after;
      const saved = await manager.save(CustomerEntity, customer);
      return { ...saved } as Customer;
    });
  }

  public async searchOrgPagedAsync(
    filter: SearchCreditTransactionsFilter,
  ): Promise<IPageable<CreditTransactionDocument>> {
    const { organizationId, type, customerId, search, $page, $perPage } = filter;
    const query = this.internalRepo
      .createQueryBuilder('tx')
      .innerJoin('tx.customer', 'customer')
      .leftJoin('tx.bill', 'bill')
      .addSelect('customer')
      .addSelect('bill')
      .where('customer.organizationId = :organizationId', { organizationId });

    if (type) {
      query.andWhere('tx.type = :type', { type });
    }
    if (customerId) {
      query.andWhere('tx.customerId = :customerId', { customerId });
    }
    if (search) {
      query.andWhere('(customer.name ILIKE :q OR bill.billNumber ILIKE :q OR tx.note ILIKE :q)', {
        q: `%${search}%`,
      });
    }

    const [entities, totalCount] = await query
      .orderBy('tx.createdAt', 'DESC')
      .skip($perPage * ($page - 1))
      .take($perPage)
      .getManyAndCount();

    return {
      items: entities.map((entity) => ({
        id: entity.id,
        customerId: entity.customerId,
        customerName: entity.customer?.name ?? null,
        billId: entity.billId ?? null,
        billNumber: entity.bill?.billNumber ?? null,
        walkInName: entity.bill?.walkInName ?? null,
        type: entity.type,
        amount: entity.amount,
        balanceBefore: entity.balanceBefore,
        balanceAfter: entity.balanceAfter,
        paymentMethod: entity.paymentMethod ?? null,
        note: entity.note ?? null,
        subtotal: entity.bill?.subtotal ?? null,
        discountAmount: entity.bill?.discountAmount ?? null,
        taxAmount: entity.bill?.taxAmount ?? null,
        totalAmount: entity.bill?.totalAmount ?? null,
        billedAt: entity.bill?.billedAt ?? null,
        createdAt: entity.createdAt,
      })),
      page: $page,
      perPage: $perPage,
      totalCount,
      totalPages: countPages(totalCount, $perPage),
    };
  }
}
