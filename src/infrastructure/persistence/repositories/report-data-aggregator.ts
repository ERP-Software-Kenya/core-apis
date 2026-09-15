import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';
import { BuildReportParams, EReportType, ReportData, REPORT_TYPE_LABELS } from '../../../application/modules/report-generation-logs/domain';
import { IReportDataAggregator } from '../../../application/modules/report-generation-logs/i-report-data-aggregator';

type ReportBase = Omit<ReportData, 'formattedValue' | 'tableHeaders' | 'tableRows' | 'summaryCards' | 'note'>;
type Row = Record<string, unknown>;

@Injectable()
export class ReportDataAggregator implements IReportDataAggregator {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  public async aggregate(params: BuildReportParams): Promise<ReportData> {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    try {
      return await this.dispatch(qr, params);
    } finally {
      await qr.release();
    }
  }

  private async dispatch(qr: QueryRunner, params: BuildReportParams): Promise<ReportData> {
    const { orgId, locationId, fromDate, toDate, reportName, reportType, reportPeriod } = params;
    const fromIso = fromDate.toISOString();
    const toIso   = toDate.toISOString();
    const locFilter     = locationId ? `AND location_id = '${locationId}'` : '';
    const locBillFilter = locationId ? `AND b.location_id = '${locationId}'` : '';
    const base: ReportBase = {
      title:         reportName,
      description:   REPORT_TYPE_DESCRIPTIONS[reportType] ?? '',
      reportPeriod,
      fromDateLabel: this.fmt(fromDate),
      toDateLabel:   this.fmt(toDate),
      orgId,
      reportType,
      fromDate:      fromIso,
      toDate:        toIso,
    };

    switch (reportType) {
      case EReportType.TotalSales:
        return this.aggrSales(qr, orgId, locBillFilter, fromIso, toIso, '', 'Total Bills', base);
      case EReportType.CashSales:
        return this.aggrSales(qr, orgId, locBillFilter, fromIso, toIso, "AND b.payment_method='CASH'", 'Cash Bills', base);
      case EReportType.CreditSales:
        return this.aggrSales(qr, orgId, locBillFilter, fromIso, toIso, "AND b.sale_type='credit'", 'Credit Bills', base);
      case EReportType.TotalBills:
      case EReportType.AverageBillValue:
      case EReportType.TimeWiseSales:
        return this.aggrBills(qr, orgId, locBillFilter, fromIso, toIso, reportType, base);
      case EReportType.TopSellingProducts:
      case EReportType.SlowMovingProducts:
        return this.aggrProducts(qr, orgId, locBillFilter, fromIso, toIso, reportType, base);
      case EReportType.TotalExpense:
      case EReportType.ShopExpense:
      case EReportType.OtherExpense:
        return this.aggrExpenses(qr, orgId, locFilter, fromIso, toIso, reportType, base);
      case EReportType.OpeningCash:
      case EReportType.ClosingCash:
        return this.aggrCash(qr, orgId, fromIso, toIso, reportType, base);
      case EReportType.TotalPurchase:
      case EReportType.PurchaseReturn:
        return this.aggrPurchase(qr, orgId, fromIso, toIso, reportType, base);
      case EReportType.TotalProfit:
      case EReportType.NetProfit:
        return this.aggrProfit(qr, orgId, locBillFilter, locFilter, fromIso, toIso, reportType, base);
      case EReportType.ClosingStock:
      case EReportType.LowStockItems:
      case EReportType.OutOfStockItems:
        return this.aggrStock(qr, orgId, locationId ?? null, reportType, base);
      case EReportType.DamagedStock:
      case EReportType.ReturnedItems:
        return this.aggrDamageReturns(qr, locationId ?? null, fromIso, toIso, reportType, base);
      case EReportType.TotalCustomers:
      case EReportType.NewCustomers:
      case EReportType.RepeatCustomers:
        return this.aggrCustomers(qr, orgId, locBillFilter, fromIso, toIso, reportType, base);
      case EReportType.CreditGiven:
      case EReportType.CreditReceived:
      case EReportType.PendingCredit:
        return this.aggrCredit(qr, orgId, fromIso, toIso, reportType, base);
      case EReportType.SupplierPayment:
      case EReportType.PendingSupplierPayment:
        return this.aggrSupplier(qr, orgId, locationId ?? null, fromIso, toIso, reportType, base);
      case EReportType.WeeklyComparison:
        return this.aggrWeekly(qr, orgId, locBillFilter, fromIso, toIso, base);
      default:
        return { ...base, note: 'Report data not available for this type.' };
    }
  }

