import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { BILL_REPO, ORGANIZATION_REPO, USER_REPO, CUSTOMER_REPO } from '../../../../constants';
import { IBillRepo } from '../..';
import { PDF_EXPORT_SERVICE, IPdfExportService, PdfDocument } from '../../../../../common';
import { IOrganizationRepo } from '../../../organizations/i-organization.repo';
import { Organization } from '../../../organizations/domain';
import { IUserRepo } from '../../../users/i-user.repo';
import { User } from '../../../users/domain';
import { ICustomerRepo } from '../../../customers/i-customer.repo';
import { Customer } from '../../../customers/domain';
import { ECustomerType, EPaymentMethod } from '../../../../../infrastructure/persistence/entities';
import { ExportBillQuery } from './export-bill.query';
import { Bill, BillItem } from '../../domain';

/** Big-customer bills print a formal sales invoice; every other customer type prints a thermal receipt. */
function isBigCustomer(bill: Bill): boolean {
  return bill.customerType === ECustomerType.BigCustomer;
}

const CREDIT_TERMS_LABEL: Record<string, string> = {
  before_delivery: 'Before Delivery',
  after_delivery: 'After Delivery',
  half: 'Half Payment',
  cod: 'Cash on Delivery',
};

@QueryHandlerStrict(ExportBillQuery)
export class ExportBillQueryHandler implements IQueryHandler<ExportBillQuery, PdfDocument> {
  constructor(
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    @Inject(ORGANIZATION_REPO) private readonly organizationRepo: IOrganizationRepo,
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @Inject(CUSTOMER_REPO) private readonly customerRepo: ICustomerRepo,
    @Inject(PDF_EXPORT_SERVICE) private readonly pdfService: IPdfExportService,
    @InjectPinoLogger(ExportBillQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ExportBillQuery): Promise<PdfDocument> {
    this.logger.info(`Executing Query "${ExportBillQuery.name}"`);

    const bill: Bill = await this.billRepo.getAsync(query.id);
    const organization = await this.organizationRepo.getAsync(bill.organizationId);
    const filename = `bill-${bill.billNumber}.pdf`;
    const servedBy = bill.createdById ? await this.userRepo.getAsync(bill.createdById) : null;

    if (isBigCustomer(bill)) {
      const customer = bill.customerId ? await this.customerRepo.getAsync(bill.customerId) : null;
      const context = this.buildInvoiceContext(bill, organization, servedBy, customer);
      return this.pdfService.generateFromTemplateAsync('bill-invoice', context, filename);
    }

    const context = this.buildThermalContext(bill, organization, servedBy);
    return this.pdfService.generateFromTemplateAsync('bill-thermal', context, filename, {
      width: '80mm',
    });
  }

  private buildThermalContext(
    bill: Bill,
    organization: Organization | null | undefined,
    servedBy: User | null,
  ): Record<string, unknown> {
    const servedByName = [servedBy?.firstName, servedBy?.lastName].filter(Boolean).join(' ');
    const isCash = bill.paymentMethod === EPaymentMethod.Cash;

    return {
      orgName: organization?.name ?? 'Organization',
      orgAddress: organization?.country ?? '',
      orgPhone: organization?.phone ?? '',
      billNumber: bill.billNumber,
      servedByName: servedByName || null,
      billedAt: bill.billedAt
        ? new Date(bill.billedAt).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })
        : new Date().toLocaleString('en-GB'),
      items: (bill.items ?? []).map((item: BillItem) => ({
        name: item.productId,
        quantity: item.quantity,
        rate: this.formatPlainAmount(item.unitPrice),
        amount: this.formatPlainAmount(item.lineTotal),
      })),
      subtotal: this.formatPlainAmount(bill.subtotal),
      totalAmount: this.formatPlainAmount(bill.totalAmount),
      isCash,
      paymentMethod: bill.paymentMethod ?? '',
    };
  }

  /** Thermal receipts print plain amounts (no currency symbol), matching the till-roll reference format. */
  private formatPlainAmount(value: number): string {
    return (value ?? 0).toFixed(2);
  }

  private buildInvoiceContext(
    bill: Bill,
    organization: Organization | null | undefined,
    servedBy: User | null,
    customer: Customer | null,
  ): Record<string, unknown> {
    const authorizedByName = [servedBy?.firstName, servedBy?.lastName].filter(Boolean).join(' ');

    return {
      orgName: organization?.name ?? 'Organization',
      orgAddress: organization?.country ?? '',
      orgPhone: organization?.phone ?? '',
      orgEmail: organization?.email ?? '',
      logoUrl: organization?.logoUrl ?? '',
      billNumber: bill.billNumber,
      billedAt: bill.billedAt
        ? new Date(bill.billedAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : new Date().toLocaleDateString('en-GB'),
      customerName: customer?.name ?? bill.walkInName ?? 'Customer',
      customerPhone: customer?.phone ?? bill.walkInPhone ?? '',
      creditTerms: bill.paymentTiming ? CREDIT_TERMS_LABEL[bill.paymentTiming] ?? bill.paymentTiming : '',
      authorizedByName: authorizedByName || null,
      items: (bill.items ?? []).map((item: BillItem, index: number) => ({
        no: index + 1,
        name: item.productId,
        quantity: item.quantity,
        price: this.formatPlainAmount(item.unitPrice),
        discount: this.formatPlainAmount(item.discountAmount),
        taxRate: item.taxRate ?? 0,
        amount: this.formatPlainAmount(item.lineTotal),
      })),
      subtotal: this.formatPlainAmount(bill.subtotal),
      taxAmount: this.formatPlainAmount(bill.taxAmount),
      discountAmount: this.formatPlainAmount(bill.discountAmount),
      totalAmount: this.formatPlainAmount(bill.totalAmount),
    };
  }
}
