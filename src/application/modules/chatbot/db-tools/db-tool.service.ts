import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export type DbToolArgs = Record<string, unknown>;

interface SalesRow            { bill_count: string; total_revenue: string; avg_bill_value: string }
interface ProductSaleRow      { product_name: string; total_quantity: string; revenue: string }
interface LowStockRow         { product_name: string; location_name: string; quantity_on_hand: string; reorder_level: string }
interface ValuationRow        { total_value: string; product_count: string; location_count: string }
interface SpendRow            { order_count: string; total_spend: string }
interface CustomerSpendRow    { customer_name: string; bill_count: string; total_spend: string }
interface ProductStockRow     { product_name: string; location_name: string; quantity_on_hand: string; reorder_level: string }
interface LocationStockRow    { product_name: string; quantity_on_hand: string; quantity_reserved: string }
interface PoStatusRow         { status: string; count: string; total_value: string }
interface SupplierRow         { supplier_name: string; order_count: string; total_value: string }
interface CustomerStatsRow    { total: string; total_credit_limit: string; total_outstanding_credit: string }
interface CustomerSearchRow   { name: string; credit_limit: string; credit_balance: string; customer_type: string }
interface ExpenseRow          { category: string; count: string; total: string }
interface TransferRow         { status: string; count: string }
interface ReturnSummaryRow    { return_count: string; total_refunded: string }
interface GeneralStatsRow     { product_count: string; customer_count: string; location_count: string; supplier_count: string }

@Injectable()
export class DbToolsService {
  public constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  private str(args: DbToolArgs, key: string): string | undefined {
    const val = args[key];
    return typeof val === 'string' ? val : undefined;
  }

  private num(args: DbToolArgs, key: string, fallback: number): number {
    const val = args[key];
    return typeof val === 'number' ? val : fallback;
  }

  public async executeAsync(toolName: string, args: DbToolArgs, orgId: string): Promise<Record<string, unknown>> {
    switch (toolName) {
      case 'getSalesThisMonth':         return this.getSalesThisMonth(orgId, this.str(args, 'locationId'));
      case 'getSalesByDateRange':       return this.getSalesByDateRange(orgId, this.str(args, 'from') ?? '', this.str(args, 'to') ?? '', this.str(args, 'locationId'));
      case 'getTopSellingProducts':     return this.getTopSellingProducts(orgId, this.num(args, 'limit', 10));
      case 'getTopCustomers':           return this.getTopCustomers(orgId, this.num(args, 'limit', 10));
      case 'getLowStockProducts':       return this.getLowStockProducts(orgId);
      case 'getInventoryValuation':     return this.getInventoryValuation(orgId, this.str(args, 'locationId'));
      case 'searchProductStock':        return this.searchProductStock(orgId, this.str(args, 'productName') ?? '');
      case 'getLocationInventory':      return this.getLocationInventory(orgId, this.str(args, 'locationName') ?? '');
      case 'getPurchaseSpendThisMonth': return this.getPurchaseSpendThisMonth(orgId);
      case 'getPurchaseOrdersByStatus': return this.getPurchaseOrdersByStatus(orgId);
      case 'getTopSuppliers':           return this.getTopSuppliers(orgId, this.num(args, 'limit', 10));
      case 'getCustomerStats':          return this.getCustomerStats(orgId);
      case 'searchCustomer':            return this.searchCustomer(orgId, this.str(args, 'name') ?? '');
      case 'getExpensesSummary':        return this.getExpensesSummary(orgId);
      case 'getStockTransferSummary':   return this.getStockTransferSummary(orgId);
      case 'getSalesReturnSummary':     return this.getSalesReturnSummary(orgId);
      case 'getGeneralStats':           return this.getGeneralStats(orgId);
      default:                          return { error: `Unknown tool: ${toolName}` };
    }
  }