  private async aggrSales(
    qr: QueryRunner, orgId: string, locBillFilter: string,
    fromIso: string, toIso: string, extraFilter: string, billCountLabel: string, base: ReportBase,
  ): Promise<ReportData> {
    const billWhere = `b.organization_id='${orgId}' AND b.status='COMPLETED' ${extraFilter} ${locBillFilter} AND b.billed_at BETWEEN '${fromIso}' AND '${toIso}'`;
    const [val, totalBills] = await Promise.all([
      this.scalar(qr, `SELECT COALESCE(SUM(total_amount),0) FROM core.bills b WHERE ${billWhere}`),
      this.scalar(qr, `SELECT COUNT(*) FROM core.bills b WHERE ${billWhere}`),
    ]);
    const revenue = Number(val);
    const count   = Number(totalBills);

    const rows = (await qr.query(`
      SELECT COALESCE(p.name,'Unnamed Item') AS product_name, COALESCE(p.sku,'—') AS sku,
             COALESCE(SUM(bi.quantity),0) AS qty_sold, COALESCE(SUM(bi.line_total),0) AS revenue
      FROM core.bill_items bi
      JOIN core.bills b ON b.id = bi.bill_id
      LEFT JOIN core.products p ON p.id = bi.product_id
      WHERE ${billWhere}
      GROUP BY p.id, p.name, p.sku ORDER BY revenue DESC LIMIT 100
    `)) as Row[];

    if (rows.length > 0) {
      const totalQty = rows.reduce((acc, rr) => acc + Number(rr['qty_sold'] ?? 0), 0);
      return {
        ...base, formattedValue: this.inr(revenue),
        summaryCards: [{ label: 'Total Revenue', value: this.inr(revenue) }, { label: billCountLabel, value: String(count) }, { label: 'Items Sold', value: String(totalQty) }],
        tableHeaders: ['Product Name', 'SKU', 'Qty Sold', 'Total Amount'],
        tableRows: rows.map(rr => [String(rr['product_name']), String(rr['sku'] || '—'), String(rr['qty_sold']), this.inr(Number(rr['revenue']))]),
      };
    }

    if (count > 0) {
      const billRows = (await qr.query(`
        SELECT b.bill_number, b.billed_at, b.payment_method, b.total_amount
        FROM core.bills b WHERE ${billWhere} ORDER BY b.billed_at DESC LIMIT 100
      `)) as Row[];
      return {
        ...base, formattedValue: this.inr(revenue),
        summaryCards: [{ label: 'Total Revenue', value: this.inr(revenue) }, { label: billCountLabel, value: String(count) }],
        tableHeaders: ['Bill Number', 'Date', 'Payment Method', 'Total Amount'],
        tableRows: billRows.map(rr => [String(rr['bill_number']), rr['billed_at'] ? this.fmt(new Date(String(rr['billed_at']))) : '—', String(rr['payment_method'] ?? '—'), this.inr(Number(rr['total_amount']))]),
      };
    }

    return {
      ...base, formattedValue: this.inr(revenue),
      summaryCards: [{ label: 'Total Revenue', value: this.inr(revenue) }, { label: billCountLabel, value: '0' }, { label: 'Items Sold', value: '0' }],
      tableHeaders: ['Product Name', 'SKU', 'Qty Sold', 'Total Amount'],
      tableRows: [],
    };
  }

