import { Inject, Optional } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, PDF_EXPORT_SERVICE, IPdfExportService, PdfDocument } from '../../../../../common';
import {
  BRANCH_REPO,
  ORGANIZATION_REPO,
  PRODUCT_REPO,
  PURCHASE_ITEM_REPO,
  PURCHASE_ORDER_REPO,
  SUPPLIER_REPO,
} from '../../../../constants';
import type { IPurchaseOrderRepo } from '../../i-purchaseorder.repo';
import type { IPurchaseItemRepo } from '../../../purchase-items/i-purchase-item.repo';
import type { ISupplierRepo } from '../../../suppliers/i-supplier.repo';
import type { IProductRepo } from '../../../products/i-product.repo';
import type { IOrganizationRepo } from '../../../organizations/i-organization.repo';
import type { IBranchRepo } from '../../../branches/i-branch.repo';
import { PurchaseOrder } from '../../domain';
import { PurchaseItem } from '../../../purchase-items/domain';
import { Product } from '../../../products/domain';
import { Supplier } from '../../../suppliers/domain';
import { Organization } from '../../../organizations/domain';
import { Branch } from '../../../branches/domain';
import { ExportPurchaseOrderQuery } from './export-purchaseorder.query';
import { formatOrganizationCurrency, OrganizationSettingsService } from '../../../billing-settings/currency';