  private async getSalesThisMonth(orgId: string, locationId?: string): Promise<Record<string, unknown>> {
    const params: unknown[] = [orgId];
    const loc = locationId ? `AND location_id = $${params.push(locationId)}` : '';
    const [row] = await this.dataSource.query<SalesRow[]>(
      `SELECT COUNT(*)::int AS bill_count, COALESCE(SUM(total_amount),0) AS total_revenue, COALESCE(AVG(total_amount),0) AS avg_bill_value
       FROM core.bills WHERE organization_id=$1 AND status='COMPLETED' AND deleted_at IS NULL
         AND created_at>=date_trunc('month',now()) ${loc}`, params);
    return { bill_count: Number(row?.bill_count ?? 0), total_revenue: Number(row?.total_revenue ?? 0), avg_bill_value: Number(row?.avg_bill_value ?? 0) };
  }

  private async getSalesByDateRange(orgId: string, from: string, to: string, locationId?: string): Promise<Record<string, unknown>> {
    const params: unknown[] = [orgId, from, to];
    const loc = locationId ? `AND location_id = $${params.push(locationId)}` : '';
    const [row] = await this.dataSource.query<SalesRow[]>(
      `SELECT COUNT(*)::int AS bill_count, COALESCE(SUM(total_amount),0) AS total_revenue
       FROM core.bills WHERE organization_id=$1 AND status='COMPLETED' AND deleted_at IS NULL
         AND created_at BETWEEN $2 AND $3 ${loc}`, params);
    return { bill_count: Number(row?.bill_count ?? 0), total_revenue: Number(row?.total_revenue ?? 0), period: { from, to } };
  }

  private async getTopSellingProducts(orgId: string, limit: number): Promise<Record<string, unknown>> {
    const rows = await this.dataSource.query<ProductSaleRow[]>(
      `SELECT p.name AS product_name, SUM(bi.quantity)::numeric AS total_quantity, SUM(bi.line_total)::numeric AS revenue
       FROM core.bill_items bi JOIN core.bills b ON b.id=bi.bill_id JOIN core.products p ON p.id=bi.product_id
       WHERE b.organization_id=$1 AND b.status='COMPLETED' AND b.deleted_at IS NULL
         AND b.created_at>=date_trunc('month',now())
       GROUP BY p.name ORDER BY revenue DESC LIMIT $2`, [orgId, limit]);
    return { products: rows.map(row => ({ name: row.product_name, quantity: Number(row.total_quantity), revenue: Number(row.revenue) })) };
  }

  private async getTopCustomers(orgId: string, limit: number): Promise<Record<string, unknown>> {
    const rows = await this.dataSource.query<CustomerSpendRow[]>(
      `SELECT c.name AS customer_name, COUNT(b.id)::int AS bill_count, COALESCE(SUM(b.total_amount),0) AS total_spend
       FROM core.bills b JOIN core.customers c ON c.id=b.customer_id
       WHERE b.organization_id=$1 AND b.status='COMPLETED' AND b.deleted_at IS NULL
         AND b.customer_id IS NOT NULL AND b.created_at>=date_trunc('month',now())
       GROUP BY c.name ORDER BY total_spend DESC LIMIT $2`, [orgId, limit]);
    return { customers: rows.map(row => ({ name: row.customer_name, bill_count: Number(row.bill_count), total_spend: Number(row.total_spend) })) };
  }

  private async getLowStockProducts(orgId: string): Promise<Record<string, unknown>> {
    const rows = await this.dataSource.query<LowStockRow[]>(
      `SELECT p.name AS product_name, l.name AS location_name, inv.quantity_on_hand::numeric, inv.reorder_level::numeric
       FROM core.inventory inv JOIN core.products p ON p.id=inv.product_id JOIN core.locations l ON l.id=inv.location_id
       WHERE inv.organization_id=$1 AND inv.reorder_level>0 AND inv.quantity_on_hand<=inv.reorder_level
       ORDER BY inv.quantity_on_hand ASC`, [orgId]);
    return { items: rows.map(row => ({ product: row.product_name, location: row.location_name, on_hand: Number(row.quantity_on_hand), reorder_at: Number(row.reorder_level) })) };
  }