  private async aggrBills(
    qr: QueryRunner, orgId: string, locBillFilter: string,
    fromIso: string, toIso: string, reportType: EReportType, base: ReportBase,
  ): Promise<ReportData> {
    const billWhere = `organization_id='${orgId}' AND status='COMPLETED' ${locBillFilter} AND billed_at BETWEEN '${fromIso}' AND '${toIso}'`;
    if (reportType === EReportType.TotalBills) {
      const val = await this.scalar(qr, `SELECT COUNT(*) FROM core.bills WHERE ${billWhere}`);
      return { ...base, formattedValue: String(Number(val)) };
    }
    if (reportType === EReportType.AverageBillValue) {
      const [total, count] = await Promise.all([
        this.scalar(qr, `SELECT COALESCE(SUM(total_amount),0) FROM core.bills WHERE ${billWhere}`),
        this.scalar(qr, `SELECT COUNT(*) FROM core.bills WHERE ${billWhere}`),
      ]);
      const cnt = Number(count);
      return { ...base, formattedValue: this.inr(cnt > 0 ? Number(total) / cnt : 0) };
    }
    const rows = (await qr.query(`SELECT EXTRACT(HOUR FROM billed_at) AS hour, COALESCE(SUM(total_amount),0) AS total FROM core.bills WHERE ${billWhere} GROUP BY hour ORDER BY hour`)) as Row[];
    return { ...base, tableHeaders: ['Hour', 'Total Sales'], tableRows: rows.map(rr => [`${String(rr['hour'])}:00`, this.inr(Number(rr['total']))]) };
  }

  private async aggrProducts(
    qr: QueryRunner, orgId: string, locBillFilter: string,
    fromIso: string, toIso: string, reportType: EReportType, base: ReportBase,
  ): Promise<ReportData> {
    const direction = reportType === EReportType.TopSellingProducts ? 'DESC' : 'ASC';
    const rows = (await qr.query(`
      SELECT bi.product_id, SUM(bi.quantity) AS qty_sold, SUM(bi.line_total) AS revenue
      FROM core.bill_items bi JOIN core.bills b ON b.id = bi.bill_id
      WHERE b.organization_id='${orgId}' AND b.status='COMPLETED' ${locBillFilter}
        AND b.billed_at BETWEEN '${fromIso}' AND '${toIso}'
      GROUP BY bi.product_id ORDER BY qty_sold ${direction} LIMIT 20
    `)) as Row[];
    const headers = reportType === EReportType.TopSellingProducts ? ['Product ID', 'Qty Sold', 'Revenue'] : ['Product ID', 'Qty Sold'];
    const tableRows = reportType === EReportType.TopSellingProducts
      ? rows.map(rr => [String(rr['product_id']), String(rr['qty_sold']), this.inr(Number(rr['revenue']))])
      : rows.map(rr => [String(rr['product_id']), String(rr['qty_sold'])]);
    return { ...base, tableHeaders: headers, tableRows };
  }

  private async aggrExpenses(
    qr: QueryRunner, orgId: string, locFilter: string,
    fromIso: string, toIso: string, reportType: EReportType, base: ReportBase,
  ): Promise<ReportData> {
    const catFilter = reportType === EReportType.ShopExpense ? "AND category='shop'" : reportType === EReportType.OtherExpense ? "AND category != 'shop'" : '';
    const val = await this.scalar(qr, `SELECT COALESCE(SUM(amount),0) FROM core.expenses WHERE org_id='${orgId}' ${catFilter} ${locFilter} AND expense_date BETWEEN '${fromIso}' AND '${toIso}'`);
    return { ...base, formattedValue: this.inr(Number(val)) };
  }

  private async aggrCash(
    qr: QueryRunner, orgId: string,
    fromIso: string, toIso: string, reportType: EReportType, base: ReportBase,
  ): Promise<ReportData> {
    const dateFilter = reportType === EReportType.OpeningCash ? `created_at < '${fromIso}'` : `created_at <= '${toIso}'`;
    const val = await this.scalar(qr, `SELECT COALESCE(SUM(amount),0) FROM core.payment_transactions WHERE org_id='${orgId}' AND method='CASH' AND type='payment' AND status='completed' AND ${dateFilter}`);
    return { ...base, formattedValue: this.inr(Number(val)) };
  }

