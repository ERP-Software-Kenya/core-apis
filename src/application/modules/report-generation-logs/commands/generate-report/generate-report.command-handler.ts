import { Inject } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { REPORT_GENERATION_LOG_REPO, IReportGenerationLogRepo } from '../../i-report-generation-log.repo';
import { ReportGenerationLog, EReportType, EReportPeriod, REPORT_TYPE_LABELS } from '../../domain';
import { GenerateReportCommand } from './generate-report.command';

interface TemplateContext {
  title: string;
  description: string;
  reportPeriod: string;
  fromDateLabel: string;
  toDateLabel: string;
  orgId: string;
  reportType: string;
  fromDate: string;
  toDate: string;
  note?: string;
  formattedValue?: string;
  summaryCards?: Array<{ label: string; value: string }>;
  tableHeaders?: string[];
  tableRows?: string[][];
  records?: Array<Record<string, unknown>>;
}

type QueryRunner = ReturnType<DataSource['createQueryRunner']>;

@CommandHandlerStrict(GenerateReportCommand)
export class GenerateReportCommandHandler implements ICommandHandler<GenerateReportCommand, ReportGenerationLog> {
  constructor(
    @Inject(REPORT_GENERATION_LOG_REPO) private readonly repo: IReportGenerationLogRepo,
    @Inject(DataSource) private readonly dataSource: DataSource,
    @InjectPinoLogger(GenerateReportCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: GenerateReportCommand): Promise<ReportGenerationLog> {
    this.logger.info(`Executing Command "${GenerateReportCommand.name}"`);

    const fromDate = new Date(command.fromDate);
    const toDate   = new Date(command.toDate);
    toDate.setHours(23, 59, 59, 999);

    const reportName = this.buildReportName(command.reportType, command.reportPeriod, fromDate, toDate);

    const log            = new ReportGenerationLog();
    log.orgId            = command.orgId;
    log.reportType       = command.reportType;
    log.reportPeriod     = command.reportPeriod;
    log.reportName       = reportName;
    log.fromDate         = fromDate;
    log.toDate           = toDate;
    log.locationId       = command.locationId;
    log.generatedById    = command.generatedById;
    log.status           = 'PROCESSING';

    const saved = await this.repo.createAsync(log);

    try {
      const ctx = await this.buildTemplateContext(command, fromDate, toDate, reportName);

      const updatable        = new ReportGenerationLog();
      updatable.id           = saved.id;
      updatable.status       = 'COMPLETED';
      updatable.reportData   = ctx as unknown as Record<string, unknown>;

      return this.repo.updateAsync(updatable);
    } catch (err) {
      const error = err as Error;
      this.logger.error({ err: error.message }, 'Report aggregation failed');

      const updatable          = new ReportGenerationLog();
      updatable.id             = saved.id;
      updatable.status         = 'FAILED';
      updatable.errorMessage   = error.message;

      return this.repo.updateAsync(updatable);
    }
  }

  private buildReportName(type: EReportType, period: EReportPeriod, from: Date, to: Date): string {
    const label = REPORT_TYPE_LABELS[type] ?? type;
    const fmt   = (dt: Date): string => dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    switch (period) {
      case EReportPeriod.Daily:   return `${label} — Daily (${fmt(from)})`;
      case EReportPeriod.Monthly: return `${label} — ${from.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`;
      case EReportPeriod.Yearly:  return `${label} — FY ${from.getFullYear()}–${to.getFullYear()}`;
      case EReportPeriod.Custom:  return `${label} — ${fmt(from)} to ${fmt(to)}`;
    }
  }

  private fmt(dt: Date): string {
    return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  private inr(value: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);
  }

  private async buildTemplateContext(
    command: GenerateReportCommand,
    from: Date,
    to: Date,
    reportName: string,
  ): Promise<TemplateContext> {
    const orgId      = command.orgId;
    const locationId = command.locationId ?? null;
    const qr         = this.dataSource.createQueryRunner();

    const locFilter     = locationId ? `AND location_id = '${locationId}'` : '';
    const locBillFilter = locationId ? `AND b.location_id = '${locationId}'` : '';
    const fromIso       = from.toISOString();
    const toIso         = to.toISOString();

    const base: Omit<TemplateContext, 'formattedValue' | 'tableHeaders' | 'tableRows' | 'summaryCards' | 'note'> = {
      title:         reportName,
      description:   REPORT_TYPE_DESCRIPTIONS[command.reportType] ?? '',
      reportPeriod:  command.reportPeriod,
      fromDateLabel: this.fmt(from),
      toDateLabel:   this.fmt(to),
      orgId,
      reportType:    command.reportType,
      fromDate:      fromIso,
      toDate:        toIso,
    };

    try {
      switch (command.reportType) {
        case EReportType.TotalSales: {
          const rows = await this.billRecords(qr, orgId, fromIso, toIso, locationId);
          const val = this.sum(rows, 'totalAmount');
          return { ...base, formattedValue: this.inr(val), summaryCards: [{ label: 'Sales Records', value: String(rows.length) }], ...this.billTable(rows) };
        }

        case EReportType.CashSales: {
          const rows = await this.billRecords(qr, orgId, fromIso, toIso, locationId, [`b.payment_method = 'CASH'`]);
          const val = this.sum(rows, 'totalAmount');
          return { ...base, formattedValue: this.inr(val), summaryCards: [{ label: 'Cash Bills', value: String(rows.length) }], ...this.billTable(rows) };
        }

        case EReportType.CreditSales: {
          const rows = await this.billRecords(qr, orgId, fromIso, toIso, locationId, [`b.sale_type = 'credit'`]);
          const val = this.sum(rows, 'totalAmount');
          return { ...base, formattedValue: this.inr(val), summaryCards: [{ label: 'Credit Bills', value: String(rows.length) }], ...this.billTable(rows) };
        }

        case EReportType.TotalBills: {
          const rows = await this.billRecords(qr, orgId, fromIso, toIso, locationId);
          return { ...base, formattedValue: String(rows.length), ...this.billTable(rows) };
        }

        case EReportType.AverageBillValue: {
          const rows = await this.billRecords(qr, orgId, fromIso, toIso, locationId);
          const total = this.sum(rows, 'totalAmount');
          return { ...base, formattedValue: this.inr(rows.length > 0 ? total / rows.length : 0), summaryCards: [{ label: 'Total Sales', value: this.inr(total) }, { label: 'Bills', value: String(rows.length) }], ...this.billTable(rows) };
        }

        case EReportType.TimeWiseSales: {
          const rows = await qr.query(`SELECT EXTRACT(HOUR FROM billed_at) AS hour, COALESCE(SUM(total_amount),0) AS total FROM core.bills WHERE organization_id='${orgId}' AND status='COMPLETED' ${locBillFilter} AND billed_at BETWEEN '${fromIso}' AND '${toIso}' GROUP BY hour ORDER BY hour`) as Array<Record<string, unknown>>;
          return { ...base, records: rows, tableHeaders: ['Hour', 'Total Sales'], tableRows: rows.map(rr => [`${rr['hour']}:00`, this.inr(Number(rr['total']))]) };
        }

        case EReportType.TopSellingProducts: {
          const rows = await qr.query(`SELECT bi.product_id, SUM(bi.quantity) AS qty_sold, SUM(bi.line_total) AS revenue FROM core.bill_items bi JOIN core.bills b ON b.id = bi.bill_id WHERE b.organization_id='${orgId}' AND b.status='COMPLETED' ${locBillFilter} AND b.billed_at BETWEEN '${fromIso}' AND '${toIso}' GROUP BY bi.product_id ORDER BY qty_sold DESC LIMIT 20`) as Array<Record<string, unknown>>;
          return { ...base, records: rows, tableHeaders: ['Product ID', 'Qty Sold', 'Revenue'], tableRows: rows.map(rr => [String(rr['product_id']), String(rr['qty_sold']), this.inr(Number(rr['revenue']))]) };
        }

        case EReportType.SlowMovingProducts: {
          const rows = await qr.query(`SELECT bi.product_id, COALESCE(SUM(bi.quantity),0) AS qty_sold FROM core.bill_items bi JOIN core.bills b ON b.id = bi.bill_id WHERE b.organization_id='${orgId}' AND b.status='COMPLETED' ${locBillFilter} AND b.billed_at BETWEEN '${fromIso}' AND '${toIso}' GROUP BY bi.product_id ORDER BY qty_sold ASC LIMIT 20`) as Array<Record<string, unknown>>;
          return { ...base, records: rows, tableHeaders: ['Product ID', 'Qty Sold'], tableRows: rows.map(rr => [String(rr['product_id']), String(rr['qty_sold'])]) };
        }

        case EReportType.TotalExpense: {
          const rows = await this.expenseRecords(qr, orgId, fromIso, toIso, locationId);
          return { ...base, formattedValue: this.inr(this.sum(rows, 'amount')), summaryCards: [{ label: 'Expense Records', value: String(rows.length) }], ...this.expenseTable(rows) };
        }

        case EReportType.ShopExpense: {
          const rows = await this.expenseRecords(qr, orgId, fromIso, toIso, locationId, [`e.category = 'shop'`]);
          return { ...base, formattedValue: this.inr(this.sum(rows, 'amount')), summaryCards: [{ label: 'Expense Records', value: String(rows.length) }], ...this.expenseTable(rows) };
        }

        case EReportType.OtherExpense: {
          const rows = await this.expenseRecords(qr, orgId, fromIso, toIso, locationId, [`e.category != 'shop'`]);
          return { ...base, formattedValue: this.inr(this.sum(rows, 'amount')), summaryCards: [{ label: 'Expense Records', value: String(rows.length) }], ...this.expenseTable(rows) };
        }

        case EReportType.OpeningCash: {
          const rows = await this.paymentRecords(qr, orgId, undefined, fromIso, [`pt.method = 'CASH'`, `pt.type = 'payment'`, `pt.status = 'completed'`]);
          return { ...base, formattedValue: this.inr(this.sum(rows, 'amount')), summaryCards: [{ label: 'Cash Transactions', value: String(rows.length) }], ...this.paymentTable(rows) };
        }

        case EReportType.ClosingCash: {
          const rows = await this.paymentRecords(qr, orgId, undefined, toIso, [`pt.method = 'CASH'`, `pt.type = 'payment'`, `pt.status = 'completed'`]);
          return { ...base, formattedValue: this.inr(this.sum(rows, 'amount')), summaryCards: [{ label: 'Cash Transactions', value: String(rows.length) }], ...this.paymentTable(rows) };
        }

        case EReportType.TotalPurchase: {
          const rows = await this.purchaseRecords(qr, orgId, fromIso, toIso, locationId, [`po.status IN ('received','partially_allocated','allocated')`]);
          return { ...base, formattedValue: this.inr(this.sum(rows, 'totalAmount')), summaryCards: [{ label: 'Purchase Orders', value: String(rows.length) }], ...this.purchaseTable(rows) };
        }

        case EReportType.PurchaseReturn: {
          const rows = await this.returnRecords(qr, orgId, fromIso, toIso, locationId, [`ir.return_type = 'supplier'`]);
          return { ...base, formattedValue: this.inr(this.sum(rows, 'totalAmount')), summaryCards: [{ label: 'Return Records', value: String(rows.length) }], ...this.returnTable(rows) };
        }

        case EReportType.TotalProfit: {
          const rows = await this.billRecords(qr, orgId, fromIso, toIso, locationId);
          const sales = this.sum(rows, 'totalAmount');
          const cost  = Number(await this.scalar(qr, `SELECT COALESCE(SUM(bi.quantity * p.cost_price),0) FROM core.bill_items bi JOIN core.bills b ON b.id=bi.bill_id JOIN core.products p ON p.id=bi.product_id WHERE b.organization_id='${orgId}' AND b.status='COMPLETED' ${locBillFilter} AND b.billed_at BETWEEN '${fromIso}' AND '${toIso}'`));
          return { ...base, formattedValue: this.inr(sales - cost), summaryCards: [{ label: 'Revenue', value: this.inr(sales) }, { label: 'COGS', value: this.inr(cost) }, { label: 'Gross Profit', value: this.inr(sales - cost) }], ...this.billTable(rows) };
        }

        case EReportType.NetProfit: {
          const rows = await this.billRecords(qr, orgId, fromIso, toIso, locationId);
          const sales = this.sum(rows, 'totalAmount');
          const cost     = Number(await this.scalar(qr, `SELECT COALESCE(SUM(bi.quantity * p.cost_price),0) FROM core.bill_items bi JOIN core.bills b ON b.id=bi.bill_id JOIN core.products p ON p.id=bi.product_id WHERE b.organization_id='${orgId}' AND b.status='COMPLETED' ${locBillFilter} AND b.billed_at BETWEEN '${fromIso}' AND '${toIso}'`));
          const expenses = Number(await this.scalar(qr, `SELECT COALESCE(SUM(amount),0) FROM core.expenses WHERE org_id='${orgId}' ${locFilter} AND expense_date BETWEEN '${fromIso}' AND '${toIso}'`));
          return { ...base, formattedValue: this.inr(sales - cost - expenses), summaryCards: [{ label: 'Revenue', value: this.inr(sales) }, { label: 'COGS', value: this.inr(cost) }, { label: 'Expenses', value: this.inr(expenses) }, { label: 'Net Profit', value: this.inr(sales - cost - expenses) }], ...this.billTable(rows) };
        }

        case EReportType.ClosingStock: {
          const rows = await qr.query(`SELECT inv.product_id, inv.location_id, inv.quantity_on_hand FROM core.inventory inv WHERE inv.organization_id='${orgId}' ${locationId ? `AND inv.location_id='${locationId}'` : ''} ORDER BY inv.quantity_on_hand DESC LIMIT 50`) as Array<Record<string, unknown>>;
          const total = rows.reduce((acc, rr) => acc + Number(rr['quantity_on_hand'] ?? 0), 0);
          return { ...base, records: rows, formattedValue: String(Math.round(total)), summaryCards: [{ label: 'Total Items', value: String(rows.length) }, { label: 'Total Qty', value: String(Math.round(total)) }], tableHeaders: ['Product ID', 'Location ID', 'Qty On Hand'], tableRows: rows.map(rr => [String(rr['product_id']), String(rr['location_id']), String(rr['quantity_on_hand'])]) };
        }

        case EReportType.LowStockItems: {
          const rows = await qr.query(`SELECT inv.product_id, inv.location_id, inv.quantity_on_hand, inv.reorder_level FROM core.inventory inv WHERE inv.organization_id='${orgId}' AND inv.quantity_on_hand <= inv.reorder_level AND inv.reorder_level > 0 ${locationId ? `AND inv.location_id='${locationId}'` : ''} ORDER BY (inv.quantity_on_hand - inv.reorder_level) ASC`) as Array<Record<string, unknown>>;
          return { ...base, records: rows, formattedValue: String(rows.length), tableHeaders: ['Product ID', 'Location', 'Qty On Hand', 'Reorder Level'], tableRows: rows.map(rr => [String(rr['product_id']), String(rr['location_id']), String(rr['quantity_on_hand']), String(rr['reorder_level'])]) };
        }

        case EReportType.OutOfStockItems: {
          const rows = await qr.query(`SELECT inv.product_id, inv.location_id FROM core.inventory inv WHERE inv.organization_id='${orgId}' AND inv.quantity_on_hand <= 0 ${locationId ? `AND inv.location_id='${locationId}'` : ''}`) as Array<Record<string, unknown>>;
          return { ...base, records: rows, formattedValue: String(rows.length), tableHeaders: ['Product ID', 'Location ID'], tableRows: rows.map(rr => [String(rr['product_id']), String(rr['location_id'])]) };
        }

        case EReportType.DamagedStock: {
          const rows = await qr.query(`SELECT sm.product_id, sm.location_id, SUM(sm.quantity) AS qty_damaged FROM core.stock_movements sm WHERE sm.movement_type='damage' ${locationId ? `AND sm.location_id='${locationId}'` : ''} AND sm.created_at BETWEEN '${fromIso}' AND '${toIso}' GROUP BY sm.product_id, sm.location_id`) as Array<Record<string, unknown>>;
          const total = rows.reduce((acc, rr) => acc + Number(rr['qty_damaged'] ?? 0), 0);
          return { ...base, records: rows, formattedValue: String(Math.round(total)), tableHeaders: ['Product ID', 'Location', 'Qty Damaged'], tableRows: rows.map(rr => [String(rr['product_id']), String(rr['location_id']), String(rr['qty_damaged'])]) };
        }

        case EReportType.ReturnedItems: {
          const rows = await this.returnRecords(qr, orgId, fromIso, toIso, locationId);
          return { ...base, formattedValue: this.inr(this.sum(rows, 'totalAmount')), summaryCards: [{ label: 'Return Records', value: String(rows.length) }], ...this.returnTable(rows) };
        }

        case EReportType.TotalCustomers: {
          const rows = await this.customerRecords(qr, orgId, fromIso, toIso, locationId, false);
          return { ...base, formattedValue: String(rows.length), ...this.customerTable(rows) };
        }

        case EReportType.NewCustomers: {
          const rows = await qr.query(
            `SELECT c.id, c.name, c.phone, c.credit_balance AS "creditBalance", c.created_at AS "createdAt"
             FROM core.customers c
             WHERE c.organization_id = $1 AND c.created_at BETWEEN $2 AND $3
             ORDER BY c.created_at DESC
             LIMIT 500`,
            [orgId, fromIso, toIso],
          ) as Array<Record<string, unknown>>;
          return { ...base, formattedValue: String(rows.length), ...this.customerTable(rows) };
        }

        case EReportType.RepeatCustomers: {
          const rows = await this.customerRecords(qr, orgId, fromIso, toIso, locationId, true);
          return { ...base, formattedValue: String(rows.length), ...this.customerTable(rows, true) };
        }

        case EReportType.CreditGiven: {
          const rows = await this.creditRecords(qr, orgId, fromIso, toIso, locationId, [`cct.type = 'credit_sale'`]);
          return { ...base, formattedValue: this.inr(this.sum(rows, 'amount')), summaryCards: [{ label: 'Credit Records', value: String(rows.length) }], ...this.creditTable(rows) };
        }

        case EReportType.CreditReceived: {
          const rows = await this.creditRecords(qr, orgId, fromIso, toIso, locationId, [`cct.type = 'payment'`]);
          return { ...base, formattedValue: this.inr(this.sum(rows, 'amount')), summaryCards: [{ label: 'Payment Records', value: String(rows.length) }], ...this.creditTable(rows) };
        }

        case EReportType.PendingCredit: {
          const rows = await qr.query(
            `SELECT c.id, c.name, c.phone, c.credit_balance AS "creditBalance", c.created_at AS "createdAt"
             FROM core.customers c
             WHERE c.organization_id = $1 AND c.credit_balance > 0
             ORDER BY c.credit_balance DESC
             LIMIT 500`,
            [orgId],
          ) as Array<Record<string, unknown>>;
          const total = this.sum(rows, 'creditBalance');
          return { ...base, formattedValue: this.inr(total), ...this.customerTable(rows) };
        }

        case EReportType.SupplierPayment: {
          const rows = await this.paymentRecords(qr, orgId, fromIso, toIso, [`pt.reference_type = 'purchase_order'`]);
          return { ...base, formattedValue: this.inr(this.sum(rows, 'amount')), summaryCards: [{ label: 'Payment Records', value: String(rows.length) }], ...this.paymentTable(rows) };
        }

        case EReportType.PendingSupplierPayment: {
          const rows = await this.purchaseRecords(qr, orgId, undefined, undefined, locationId, [`po.status NOT IN ('received','partially_allocated','allocated','cancelled')`]);
          return { ...base, formattedValue: this.inr(this.sum(rows, 'totalAmount')), ...this.purchaseTable(rows) };
        }

        case EReportType.StaffAttendance:
          return { ...base, formattedValue: 'N/A', note: 'Staff attendance data requires integration with an HR/attendance module. This data is not currently tracked in the ERP schema.' };

        case EReportType.WeeklyComparison: {
          const rows = await qr.query(`SELECT DATE_TRUNC('week', billed_at) AS week_start, COALESCE(SUM(total_amount),0) AS total, COUNT(*) AS bills FROM core.bills WHERE organization_id='${orgId}' AND status='COMPLETED' ${locBillFilter} AND billed_at BETWEEN '${fromIso}' AND '${toIso}' GROUP BY week_start ORDER BY week_start`) as Array<Record<string, unknown>>;
          return { ...base, records: rows, tableHeaders: ['Week Starting', 'Total Sales', 'Number of Bills'], tableRows: rows.map(rr => [new Date(String(rr['week_start'])).toLocaleDateString('en-IN'), this.inr(Number(rr['total'])), String(rr['bills'])]) };
        }

        default:
          return { ...base, note: 'Report data not available for this type.' };
      }
    } finally {
      await qr.release();
    }
  }

  private async scalar(qr: QueryRunner, sql: string): Promise<unknown> {
    const result = await qr.query(sql) as Array<Record<string, unknown>>;
    if (!result.length) return 0;
    return Object.values(result[0])[0] ?? 0;
  }

  private sum(rows: Array<Record<string, unknown>>, key: string): number {
    return rows.reduce((acc, row) => acc + Number(row[key] ?? 0), 0);
  }

  private dateLabel(value: unknown): string {
    if (!value) return '';
    return new Date(String(value)).toLocaleDateString('en-IN');
  }

  private shortId(value: unknown): string {
    const id = String(value ?? '');
    return id.length > 8 ? `${id.substring(0, 8)}...` : id;
  }

  private async billRecords(
    qr: QueryRunner,
    orgId: string,
    fromIso: string,
    toIso: string,
    locationId?: string | null,
    extraConditions: string[] = [],
  ): Promise<Array<Record<string, unknown>>> {
    const params: unknown[] = [orgId, fromIso, toIso];
    const locationFilter = locationId ? `AND b.location_id = $${params.push(locationId)}` : '';
    return qr.query(
      `SELECT
         b.id,
         b.bill_number AS "billNumber",
         b.location_id AS "locationId",
         l.name AS "locationName",
         b.customer_id AS "customerId",
         COALESCE(c.name, b.walk_in_name, 'Walk-in') AS "customerName",
         b.payment_method AS "paymentMethod",
         b.sale_type AS "saleType",
         b.subtotal,
         b.tax_amount AS "taxAmount",
         b.discount_amount AS "discountAmount",
         b.total_amount AS "totalAmount",
         b.billed_at AS "billedAt",
         COUNT(bi.id)::int AS "itemCount"
       FROM core.bills b
       LEFT JOIN core.locations l ON l.id = b.location_id
       LEFT JOIN core.customers c ON c.id = b.customer_id
       LEFT JOIN core.bill_items bi ON bi.bill_id = b.id
       WHERE b.organization_id = $1
         AND b.status = 'COMPLETED'
         ${locationFilter}
         AND b.billed_at BETWEEN $2 AND $3
         ${extraConditions.length ? `AND ${extraConditions.join(' AND ')}` : ''}
       GROUP BY b.id, l.name, c.name
       ORDER BY b.billed_at DESC
       LIMIT 500`,
      params,
    ) as Promise<Array<Record<string, unknown>>>;
  }

  private billTable(rows: Array<Record<string, unknown>>): Pick<TemplateContext, 'records' | 'tableHeaders' | 'tableRows'> {
    return {
      records: rows,
      tableHeaders: ['Bill No.', 'Date', 'Customer', 'Location', 'Payment', 'Sale Type', 'Items', 'Amount'],
      tableRows: rows.map(row => [
        String(row.billNumber ?? this.shortId(row.id)),
        this.dateLabel(row.billedAt),
        String(row.customerName ?? ''),
        String(row.locationName ?? this.shortId(row.locationId)),
        String(row.paymentMethod ?? ''),
        String(row.saleType ?? ''),
        String(row.itemCount ?? 0),
        this.inr(Number(row.totalAmount ?? 0)),
      ]),
    };
  }

  private async expenseRecords(
    qr: QueryRunner,
    orgId: string,
    fromIso: string,
    toIso: string,
    locationId?: string | null,
    extraConditions: string[] = [],
  ): Promise<Array<Record<string, unknown>>> {
    const params: unknown[] = [orgId, fromIso, toIso];
    const locationFilter = locationId ? `AND e.location_id = $${params.push(locationId)}` : '';
    return qr.query(
      `SELECT
         e.id,
         e.location_id AS "locationId",
         l.name AS "locationName",
         e.category,
         e.amount,
         e.status,
         e.description,
         e.submitted_by AS "submittedBy",
         e.expense_date AS "expenseDate"
       FROM core.expenses e
       LEFT JOIN core.locations l ON l.id = e.location_id
       WHERE e.org_id = $1
         ${locationFilter}
         AND e.expense_date BETWEEN $2 AND $3
         ${extraConditions.length ? `AND ${extraConditions.join(' AND ')}` : ''}
       ORDER BY e.expense_date DESC
       LIMIT 500`,
      params,
    ) as Promise<Array<Record<string, unknown>>>;
  }

  private expenseTable(rows: Array<Record<string, unknown>>): Pick<TemplateContext, 'records' | 'tableHeaders' | 'tableRows'> {
    return {
      records: rows,
      tableHeaders: ['Date', 'Category', 'Description', 'Location', 'Status', 'Amount'],
      tableRows: rows.map(row => [
        this.dateLabel(row.expenseDate),
        String(row.category ?? ''),
        String(row.description ?? ''),
        String(row.locationName ?? this.shortId(row.locationId)),
        String(row.status ?? ''),
        this.inr(Number(row.amount ?? 0)),
      ]),
    };
  }

  private async purchaseRecords(
    qr: QueryRunner,
    orgId: string,
    fromIso?: string,
    toIso?: string,
    locationId?: string | null,
    extraConditions: string[] = [],
  ): Promise<Array<Record<string, unknown>>> {
    const params: unknown[] = [orgId];
    const dateFilter = fromIso && toIso ? `AND po.created_at BETWEEN $${params.push(fromIso)} AND $${params.push(toIso)}` : '';
    const locationFilter = locationId
      ? `AND EXISTS (
          SELECT 1
          FROM core.purchase_item_allocations pia
          WHERE pia.purchase_order_id = po.id
            AND pia.location_id = $${params.push(locationId)}
        )`
      : '';

    return qr.query(
      `SELECT
         po.id,
         po.po_number AS "poNumber",
         po.supplier_id AS "supplierId",
         s.name AS "supplierName",
         po.status,
         po.total_amount AS "totalAmount",
         po.expected_at AS "expectedAt",
         po.received_at AS "receivedAt",
         po.created_at AS "createdAt",
         COUNT(pi.id)::int AS "itemCount"
       FROM core.purchase_orders po
       LEFT JOIN core.suppliers s ON s.id = po.supplier_id
       LEFT JOIN core.purchase_items pi ON pi.purchase_order_id = po.id
       WHERE po.organization_id = $1
         ${dateFilter}
         ${locationFilter}
         ${extraConditions.length ? `AND ${extraConditions.join(' AND ')}` : ''}
       GROUP BY po.id, s.name
       ORDER BY po.created_at DESC
       LIMIT 500`,
      params,
    ) as Promise<Array<Record<string, unknown>>>;
  }

  private purchaseTable(rows: Array<Record<string, unknown>>): Pick<TemplateContext, 'records' | 'tableHeaders' | 'tableRows'> {
    return {
      records: rows,
      tableHeaders: ['PO No.', 'Date', 'Supplier', 'Status', 'Items', 'Amount'],
      tableRows: rows.map(row => [
        String(row.poNumber ?? this.shortId(row.id)),
        this.dateLabel(row.createdAt),
        String(row.supplierName ?? this.shortId(row.supplierId)),
        String(row.status ?? ''),
        String(row.itemCount ?? 0),
        this.inr(Number(row.totalAmount ?? 0)),
      ]),
    };
  }

  private async returnRecords(
    qr: QueryRunner,
    orgId: string,
    fromIso: string,
    toIso: string,
    locationId?: string | null,
    extraConditions: string[] = [],
  ): Promise<Array<Record<string, unknown>>> {
    const params: unknown[] = [orgId, fromIso, toIso];
    const locationFilter = locationId ? `AND ir.location_id = $${params.push(locationId)}` : '';
    return qr.query(
      `SELECT
         ir.id,
         ir.location_id AS "locationId",
         l.name AS "locationName",
         ir.order_id AS "orderId",
         ir.supplier_id AS "supplierId",
         s.name AS "supplierName",
         ir.return_type AS "returnType",
         ir.status,
         ir.total_amount AS "totalAmount",
         ir.created_at AS "createdAt"
       FROM core.item_returns ir
       JOIN core.locations l ON l.id = ir.location_id
       LEFT JOIN core.suppliers s ON s.id = ir.supplier_id
       WHERE l.organization_id = $1
         ${locationFilter}
         AND ir.created_at BETWEEN $2 AND $3
         ${extraConditions.length ? `AND ${extraConditions.join(' AND ')}` : ''}
       ORDER BY ir.created_at DESC
       LIMIT 500`,
      params,
    ) as Promise<Array<Record<string, unknown>>>;
  }

  private returnTable(rows: Array<Record<string, unknown>>): Pick<TemplateContext, 'records' | 'tableHeaders' | 'tableRows'> {
    return {
      records: rows,
      tableHeaders: ['Return ID', 'Date', 'Type', 'Location', 'Supplier', 'Status', 'Amount'],
      tableRows: rows.map(row => [
        this.shortId(row.id),
        this.dateLabel(row.createdAt),
        String(row.returnType ?? ''),
        String(row.locationName ?? this.shortId(row.locationId)),
        String(row.supplierName ?? this.shortId(row.supplierId)),
        String(row.status ?? ''),
        this.inr(Number(row.totalAmount ?? 0)),
      ]),
    };
  }

  private async customerRecords(
    qr: QueryRunner,
    orgId: string,
    fromIso: string,
    toIso: string,
    locationId?: string | null,
    repeatOnly = false,
  ): Promise<Array<Record<string, unknown>>> {
    const params: unknown[] = [orgId, fromIso, toIso];
    const locationFilter = locationId ? `AND b.location_id = $${params.push(locationId)}` : '';
    return qr.query(
      `SELECT
         c.id,
         c.name,
         c.phone,
         c.credit_balance AS "creditBalance",
         MIN(b.billed_at) AS "firstBillAt",
         MAX(b.billed_at) AS "lastBillAt",
         COUNT(b.id)::int AS "billCount",
         COALESCE(SUM(b.total_amount), 0) AS "totalSales"
       FROM core.customers c
       JOIN core.bills b ON b.customer_id = c.id
       WHERE c.organization_id = $1
         AND b.organization_id = $1
         AND b.status = 'COMPLETED'
         ${locationFilter}
         AND b.billed_at BETWEEN $2 AND $3
       GROUP BY c.id
       ${repeatOnly ? 'HAVING COUNT(b.id) > 1' : ''}
       ORDER BY "totalSales" DESC
       LIMIT 500`,
      params,
    ) as Promise<Array<Record<string, unknown>>>;
  }

  private customerTable(rows: Array<Record<string, unknown>>, includeSales = false): Pick<TemplateContext, 'records' | 'tableHeaders' | 'tableRows'> {
    return {
      records: rows,
      tableHeaders: includeSales
        ? ['Customer', 'Phone', 'Bills', 'Total Sales', 'Credit Balance', 'Last Bill']
        : ['Customer', 'Phone', 'Credit Balance', 'Created / Last Bill'],
      tableRows: rows.map(row => includeSales
        ? [
            String(row.name ?? this.shortId(row.id)),
            String(row.phone ?? ''),
            String(row.billCount ?? 0),
            this.inr(Number(row.totalSales ?? 0)),
            this.inr(Number(row.creditBalance ?? 0)),
            this.dateLabel(row.lastBillAt),
          ]
        : [
            String(row.name ?? this.shortId(row.id)),
            String(row.phone ?? ''),
            this.inr(Number(row.creditBalance ?? 0)),
            this.dateLabel(row.createdAt ?? row.lastBillAt),
          ]),
    };
  }

  private async creditRecords(
    qr: QueryRunner,
    orgId: string,
    fromIso: string,
    toIso: string,
    locationId?: string | null,
    extraConditions: string[] = [],
  ): Promise<Array<Record<string, unknown>>> {
    const params: unknown[] = [orgId, fromIso, toIso];
    const locationFilter = locationId ? `AND b.location_id = $${params.push(locationId)}` : '';
    return qr.query(
      `SELECT
         cct.id,
         cct.customer_id AS "customerId",
         c.name AS "customerName",
         cct.bill_id AS "billId",
         b.bill_number AS "billNumber",
         cct.type,
         cct.amount,
         cct.balance_before AS "balanceBefore",
         cct.balance_after AS "balanceAfter",
         cct.payment_method AS "paymentMethod",
         cct.note,
         cct.created_at AS "createdAt"
       FROM core.customer_credit_transactions cct
       JOIN core.customers c ON c.id = cct.customer_id
       LEFT JOIN core.bills b ON b.id = cct.bill_id
       WHERE c.organization_id = $1
         ${locationFilter}
         AND cct.created_at BETWEEN $2 AND $3
         ${extraConditions.length ? `AND ${extraConditions.join(' AND ')}` : ''}
       ORDER BY cct.created_at DESC
       LIMIT 500`,
      params,
    ) as Promise<Array<Record<string, unknown>>>;
  }

  private creditTable(rows: Array<Record<string, unknown>>): Pick<TemplateContext, 'records' | 'tableHeaders' | 'tableRows'> {
    return {
      records: rows,
      tableHeaders: ['Date', 'Customer', 'Bill No.', 'Type', 'Method', 'Amount', 'Balance After'],
      tableRows: rows.map(row => [
        this.dateLabel(row.createdAt),
        String(row.customerName ?? this.shortId(row.customerId)),
        String(row.billNumber ?? this.shortId(row.billId)),
        String(row.type ?? ''),
        String(row.paymentMethod ?? ''),
        this.inr(Number(row.amount ?? 0)),
        this.inr(Number(row.balanceAfter ?? 0)),
      ]),
    };
  }

  private async paymentRecords(
    qr: QueryRunner,
    orgId: string,
    fromIso?: string,
    toIso?: string,
    extraConditions: string[] = [],
  ): Promise<Array<Record<string, unknown>>> {
    const params: unknown[] = [orgId];
    const dateFilter = fromIso && toIso
      ? `AND pt.created_at BETWEEN $${params.push(fromIso)} AND $${params.push(toIso)}`
      : toIso
        ? `AND pt.created_at <= $${params.push(toIso)}`
        : '';
    return qr.query(
      `SELECT
         pt.id,
         pt.reference_id AS "referenceId",
         pt.reference_type AS "referenceType",
         pt.type,
         pt.method,
         pt.amount,
         pt.status,
         pt.created_at AS "createdAt"
       FROM core.payment_transactions pt
       WHERE pt.org_id = $1
         ${dateFilter}
         ${extraConditions.length ? `AND ${extraConditions.join(' AND ')}` : ''}
       ORDER BY pt.created_at DESC
       LIMIT 500`,
      params,
    ) as Promise<Array<Record<string, unknown>>>;
  }

  private paymentTable(rows: Array<Record<string, unknown>>): Pick<TemplateContext, 'records' | 'tableHeaders' | 'tableRows'> {
    return {
      records: rows,
      tableHeaders: ['Date', 'Reference Type', 'Reference ID', 'Type', 'Method', 'Status', 'Amount'],
      tableRows: rows.map(row => [
        this.dateLabel(row.createdAt),
        String(row.referenceType ?? ''),
        this.shortId(row.referenceId),
        String(row.type ?? ''),
        String(row.method ?? ''),
        String(row.status ?? ''),
        this.inr(Number(row.amount ?? 0)),
      ]),
    };
  }
}

const REPORT_TYPE_DESCRIPTIONS: Partial<Record<EReportType, string>> = {
  [EReportType.TotalSales]:             'Sum of all completed bill totals in the selected period.',
  [EReportType.CashSales]:              'Bills where the payment method was Cash.',
  [EReportType.CreditSales]:            'Bills where payment was deferred on credit.',
  [EReportType.TotalBills]:             'Count of all completed bills in the period.',
  [EReportType.AverageBillValue]:       'Total sales divided by the number of bills.',
  [EReportType.TimeWiseSales]:          'Hourly breakdown of sales volume.',
  [EReportType.TopSellingProducts]:     'Products ranked by quantity sold in the period.',
  [EReportType.SlowMovingProducts]:     'Products with the lowest sales volume in the period.',
  [EReportType.TotalExpense]:           'All expenses (shop + other) combined.',
  [EReportType.ShopExpense]:            'Operational store expenses in the period.',
  [EReportType.OtherExpense]:           'Miscellaneous expenses outside core operations.',
  [EReportType.OpeningCash]:            'Estimated cash balance at the start of the period.',
  [EReportType.ClosingCash]:            'Estimated cash balance at the end of the period.',
  [EReportType.TotalPurchase]:          'Total cost of received purchase orders.',
  [EReportType.PurchaseReturn]:         'Goods returned to suppliers in the period.',
  [EReportType.TotalProfit]:            'Gross profit — revenue minus cost of goods sold.',
  [EReportType.NetProfit]:              'Net profit after all expenses are deducted from gross profit.',
  [EReportType.ClosingStock]:           'Current stock levels across inventory.',
  [EReportType.LowStockItems]:          'Items at or below their reorder threshold.',
  [EReportType.OutOfStockItems]:        'Items with zero quantity on hand.',
  [EReportType.DamagedStock]:           'Stock marked as damaged in the period.',
  [EReportType.ReturnedItems]:          'Customer and supplier returns in the period.',
  [EReportType.TotalCustomers]:         'Distinct customers who transacted in the period.',
  [EReportType.NewCustomers]:           'Customers created (first purchase) in the period.',
  [EReportType.RepeatCustomers]:        'Customers with more than one bill in the period.',
  [EReportType.CreditGiven]:            'Credit extended to customers in the period.',
  [EReportType.CreditReceived]:         'Credit payments collected from customers.',
  [EReportType.PendingCredit]:          'Outstanding credit balances owed by customers.',
  [EReportType.SupplierPayment]:        'Payments made to suppliers in the period.',
  [EReportType.PendingSupplierPayment]: 'Purchase orders not yet fully paid.',
  [EReportType.StaffAttendance]:        'Staff attendance records for the period.',
  [EReportType.WeeklyComparison]:       'Week-over-week sales comparison within the period.',
};