  private async getInventoryValuation(orgId: string, locationId?: string): Promise<Record<string, unknown>> {
    const params: unknown[] = [orgId];
    const loc = locationId ? `AND location_id = $${params.push(locationId)}` : '';
    const [row] = await this.dataSource.query<ValuationRow[]>(
      `SELECT COALESCE(SUM(quantity_on_hand*average_cost),0) AS total_value,
              COUNT(DISTINCT product_id)::int AS product_count, COUNT(DISTINCT location_id)::int AS location_count
       FROM core.inventory WHERE organization_id=$1 AND average_cost IS NOT NULL ${loc}`, params);
    return { total_value: Number(row?.total_value ?? 0), product_count: Number(row?.product_count ?? 0), location_count: Number(row?.location_count ?? 0) };
  }

  private async searchProductStock(orgId: string, productName: string): Promise<Record<string, unknown>> {
    const rows = await this.dataSource.query<ProductStockRow[]>(
      `SELECT p.name AS product_name, l.name AS location_name, inv.quantity_on_hand::numeric, inv.reorder_level::numeric
       FROM core.inventory inv JOIN core.products p ON p.id=inv.product_id JOIN core.locations l ON l.id=inv.location_id
       WHERE inv.organization_id=$1 AND LOWER(p.name) LIKE '%'||LOWER($2)||'%'
       ORDER BY l.name LIMIT 20`, [orgId, productName]);
    return { items: rows.map(row => ({ product: row.product_name, location: row.location_name, on_hand: Number(row.quantity_on_hand), reorder_at: Number(row.reorder_level) })) };
  }

  private async getLocationInventory(orgId: string, locationName: string): Promise<Record<string, unknown>> {
    const rows = await this.dataSource.query<LocationStockRow[]>(
      `SELECT p.name AS product_name, inv.quantity_on_hand::numeric, inv.quantity_reserved::numeric
       FROM core.inventory inv JOIN core.products p ON p.id=inv.product_id JOIN core.locations l ON l.id=inv.location_id
       WHERE inv.organization_id=$1 AND LOWER(l.name) LIKE '%'||LOWER($2)||'%'
       ORDER BY p.name LIMIT 50`, [orgId, locationName]);
    return { items: rows.map(row => ({ product: row.product_name, on_hand: Number(row.quantity_on_hand), reserved: Number(row.quantity_reserved) })) };
  }

  private async getPurchaseSpendThisMonth(orgId: string): Promise<Record<string, unknown>> {
    const [row] = await this.dataSource.query<SpendRow[]>(
      `SELECT COUNT(*)::int AS order_count, COALESCE(SUM(total_amount),0) AS total_spend
       FROM core.purchase_orders WHERE organization_id=$1
         AND status IN ('received','partially_allocated','allocated')
         AND created_at>=date_trunc('month',now())`, [orgId]);
    return { order_count: Number(row?.order_count ?? 0), total_spend: Number(row?.total_spend ?? 0) };
  }

  private async getPurchaseOrdersByStatus(orgId: string): Promise<Record<string, unknown>> {
    const rows = await this.dataSource.query<PoStatusRow[]>(
      `SELECT status, COUNT(*)::int AS count, COALESCE(SUM(total_amount),0) AS total_value
       FROM core.purchase_orders WHERE organization_id=$1
       GROUP BY status ORDER BY count DESC`, [orgId]);
    return { by_status: rows.map(row => ({ status: row.status, count: Number(row.count), total_value: Number(row.total_value) })) };
  }

  private async getTopSuppliers(orgId: string, limit: number): Promise<Record<string, unknown>> {
    const rows = await this.dataSource.query<SupplierRow[]>(
      `SELECT s.name AS supplier_name, COUNT(po.id)::int AS order_count, COALESCE(SUM(po.total_amount),0) AS total_value
       FROM core.purchase_orders po JOIN core.suppliers s ON s.id=po.supplier_id
       WHERE po.organization_id=$1 AND po.status NOT IN ('draft','cancelled')
       GROUP BY s.name ORDER BY total_value DESC LIMIT $2`, [orgId, limit]);
    return { suppliers: rows.map(row => ({ name: row.supplier_name, order_count: Number(row.order_count), total_value: Number(row.total_value) })) };
  }