  private async aggrPurchase(
    qr: QueryRunner, orgId: string,
    fromIso: string, toIso: string, reportType: EReportType, base: ReportBase,
  ): Promise<ReportData> {
    if (reportType === EReportType.TotalPurchase) {
      const val = await this.scalar(qr, `SELECT COALESCE(SUM(total_amount),0) FROM core.purchase_orders WHERE organization_id='${orgId}' AND status IN ('received','partially_received') AND created_at BETWEEN '${fromIso}' AND '${toIso}'`);
      return { ...base, formattedValue: this.inr(Number(val)) };
    }
    const val = await this.scalar(qr, `SELECT COALESCE(SUM(total_amount),0) FROM core.item_returns WHERE return_type='supplier' AND created_at BETWEEN '${fromIso}' AND '${toIso}'`);
    return { ...base, formattedValue: this.inr(Number(val)) };
  }

  private async aggrProfit(
    qr: QueryRunner, orgId: string, locBillFilter: string, locFilter: string,
    fromIso: string, toIso: string, reportType: EReportType, base: ReportBase,
  ): Promise<ReportData> {
    const billWhere = `b.organization_id='${orgId}' AND b.status='COMPLETED' ${locBillFilter} AND b.billed_at BETWEEN '${fromIso}' AND '${toIso}'`;
    const [sales, cost] = await Promise.all([
      this.scalar(qr, `SELECT COALESCE(SUM(total_amount),0) FROM core.bills b WHERE ${billWhere}`),
      this.scalar(qr, `SELECT COALESCE(SUM(bi.quantity * p.cost_price),0) FROM core.bill_items bi JOIN core.bills b ON b.id=bi.bill_id JOIN core.products p ON p.id=bi.product_id WHERE ${billWhere}`),
    ]);
    const sc = Number(sales);
    const co = Number(cost);
    if (reportType === EReportType.TotalProfit) {
      return { ...base, formattedValue: this.inr(sc - co), summaryCards: [{ label: 'Revenue', value: this.inr(sc) }, { label: 'COGS', value: this.inr(co) }, { label: 'Gross Profit', value: this.inr(sc - co) }] };
    }
    const expenses = Number(await this.scalar(qr, `SELECT COALESCE(SUM(amount),0) FROM core.expenses WHERE org_id='${orgId}' ${locFilter} AND expense_date BETWEEN '${fromIso}' AND '${toIso}'`));
    return { ...base, formattedValue: this.inr(sc - co - expenses), summaryCards: [{ label: 'Revenue', value: this.inr(sc) }, { label: 'COGS', value: this.inr(co) }, { label: 'Expenses', value: this.inr(expenses) }, { label: 'Net Profit', value: this.inr(sc - co - expenses) }] };
  }

  private async aggrStock(
    qr: QueryRunner, orgId: string, locationId: string | null,
    reportType: EReportType, base: ReportBase,
  ): Promise<ReportData> {
    const locWhere = locationId ? `AND inv.location_id='${locationId}'` : '';
    if (reportType === EReportType.OutOfStockItems) {
      const rows = (await qr.query(`SELECT inv.product_id, inv.location_id FROM core.inventory inv WHERE inv.organization_id='${orgId}' AND inv.quantity_on_hand <= 0 ${locWhere}`)) as Row[];
      return { ...base, formattedValue: String(rows.length), tableHeaders: ['Product ID', 'Location ID'], tableRows: rows.map(rr => [String(rr['product_id']), String(rr['location_id'])]) };
    }
    if (reportType === EReportType.LowStockItems) {
      const rows = (await qr.query(`SELECT inv.product_id, inv.location_id, inv.quantity_on_hand, inv.reorder_level FROM core.inventory inv WHERE inv.organization_id='${orgId}' AND inv.quantity_on_hand <= inv.reorder_level AND inv.reorder_level > 0 ${locWhere} ORDER BY (inv.quantity_on_hand - inv.reorder_level) ASC`)) as Row[];
      return { ...base, formattedValue: String(rows.length), tableHeaders: ['Product ID', 'Location', 'Qty On Hand', 'Reorder Level'], tableRows: rows.map(rr => [String(rr['product_id']), String(rr['location_id']), String(rr['quantity_on_hand']), String(rr['reorder_level'])]) };
    }
    const rows = (await qr.query(`SELECT inv.product_id, inv.location_id, inv.quantity_on_hand FROM core.inventory inv WHERE inv.organization_id='${orgId}' ${locWhere} ORDER BY inv.quantity_on_hand DESC LIMIT 50`)) as Row[];
    const total = rows.reduce((acc, rr) => acc + Number(rr['quantity_on_hand'] ?? 0), 0);
    return { ...base, formattedValue: String(Math.round(total)), summaryCards: [{ label: 'Total Items', value: String(rows.length) }, { label: 'Total Qty', value: String(Math.round(total)) }], tableHeaders: ['Product ID', 'Location ID', 'Qty On Hand'], tableRows: rows.map(rr => [String(rr['product_id']), String(rr['location_id']), String(rr['quantity_on_hand'])]) };
  }