@QueryHandlerStrict(ExportPurchaseOrderQuery)
export class ExportPurchaseOrderQueryHandler implements IQueryHandler<ExportPurchaseOrderQuery, PdfDocument> {
  public constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly poRepo: IPurchaseOrderRepo,
    @Inject(PURCHASE_ITEM_REPO)  private readonly itemRepo: IPurchaseItemRepo,
    @Inject(SUPPLIER_REPO)       private readonly supplierRepo: ISupplierRepo,
    @Inject(PRODUCT_REPO)        private readonly productRepo: IProductRepo,
    @Inject(ORGANIZATION_REPO)   private readonly orgRepo: IOrganizationRepo,
    @Inject(BRANCH_REPO)         private readonly branchRepo: IBranchRepo,
    @Inject(PDF_EXPORT_SERVICE)  private readonly pdfService: IPdfExportService,
    @InjectPinoLogger(ExportPurchaseOrderQueryHandler.name) private readonly logger: PinoLogger,
    @Optional() private readonly organizationSettings?: OrganizationSettingsService,
  ) {}

  public async execute(query: ExportPurchaseOrderQuery): Promise<PdfDocument> {
    this.logger.info(`Executing Query "${ExportPurchaseOrderQuery.name}" id=${query.id}`);

    const po: PurchaseOrder = await this.poRepo.getAsync(query.id);

    const [items, supplier, org, branch] = await Promise.all([
      this.itemRepo.allAsync({ purchaseOrderId: po.id }),
      this.supplierRepo.getAsync(po.supplierId).catch(() => null),
      this.orgRepo.getAsync(po.organizationId).catch(() => null),
      po.branchId
        ? this.branchRepo.getAsync(po.branchId).catch(() => null)
        : Promise.resolve(null),
    ]);

    const productMap = new Map<string, Product>();
    await Promise.all(
      items.map(async (item: PurchaseItem) => {
        if (!productMap.has(item.productId)) {
          const product = await this.productRepo.getAsync(item.productId).catch(() => null);
          if (product) productMap.set(item.productId, product);
        }
      }),
    );

    const currencyCode = this.organizationSettings
      ? await this.organizationSettings.currencyCode(po.organizationId)
      : 'KES';

    const context  = this.buildContext(po, items, supplier, productMap, org, branch, currencyCode);
    const filename = `purchase-order-${po.poNumber}.pdf`;

    return this.pdfService.generateFromTemplateAsync('purchase-order', context, filename);
  }

  private buildContext(
    po: PurchaseOrder,
    items: PurchaseItem[],
    supplier: Supplier | null,
    productMap: Map<string, Product>,
    org: Organization | null,
    branch: Branch | null,
    currencyCode: string,
  ): Record<string, unknown> {
    const fmt = (value: number): string => formatOrganizationCurrency(value, currencyCode);

    const fmtDate = (dateVal?: Date | string | null): string => {
      if (!dateVal) return '—';
      return new Date(dateVal).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    };

    const totalAmount = Number(po.totalAmount ?? 0);
    const amountPaid  = Number(po.amountPaid  ?? 0);
    const balanceDue  = totalAmount - amountPaid;

    const isFullyPaid   = amountPaid >= totalAmount && totalAmount > 0;
    const isPartialPaid = amountPaid > 0 && amountPaid < totalAmount;
    const paymentLabel  = isFullyPaid ? 'Paid' : isPartialPaid ? 'Partial' : 'Unpaid';

    const statusLabel = String(po.status ?? 'Draft')
      .charAt(0).toUpperCase() + String(po.status ?? 'Draft').slice(1).toLowerCase();

    return {
      orgName:    org?.name    ?? 'Organization',
      orgPhone:   org?.phone   ?? '',
      orgEmail:   org?.email   ?? '',
      orgCountry: org?.country ?? '',
      currencyCode,

      poNumber:      po.poNumber,
      status:        statusLabel,
      paymentStatus: paymentLabel,
      isUnpaid:      !isFullyPaid && !isPartialPaid,
      isPaid:        isFullyPaid,
      createdAt:     fmtDate(po.createdAt),
      expectedAt:    po.expectedAt ? fmtDate(po.expectedAt) : null,
      receivedAt:    po.receivedAt ? fmtDate(po.receivedAt) : null,
      generatedAt:   fmtDate(new Date()),

      supplierName:    supplier?.name          ?? `Supplier (${po.supplierId.slice(0, 8)})`,
      supplierContact: supplier?.contactPerson ?? '—',
      supplierPhone:   supplier?.phone         ?? '—',
      supplierEmail:   supplier?.email         ?? '—',
      supplierAddress: supplier?.address       ?? '—',
      supplierTaxId:   supplier?.taxId         ?? '—',

      deliverTo:      branch?.name    ?? '',
      deliverAddr:    branch?.address ?? '',
      deliverCity:    branch?.city    ?? '',
      deliverCountry: branch?.country ?? (org?.country ?? ''),

      itemCount:     items.length,
      multipleItems: items.length !== 1,
      totalQty: items.reduce((sum: number, it: PurchaseItem) => sum + Number(it.quantityOrdered ?? 0), 0),

      items: items.map((item: PurchaseItem, idx: number) => {
        const product = productMap.get(item.productId);
        return {
          index:             String(idx + 1).padStart(2, '0'),
          name:              product?.name ?? `Product (${item.productId.slice(0, 8)})`,
          sku:               product?.sku  ?? '—',
          uom:               product?.productUnits?.find((pu) => pu.isDefault)?.unitSymbol ?? '—',
          quantityOrdered:   Number(item.quantityOrdered  ?? 0),
          quantityReceived:  Number(item.quantityReceived  ?? 0),
          quantityAllocated: Number(item.quantityAllocated ?? 0),
          unitCost:          fmt(item.unitCost),
          totalCost:         fmt(item.totalCost),
        };
      }),

      subtotal:      fmt(totalAmount),
      totalAmount:   fmt(totalAmount),
      amountPaid:    fmt(amountPaid),
      balanceDue:    fmt(balanceDue),
      hasBalance:    balanceDue > 0,
      amountInWords: this.toWords(totalAmount, currencyCode),

      notes: po.notes ?? '',
    };
  }

  private toWords(amount: number, currencyCode: string): string {
    const intPart = Math.floor(amount);
    const label   = currencyCode === 'KES' ? 'Kenya Shillings' : currencyCode;

    const ones = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
      'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
      'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
    ];
    const tensWords = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const chunkToWords = (num: number): string => {
      if (num === 0) return '';
      if (num < 20)  return ones[num];
      if (num < 100) return tensWords[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
      return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + chunkToWords(num % 100) : '');
    };

    if (intPart === 0) return `${label} Zero Only`;

    const parts: string[] = [];
    if (intPart >= 1_000_000) parts.push(chunkToWords(Math.floor(intPart / 1_000_000)) + ' Million');
    if (intPart >= 1_000) parts.push(chunkToWords(Math.floor((intPart % 1_000_000) / 1_000)) + ' Thousand');
    const remainder = intPart % 1_000;
    if (remainder > 0) parts.push(chunkToWords(remainder));

    return `${label} ${parts.join(' ')} Only`;
  }
}