  private async getCustomerStats(orgId: string): Promise<Record<string, unknown>> {
    const [row] = await this.dataSource.query<CustomerStatsRow[]>(
      `SELECT COUNT(*)::int AS total, COALESCE(SUM(credit_limit),0) AS total_credit_limit,
              COALESCE(SUM(credit_balance),0) AS total_outstanding_credit
       FROM core.customers WHERE organization_id=$1 AND deleted_at IS NULL`, [orgId]);
    return { total: Number(row?.total ?? 0), total_credit_limit: Number(row?.total_credit_limit ?? 0), total_outstanding_credit: Number(row?.total_outstanding_credit ?? 0) };
  }

  private async searchCustomer(orgId: string, name: string): Promise<Record<string, unknown>> {
    const rows = await this.dataSource.query<CustomerSearchRow[]>(
      `SELECT name, credit_limit::numeric, credit_balance::numeric, customer_type
       FROM core.customers WHERE organization_id=$1 AND LOWER(name) LIKE '%'||LOWER($2)||'%' AND deleted_at IS NULL
       LIMIT 10`, [orgId, name]);
    return { customers: rows.map(row => ({ name: row.name, credit_limit: Number(row.credit_limit), credit_balance: Number(row.credit_balance), type: row.customer_type })) };
  }

  private async getExpensesSummary(orgId: string): Promise<Record<string, unknown>> {
    const rows = await this.dataSource.query<ExpenseRow[]>(
      `SELECT category, COUNT(*)::int AS count, COALESCE(SUM(amount),0) AS total
       FROM core.expenses WHERE org_id=$1 AND deleted_at IS NULL
         AND expense_date>=date_trunc('month',now())
       GROUP BY category ORDER BY total DESC`, [orgId]);
    return { by_category: rows.map(row => ({ category: row.category, count: Number(row.count), total: Number(row.total) })) };
  }

  private async getStockTransferSummary(orgId: string): Promise<Record<string, unknown>> {
    const rows = await this.dataSource.query<TransferRow[]>(
      `SELECT status, COUNT(*)::int AS count FROM core.stock_transfers
       WHERE organization_id=$1 AND deleted_at IS NULL GROUP BY status ORDER BY count DESC`, [orgId]);
    return { by_status: rows.map(row => ({ status: row.status, count: Number(row.count) })) };
  }

  private async getSalesReturnSummary(orgId: string): Promise<Record<string, unknown>> {
    const [row] = await this.dataSource.query<ReturnSummaryRow[]>(
      `SELECT COUNT(*)::int AS return_count, COALESCE(SUM(total_amount),0) AS total_refunded
       FROM core.sales_returns WHERE organization_id=$1 AND created_at>=date_trunc('month',now())`, [orgId]);
    return { return_count: Number(row?.return_count ?? 0), total_refunded: Number(row?.total_refunded ?? 0) };
  }

  private async getGeneralStats(orgId: string): Promise<Record<string, unknown>> {
    const [row] = await this.dataSource.query<GeneralStatsRow[]>(
      `SELECT (SELECT COUNT(*)::int FROM core.products WHERE organization_id=$1 AND deleted_at IS NULL) AS product_count,
              (SELECT COUNT(*)::int FROM core.customers WHERE organization_id=$1 AND deleted_at IS NULL) AS customer_count,
              (SELECT COUNT(*)::int FROM core.locations WHERE organization_id=$1) AS location_count,
              (SELECT COUNT(*)::int FROM core.suppliers WHERE organization_id=$1 AND deleted_at IS NULL) AS supplier_count`, [orgId]);
    return { product_count: Number(row?.product_count ?? 0), customer_count: Number(row?.customer_count ?? 0), location_count: Number(row?.location_count ?? 0), supplier_count: Number(row?.supplier_count ?? 0) };
  }
}