  private async aggrDamageReturns(
    qr: QueryRunner, locationId: string | null,
    fromIso: string, toIso: string, reportType: EReportType, base: ReportBase,
  ): Promise<ReportData> {
    if (reportType === EReportType.DamagedStock) {
      const locWhere = locationId ? `AND sm.location_id='${locationId}'` : '';
      const rows = (await qr.query(`SELECT sm.product_id, sm.location_id, SUM(sm.quantity) AS qty_damaged FROM core.stock_movements sm WHERE sm.movement_type='damage' ${locWhere} AND sm.created_at BETWEEN '${fromIso}' AND '${toIso}' GROUP BY sm.product_id, sm.location_id`)) as Row[];
      const total = rows.reduce((acc, rr) => acc + Number(rr['qty_damaged'] ?? 0), 0);
      return { ...base, formattedValue: String(Math.round(total)), tableHeaders: ['Product ID', 'Location', 'Qty Damaged'], tableRows: rows.map(rr => [String(rr['product_id']), String(rr['location_id']), String(rr['qty_damaged'])]) };
    }
    const rows = (await qr.query(`SELECT ir.id, ir.return_type, ir.total_amount, ir.created_at FROM core.item_returns ir WHERE ir.created_at BETWEEN '${fromIso}' AND '${toIso}' ORDER BY ir.created_at DESC LIMIT 50`)) as Row[];
    const total = rows.reduce((acc, rr) => acc + Number(rr['total_amount'] ?? 0), 0);
    return { ...base, formattedValue: this.inr(total), tableHeaders: ['Return ID', 'Type', 'Amount', 'Date'], tableRows: rows.map(rr => [String(rr['id']).substring(0, 8) + '...', String(rr['return_type']), this.inr(Number(rr['total_amount'])), new Date(String(rr['created_at'])).toLocaleDateString('en-IN')]) };
  }

  private async aggrCustomers(
    qr: QueryRunner, orgId: string, locBillFilter: string,
    fromIso: string, toIso: string, reportType: EReportType, base: ReportBase,
  ): Promise<ReportData> {
    if (reportType === EReportType.TotalCustomers) {
      const val = await this.scalar(qr, `SELECT COUNT(DISTINCT customer_id) FROM core.bills WHERE organization_id='${orgId}' AND status='COMPLETED' ${locBillFilter} AND billed_at BETWEEN '${fromIso}' AND '${toIso}'`);
      return { ...base, formattedValue: String(Number(val)) };
    }
    if (reportType === EReportType.NewCustomers) {
      const val = await this.scalar(qr, `SELECT COUNT(*) FROM core.customers WHERE organization_id='${orgId}' AND created_at BETWEEN '${fromIso}' AND '${toIso}'`);
      return { ...base, formattedValue: String(Number(val)) };
    }
    const val = await this.scalar(qr, `SELECT COUNT(*) FROM (SELECT customer_id FROM core.bills WHERE organization_id='${orgId}' AND status='COMPLETED' ${locBillFilter} AND billed_at BETWEEN '${fromIso}' AND '${toIso}' GROUP BY customer_id HAVING COUNT(*) > 1) sub`);
    return { ...base, formattedValue: String(Number(val)) };
  }

