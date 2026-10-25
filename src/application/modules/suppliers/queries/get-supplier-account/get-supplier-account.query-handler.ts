import { Inject, NotFoundException } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { QueryHandlerStrict } from '../../../../../common';
import { SUPPLIER_REPO } from '../../../../constants';
import { ISupplierRepo } from '../../i-supplier.repo';
import { SupplierAccount, SupplierAccountPurchaseOrder } from '../../domain';
import { PurchaseOrderEntity } from '../../../../../infrastructure/persistence/entities/purchase-order.entity';
import { GetSupplierAccountQuery } from './get-supplier-account.query';

function computePaymentStatus(totalAmount: number, amountPaid: number): string {
  const paid = Number(amountPaid ?? 0);
  const total = Number(totalAmount ?? 0);
  if (paid <= 0) return 'unpaid';
  if (paid >= total) return 'paid';
  return 'partial';
}

@QueryHandlerStrict(GetSupplierAccountQuery)
export class GetSupplierAccountQueryHandler
  implements IQueryHandler<GetSupplierAccountQuery, SupplierAccount>
{
  constructor(
    @Inject(SUPPLIER_REPO) private readonly supplierRepo: ISupplierRepo,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(GetSupplierAccountQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetSupplierAccountQuery): Promise<SupplierAccount> {
    this.logger.info(`Executing ${GetSupplierAccountQuery.name} supplierId=${query.supplierId}`);

    const supplier = await this.supplierRepo.getAsync(query.supplierId);
    if (!supplier) throw new NotFoundException(`Supplier ${query.supplierId} not found`);

    const poEntities = await this.dataSource
      .getRepository(PurchaseOrderEntity)
      .find({
        where: { supplierId: query.supplierId, organizationId: query.organizationId },
        order: { createdAt: 'DESC' },
      });

    let totalInvoiced = 0;
    let totalPaid = 0;

    const purchaseOrders: SupplierAccountPurchaseOrder[] = poEntities.map((po) => {
      const total = Number(po.totalAmount ?? 0);
      const paid = Number(po.amountPaid ?? 0);
      totalInvoiced += total;
      totalPaid += paid;

      const item = new SupplierAccountPurchaseOrder();
      item.id            = po.id;
      item.poNumber      = po.poNumber;
      item.status        = po.status;
      item.totalAmount   = total;
      item.amountPaid    = paid;
      item.outstanding   = total - paid;
      item.paymentStatus = computePaymentStatus(total, paid);
      item.createdAt     = po.createdAt;
      return item;
    });

    const account = new SupplierAccount();
    account.supplierId       = supplier.id;
    account.supplierName     = supplier.name ?? '';
    account.supplierPhone    = supplier.phone;
    account.totalInvoiced    = totalInvoiced;
    account.totalPaid        = totalPaid;
    account.totalOutstanding = totalInvoiced - totalPaid;
    account.purchaseOrders   = purchaseOrders;

    return account;
  }
}