  private async aggrCredit(
    qr: QueryRunner, orgId: string,
    fromIso: string, toIso: string, reportType: EReportType, base: ReportBase,
  ): Promise<ReportData> {
    if (reportType === EReportType.PendingCredit) {
      const rows = (await qr.query(`SELECT id, name, credit_balance FROM core.customers WHERE organization_id='${orgId}' AND credit_balance > 0 ORDER BY credit_balance DESC LIMIT 50`)) as Row[];
      const total = rows.reduce((acc, rr) => acc + Number(rr['credit_balance'] ?? 0), 0);
      return { ...base, formattedValue: this.inr(total), tableHeaders: ['Customer ID', 'Name', 'Balance'], tableRows: rows.map(rr => [String(rr['id']).substring(0, 8) + '...', String(rr['name']), this.inr(Number(rr['credit_balance']))]) };
    }
    const txType = reportType === EReportType.CreditGiven ? 'credit_sale' : 'payment';
    const val = await this.scalar(qr, `SELECT COALESCE(SUM(amount),0) FROM core.customer_credit_transactions WHERE type='${txType}' AND created_at BETWEEN '${fromIso}' AND '${toIso}'`);
    return { ...base, formattedValue: this.inr(Number(val)) };
  }

  private async aggrSupplier(
    qr: QueryRunner, orgId: string, locationId: string | null,
    fromIso: string, toIso: string, reportType: EReportType, base: ReportBase,
  ): Promise<ReportData> {
    if (reportType === EReportType.SupplierPayment) {
      const val = await this.scalar(qr, `SELECT COALESCE(SUM(amount),0) FROM core.payment_transactions WHERE org_id='${orgId}' AND reference_type='purchase_order' AND created_at BETWEEN '${fromIso}' AND '${toIso}'`);
      return { ...base, formattedValue: this.inr(Number(val)) };
    }
    const locWhere = locationId ? `AND po.location_id='${locationId}'` : '';
    const rows = (await qr.query(`SELECT po.po_number, po.supplier_id, po.total_amount, po.status FROM core.purchase_orders po WHERE po.organization_id='${orgId}' AND po.status NOT IN ('received','cancelled') ${locWhere} ORDER BY po.created_at DESC LIMIT 50`)) as Row[];
    const total = rows.reduce((acc, rr) => acc + Number(rr['total_amount'] ?? 0), 0);
    return { ...base, formattedValue: this.inr(total), tableHeaders: ['PO Number', 'Supplier ID', 'Amount', 'Status'], tableRows: rows.map(rr => [String(rr['po_number']), String(rr['supplier_id']).substring(0, 8) + '...', this.inr(Number(rr['total_amount'])), String(rr['status'])]) };
  }

  private async aggrWeekly(
    qr: QueryRunner, orgId: string, locBillFilter: string,
    fromIso: string, toIso: string, base: ReportBase,
  ): Promise<ReportData> {
    const rows = (await qr.query(`SELECT DATE_TRUNC('week', billed_at) AS week_start, COALESCE(SUM(total_amount),0) AS total, COUNT(*) AS bills FROM core.bills WHERE organization_id='${orgId}' AND status='COMPLETED' ${locBillFilter} AND billed_at BETWEEN '${fromIso}' AND '${toIso}' GROUP BY week_start ORDER BY week_start`)) as Row[];
    return { ...base, tableHeaders: ['Week Starting', 'Total Sales', 'Number of Bills'], tableRows: rows.map(rr => [new Date(String(rr['week_start'])).toLocaleDateString('en-IN'), this.inr(Number(rr['total'])), String(rr['bills'])]) };
  }

  private async scalar(qr: QueryRunner, sql: string): Promise<unknown> {
    const result = (await qr.query(sql)) as Row[];
    if (!result.length) return 0;
    return Object.values(result[0])[0] ?? 0;
  }

  private inr(value: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);
  }

  private fmt(dt: Date): string {
    return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
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
