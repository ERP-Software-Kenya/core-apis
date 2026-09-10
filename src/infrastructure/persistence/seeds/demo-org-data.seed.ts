import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';
import { EPurchaseOrderStatus } from '../../../application/shared/enums';

/**
 * Seeds a complete demo dataset for org 68df3dd2-e8d4-4e4d-b9b3-bfa2d3bcd6af.
 * All IDs are fixed — safe to re-run anytime (ON CONFLICT DO NOTHING).
 *
 * Covers: branches, locations, categories, suppliers, products,
 *         customers, inventory, purchase orders/items, orders/items,
 *         and stock movements (in + out).
 */

const ORG = '68df3dd2-e8d4-4e4d-b9b3-bfa2d3bcd6af';

const BR = {
  mumbai: 'cc000001-0000-0000-0000-000000000001',
  delhi:  'cc000001-0000-0000-0000-000000000002',
  pune:   'cc000001-0000-0000-0000-000000000003',
};

const LOC = {
  mainStore:   'dd000001-0000-0000-0000-000000000001',
  mumbaiStore: 'dd000001-0000-0000-0000-000000000002',
  mumbaiWh:    'dd000001-0000-0000-0000-000000000003',
  delhiStore:  'dd000001-0000-0000-0000-000000000004',
  delhiWh:     'dd000001-0000-0000-0000-000000000005',
  puneStore:   'dd000001-0000-0000-0000-000000000006',
};

const CAT = {
  beverages:   'ee000001-0000-0000-0000-000000000001',
  snacks:      'ee000001-0000-0000-0000-000000000002',
  dairy:       'ee000001-0000-0000-0000-000000000003',
  grains:      'ee000001-0000-0000-0000-000000000004',
  spices:      'ee000001-0000-0000-0000-000000000005',
  personalCare:'ee000001-0000-0000-0000-000000000006',
  household:   'ee000001-0000-0000-0000-000000000007',
  frozen:      'ee000001-0000-0000-0000-000000000008',
  bakery:      'ee000001-0000-0000-0000-000000000009',
  tobacco:     'ee000001-0000-0000-0000-00000000000a',
};

const PRD = {
  water:  'ff000001-0000-0000-0000-000000000001',
  mango:  'ff000001-0000-0000-0000-000000000002',
  lays:   'ff000001-0000-0000-0000-000000000003',
  parleg: 'ff000001-0000-0000-0000-000000000004',
  milk:   'ff000001-0000-0000-0000-000000000005',
  rice:   'ff000001-0000-0000-0000-000000000006',
  salt:   'ff000001-0000-0000-0000-000000000007',
  dettol: 'ff000001-0000-0000-0000-000000000008',
  surf:   'ff000001-0000-0000-0000-000000000009',
  bread:  'ff000001-0000-0000-0000-00000000000a',
};

const INV = {
  water:  '11000001-0000-0000-0000-000000000001',
  mango:  '11000001-0000-0000-0000-000000000002',
  lays:   '11000001-0000-0000-0000-000000000003',
  parleg: '11000001-0000-0000-0000-000000000004',
  milk:   '11000001-0000-0000-0000-000000000005',
  rice:   '11000001-0000-0000-0000-000000000006',
  salt:   '11000001-0000-0000-0000-000000000007',
  dettol: '11000001-0000-0000-0000-000000000008',
  surf:   '11000001-0000-0000-0000-000000000009',
  bread:  '11000001-0000-0000-0000-00000000000a',
};

const SUP = {
  hul:    '22000001-0000-0000-0000-000000000001',
  itc:    '22000001-0000-0000-0000-000000000002',
  amul:   '22000001-0000-0000-0000-000000000003',
  nestle: '22000001-0000-0000-0000-000000000004',
  parle:  '22000001-0000-0000-0000-000000000005',
  dabur:  '22000001-0000-0000-0000-000000000006',
  brit:   '22000001-0000-0000-0000-000000000007',
  tata:   '22000001-0000-0000-0000-000000000008',
  marico: '22000001-0000-0000-0000-000000000009',
  emami:  '22000001-0000-0000-0000-00000000000a',
};

const CUST = {
  rahul:  '33000001-0000-0000-0000-000000000001',
  priya:  '33000001-0000-0000-0000-000000000002',
  suresh: '33000001-0000-0000-0000-000000000003',
  anita:  '33000001-0000-0000-0000-000000000004',
  vikram: '33000001-0000-0000-0000-000000000005',
  kavita: '33000001-0000-0000-0000-000000000006',
  arun:   '33000001-0000-0000-0000-000000000007',
  deepa:  '33000001-0000-0000-0000-000000000008',
  nikhil: '33000001-0000-0000-0000-000000000009',
  sunita: '33000001-0000-0000-0000-00000000000a',
};

const PO = {
  po1: 'aa000001-0000-0000-0000-000000000001',
  po2: 'aa000001-0000-0000-0000-000000000002',
  po3: 'aa000001-0000-0000-0000-000000000003',
  po4: 'aa000001-0000-0000-0000-000000000004',
  po5: 'aa000001-0000-0000-0000-000000000005',
};

const ORD = {
  ord1: 'bb000001-0000-0000-0000-000000000001',
  ord2: 'bb000001-0000-0000-0000-000000000002',
  ord3: 'bb000001-0000-0000-0000-000000000003',
  ord4: 'bb000001-0000-0000-0000-000000000004',
  ord5: 'bb000001-0000-0000-0000-000000000005',
};

@Injectable()
export class DemoOrgDataSeed {
  constructor(
    private readonly dataSource: DataSource,
    @InjectPinoLogger(DemoOrgDataSeed.name) private readonly logger: PinoLogger,
  ) {}

  public async runAsync(): Promise<void> {
    this.logger.info('Seeding DemoOrgDataSeed...');
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      await this.seedBranchesAsync(qr);
      await this.seedLocationsAsync(qr);
      await this.seedCategoriesAsync(qr);
      await this.seedSuppliersAsync(qr);
      await this.seedProductsAsync(qr);
      await this.seedCustomersAsync(qr);
      await this.seedInventoryAsync(qr);
      await this.seedPurchaseOrdersAsync(qr);
      await this.seedOrdersAsync(qr);
      await this.seedStockMovementsAsync(qr);
      await qr.commitTransaction();
      this.logger.info('DemoOrgDataSeed completed');
    } catch (err) {
      await qr.rollbackTransaction();
      this.logger.error(err, 'DemoOrgDataSeed failed — rolled back');
      throw err;
    } finally {
      await qr.release();
    }
  }

  private async seedBranchesAsync(qr: QueryRunner): Promise<void> {
    await qr.query(`
      INSERT INTO core.branches (id, organization_id, name, code, address, city, state, country, phone, is_active) VALUES
        ('${BR.mumbai}', '${ORG}', 'Mumbai Branch', 'MUM', '12 Nariman Point, Mumbai',  'Mumbai', 'Maharashtra', 'India', '+91-9100001001', true),
        ('${BR.delhi}',  '${ORG}', 'Delhi Branch',  'DEL', '45 Connaught Place, Delhi', 'Delhi',  'Delhi',       'India', '+91-9100002002', true),
        ('${BR.pune}',   '${ORG}', 'Pune Branch',   'PUN', '7 FC Road, Pune',           'Pune',   'Maharashtra', 'India', '+91-9100003003', true)
      ON CONFLICT (id) DO NOTHING
    `);
  }

  private async seedLocationsAsync(qr: QueryRunner): Promise<void> {
    await qr.query(`
      INSERT INTO core.locations (id, organization_id, name, type, address, city, state, country, phone, is_active) VALUES
        ('${LOC.mainStore}',   '${ORG}', 'Main Store',          'store',     '123 Market Street, Mumbai',    'Mumbai', 'Maharashtra', 'India', '+91-9200000001', true),
        ('${LOC.mumbaiStore}', '${ORG}', 'Mumbai Retail Store', 'store',     '12 Nariman Point, Mumbai',     'Mumbai', 'Maharashtra', 'India', '+91-9200001001', true),
        ('${LOC.mumbaiWh}',    '${ORG}', 'Mumbai Warehouse',    'warehouse', '78 APMC Yard, Navi Mumbai',    'Mumbai', 'Maharashtra', 'India', '+91-9200002002', true),
        ('${LOC.delhiStore}',  '${ORG}', 'Delhi Retail Store',  'store',     '45 Connaught Place, Delhi',    'Delhi',  'Delhi',       'India', '+91-9200003003', true),
        ('${LOC.delhiWh}',     '${ORG}', 'Delhi Warehouse',     'warehouse', '22 Okhla Industrial, Delhi',   'Delhi',  'Delhi',       'India', '+91-9200004004', true),
        ('${LOC.puneStore}',   '${ORG}', 'Pune Retail Store',   'store',     '7 FC Road, Pune',              'Pune',   'Maharashtra', 'India', '+91-9200005005', true)
      ON CONFLICT (id) DO NOTHING
    `);
  }

  private async seedCategoriesAsync(qr: QueryRunner): Promise<void> {
    await qr.query(`
      INSERT INTO core.categories (id, organization_id, name, description, is_active) VALUES
        ('${CAT.beverages}',    '${ORG}', 'Beverages',          'Water, juices, soft drinks',                true),
        ('${CAT.snacks}',       '${ORG}', 'Snacks',             'Chips, biscuits, namkeen',                  true),
        ('${CAT.dairy}',        '${ORG}', 'Dairy Products',     'Milk, cheese, butter, paneer',              true),
        ('${CAT.grains}',       '${ORG}', 'Grains & Pulses',    'Rice, wheat, lentils, chickpeas',           true),
        ('${CAT.spices}',       '${ORG}', 'Spices & Condiments','Salt, sugar, masalas, sauces',              true),
        ('${CAT.personalCare}', '${ORG}', 'Personal Care',      'Soaps, shampoos, toothpaste',               true),
        ('${CAT.household}',    '${ORG}', 'Household Items',    'Cleaning products, detergents',             true),
        ('${CAT.frozen}',       '${ORG}', 'Frozen Foods',       'Frozen vegetables, meats, ready-to-cook',  true),
        ('${CAT.bakery}',       '${ORG}', 'Bakery',             'Bread, cakes, cookies',                     true),
        ('${CAT.tobacco}',      '${ORG}', 'Tobacco & Pan',      'Cigarettes, pan masala',                    true)
      ON CONFLICT (id) DO NOTHING
    `);
  }

  private async seedSuppliersAsync(qr: QueryRunner): Promise<void> {
    await qr.query(`
      INSERT INTO core.suppliers (id, organization_id, name, contact_person, email, phone, address, is_active) VALUES
        ('${SUP.hul}',    '${ORG}', 'HUL Distributors Pvt Ltd',  'Ramesh Kumar',   'ramesh@hul-dist.com',       '+91-9811001001', '12 Industrial Area, Mumbai',   true),
        ('${SUP.itc}',    '${ORG}', 'ITC Foods Mumbai',          'Priya Sharma',   'priya@itcfoods.in',         '+91-9811002002', '45 Trade Center, Pune',        true),
        ('${SUP.amul}',   '${ORG}', 'Amul Co-operative Ltd',     'Suresh Patel',   'suresh@amul-coop.com',      '+91-9811003003', 'Anand, Gujarat',               true),
        ('${SUP.nestle}', '${ORG}', 'Nestle India Wholesale',    'Anita Singh',    'anita@nestle-wholesale.in', '+91-9811004004', '7 Corporate Park, Delhi',      true),
        ('${SUP.parle}',  '${ORG}', 'Parle Products Agency',     'Vikram Mehta',   'vikram@parle-agency.com',   '+91-9811005005', '33 APMC Yard, Navi Mumbai',    true),
        ('${SUP.dabur}',  '${ORG}', 'Dabur Distributor Network', 'Kavita Joshi',   'kavita@dabur-dist.in',      '+91-9811006006', '21 Ring Road, Indore',         true),
        ('${SUP.brit}',   '${ORG}', 'Britannia Wholesale Hub',   'Arun Verma',     'arun@brit-wholesale.com',   '+91-9811007007', '8 Food Park, Hyderabad',       true),
        ('${SUP.tata}',   '${ORG}', 'Tata Consumer Products',    'Deepa Rao',      'deepa@tata-consumer.in',    '+91-9811008008', '55 IT Corridor, Chennai',      true),
        ('${SUP.marico}', '${ORG}', 'Marico Distribution India', 'Nikhil Desai',   'nikhil@marico-dist.com',    '+91-9811009009', '14 Logistics Park, Surat',     true),
        ('${SUP.emami}',  '${ORG}', 'Emami FMCG Traders',        'Sunita Agrawal', 'sunita@emami-traders.in',   '+91-9811010010', '29 Wholesale Market, Kolkata', true)
      ON CONFLICT (id) DO NOTHING
    `);
  }

  private async seedProductsAsync(qr: QueryRunner): Promise<void> {
    await qr.query(`
      INSERT INTO core.products
        (id, organization_id, category_id, name, sku, unit, cost_price, retail_price, loyalty_price, wholesale_price, transfer_price, reorder_point, is_active)
      VALUES
        ('${PRD.water}',  '${ORG}', '${CAT.beverages}',   'Mineral Water 1L',         'BEV-001', 'piece',  10,  18,  16,  14,  12, 50, true),
        ('${PRD.mango}',  '${ORG}', '${CAT.beverages}',   'Mango Juice 200ml',         'BEV-002', 'piece',  12,  22,  20,  17,  14, 40, true),
        ('${PRD.lays}',   '${ORG}', '${CAT.snacks}',      'Lays Classic 50g',          'SNK-001', 'piece',   8,  20,  18,  15,  11, 60, true),
        ('${PRD.parleg}', '${ORG}', '${CAT.snacks}',      'Parle-G Biscuits 100g',     'SNK-002', 'piece',   7,  12,  10,   9,   8, 80, true),
        ('${PRD.milk}',   '${ORG}', '${CAT.dairy}',       'Amul Full Cream Milk 1L',   'DAI-001', 'litre',  52,  65,  62,  58,  55, 30, true),
        ('${PRD.rice}',   '${ORG}', '${CAT.grains}',      'Basmati Rice 1kg',          'GRN-001', 'kg',     70,  95,  90,  85,  78, 20, true),
        ('${PRD.salt}',   '${ORG}', '${CAT.spices}',      'Tata Salt 1kg',             'SPC-001', 'kg',     16,  24,  22,  20,  18, 40, true),
        ('${PRD.dettol}', '${ORG}', '${CAT.personalCare}','Dettol Soap 75g',           'PCA-001', 'piece',  28,  42,  40,  36,  32, 35, true),
        ('${PRD.surf}',   '${ORG}', '${CAT.household}',   'Surf Excel 1kg',            'HHI-001', 'kg',     90, 130, 125, 118, 105, 15, true),
        ('${PRD.bread}',  '${ORG}', '${CAT.bakery}',      'Britannia Brown Bread',     'BAK-001', 'piece',  32,  48,  45,  42,  38, 25, true)
      ON CONFLICT (id) DO NOTHING
    `);
  }

  private async seedCustomersAsync(qr: QueryRunner): Promise<void> {
    await qr.query(`
      INSERT INTO core.customers (id, organization_id, name, email, phone, address, customer_type, credit_limit, credit_balance) VALUES
        ('${CUST.rahul}',  '${ORG}', 'Rahul Enterprises',      'rahul@rahulenterprises.com',   '+91-9900001001', '12 MG Road, Mumbai',        'shop',         50000, 0),
        ('${CUST.priya}',  '${ORG}', 'Priya General Store',    'priya@priyas.com',             '+91-9900002002', '45 Laxmi Nagar, Delhi',     'regular',      20000, 0),
        ('${CUST.suresh}', '${ORG}', 'Suresh Kirana Shop',     'suresh.kirana@gmail.com',      '+91-9900003003', '7 Station Road, Pune',      'shop',         30000, 0),
        ('${CUST.anita}',  '${ORG}', 'Anita Walk-in',          NULL,                           '+91-9900004004', NULL,                        'new',          NULL,  0),
        ('${CUST.vikram}', '${ORG}', 'Vikram Wholesale Co',    'vikram@vikramwholesale.in',    '+91-9900005005', '33 Market Yard, Ahmedabad', 'big_customer', 100000,0),
        ('${CUST.kavita}', '${ORG}', 'Kavita Super Market',    'kavita@kavitasupermarket.com', '+91-9900006006', '21 Civil Lines, Nagpur',    'shop',         75000, 0),
        ('${CUST.arun}',   '${ORG}', 'Arun Daily Needs',       'arun.daily@gmail.com',         '+91-9900007007', '8 Gandhi Nagar, Bhopal',    'regular',      15000, 0),
        ('${CUST.deepa}',  '${ORG}', 'Deepa Family Store',     'deepa.family@gmail.com',       '+91-9900008008', '55 Sector 12, Gurgaon',     'regular',      10000, 0),
        ('${CUST.nikhil}', '${ORG}', 'Nikhil and Bros Trading','nikhil@nikhilbros.com',        '+91-9900009009', '14 MIDC, Nashik',           'big_customer', 80000, 0),
        ('${CUST.sunita}', '${ORG}', 'Sunita Corner Shop',     NULL,                           '+91-9900010010', '29 Old Market, Jaipur',     'new',          NULL,  0)
      ON CONFLICT (id) DO NOTHING
    `);
  }

  private async seedInventoryAsync(qr: QueryRunner): Promise<void> {
    await qr.query(`
      INSERT INTO core.inventory
        (id, organization_id, location_id, product_id, quantity_on_hand, quantity_reserved, reorder_level, max_stock, average_cost, quantity_unpublished)
      VALUES
        ('${INV.water}',  '${ORG}', '${LOC.mainStore}', '${PRD.water}',  230, 10, 50,  500,  10, 0),
        ('${INV.mango}',  '${ORG}', '${LOC.mainStore}', '${PRD.mango}',  210,  5, 40,  400,  12, 0),
        ('${INV.lays}',   '${ORG}', '${LOC.mainStore}', '${PRD.lays}',   380, 20, 60,  600,   8, 0),
        ('${INV.parleg}', '${ORG}', '${LOC.mainStore}', '${PRD.parleg}', 575, 15, 80,  800,   7, 0),
        ('${INV.milk}',   '${ORG}', '${LOC.mainStore}', '${PRD.milk}',   115,  5, 30,  200,  52, 0),
        ('${INV.rice}',   '${ORG}', '${LOC.mainStore}', '${PRD.rice}',    90, 10, 20,  300,  70, 0),
        ('${INV.salt}',   '${ORG}', '${LOC.mainStore}', '${PRD.salt}',   190,  0, 40,  500,  16, 0),
        ('${INV.dettol}', '${ORG}', '${LOC.mainStore}', '${PRD.dettol}', 168, 10, 35,  350,  28, 0),
        ('${INV.surf}',   '${ORG}', '${LOC.mainStore}', '${PRD.surf}',    40,  5, 15,  150,  90, 0),
        ('${INV.bread}',  '${ORG}', '${LOC.mainStore}', '${PRD.bread}',  150,  8, 25,  400,  32, 0)
      ON CONFLICT (id) DO NOTHING
    `);
  }

  private async seedPurchaseOrdersAsync(qr: QueryRunner): Promise<void> {
    await qr.query(`
      INSERT INTO core.purchase_orders
        (id, organization_id, supplier_id, po_number, status, expected_at, received_at, total_amount)
      VALUES
        ('${PO.po1}', '${ORG}', '${SUP.hul}',   'PO-DEMO-00001', '${EPurchaseOrderStatus.Received}',          NOW()-INTERVAL '20 days', NOW()-INTERVAL '18 days', 1960),
        ('${PO.po2}', '${ORG}', '${SUP.amul}',  'PO-DEMO-00002', '${EPurchaseOrderStatus.Received}',          NOW()-INTERVAL '15 days', NOW()-INTERVAL '13 days', 4360),
        ('${PO.po3}', '${ORG}', '${SUP.parle}', 'PO-DEMO-00003', '${EPurchaseOrderStatus.Received}',          NOW()-INTERVAL '10 days', NOW()-INTERVAL '8 days',  2600),
        ('${PO.po4}', '${ORG}', '${SUP.tata}',  'PO-DEMO-00004', '${EPurchaseOrderStatus.Ordered}',           NOW()+INTERVAL '3 days',  NULL,                     4300),
        ('${PO.po5}', '${ORG}', '${SUP.itc}',   'PO-DEMO-00005', '${EPurchaseOrderStatus.Draft}',             NOW()+INTERVAL '7 days',  NULL,                     6060)
      ON CONFLICT (id) DO NOTHING
    `);

    await qr.query(`
      INSERT INTO core.purchase_items
        (id, purchase_order_id, product_id, quantity_ordered, quantity_received, quantity_allocated, unit_cost, total_cost)
      VALUES
        ('44000001-0000-0000-0000-000000000001', '${PO.po1}', '${PRD.water}',  100, 100, 100, 10,  1000),
        ('44000001-0000-0000-0000-000000000002', '${PO.po1}', '${PRD.mango}',   80,  80,  80, 12,   960),
        ('44000001-0000-0000-0000-000000000003', '${PO.po2}', '${PRD.milk}',    50,  50,  50, 52,  2600),
        ('44000001-0000-0000-0000-000000000004', '${PO.po2}', '${PRD.dettol}',  60,  60,  60, 28,  1680),
        ('44000001-0000-0000-0000-000000000005', '${PO.po3}', '${PRD.parleg}', 200, 200, 200,  7,  1400),
        ('44000001-0000-0000-0000-000000000006', '${PO.po3}', '${PRD.lays}',   150, 150, 150,  8,  1200),
        ('44000001-0000-0000-0000-000000000007', '${PO.po4}', '${PRD.salt}',   100,   0,   0, 16,  1600),
        ('44000001-0000-0000-0000-000000000008', '${PO.po4}', '${PRD.surf}',    30,   0,   0, 90,  2700),
        ('44000001-0000-0000-0000-000000000009', '${PO.po5}', '${PRD.rice}',    50,   0,   0, 70,  3500),
        ('44000001-0000-0000-0000-00000000000a', '${PO.po5}', '${PRD.bread}',   80,   0,   0, 32,  2560)
      ON CONFLICT (id) DO NOTHING
    `);
  }

  private async seedOrdersAsync(qr: QueryRunner): Promise<void> {
    await qr.query(`
      INSERT INTO core.orders
        (id, order_number, location_id, customer_id, status, subtotal, tax_amount, total_amount, payment_status, fulfillment_mode)
      VALUES
        ('${ORD.ord1}', 'ORD-DEMO-00001', '${LOC.mainStore}', '${CUST.rahul}',  'COMPLETED', 1200, 0, 1200, 'PAID',   'pickup'),
        ('${ORD.ord2}', 'ORD-DEMO-00002', '${LOC.mainStore}', '${CUST.priya}',  'COMPLETED', 1275, 0, 1275, 'PAID',   'pickup'),
        ('${ORD.ord3}', 'ORD-DEMO-00003', '${LOC.mainStore}', '${CUST.suresh}', 'COMPLETED', 1894, 0, 1894, 'PAID',   'delivery'),
        ('${ORD.ord4}', 'ORD-DEMO-00004', '${LOC.mainStore}', '${CUST.vikram}', 'COMPLETED', 4040, 0, 4040, 'PAID',   'delivery'),
        ('${ORD.ord5}', 'ORD-DEMO-00005', '${LOC.mainStore}', '${CUST.kavita}', 'PENDING',   1700, 0, 1700, 'UNPAID', 'pickup')
      ON CONFLICT (id) DO NOTHING
    `);

    await qr.query(`
      INSERT INTO core.order_items (id, order_id, product_id, quantity, unit_price, tax_amount, line_total) VALUES
        ('55000001-0000-0000-0000-000000000001', '${ORD.ord1}', '${PRD.water}',  20,  18, 0,  360),
        ('55000001-0000-0000-0000-000000000002', '${ORD.ord1}', '${PRD.lays}',   30,  20, 0,  600),
        ('55000001-0000-0000-0000-000000000003', '${ORD.ord1}', '${PRD.salt}',   10,  24, 0,  240),
        ('55000001-0000-0000-0000-000000000004', '${ORD.ord2}', '${PRD.milk}',   15,  65, 0,  975),
        ('55000001-0000-0000-0000-000000000005', '${ORD.ord2}', '${PRD.parleg}', 25,  12, 0,  300),
        ('55000001-0000-0000-0000-000000000006', '${ORD.ord3}', '${PRD.rice}',   10,  95, 0,  950),
        ('55000001-0000-0000-0000-000000000007', '${ORD.ord3}', '${PRD.mango}',  20,  22, 0,  440),
        ('55000001-0000-0000-0000-000000000008', '${ORD.ord3}', '${PRD.dettol}', 12,  42, 0,  504),
        ('55000001-0000-0000-0000-000000000009', '${ORD.ord4}', '${PRD.surf}',   20, 130, 0, 2600),
        ('55000001-0000-0000-0000-00000000000a', '${ORD.ord4}', '${PRD.bread}',  30,  48, 0, 1440),
        ('55000001-0000-0000-0000-00000000000b', '${ORD.ord5}', '${PRD.water}',  50,  18, 0,  900),
        ('55000001-0000-0000-0000-00000000000c', '${ORD.ord5}', '${PRD.lays}',   40,  20, 0,  800)
      ON CONFLICT (id) DO NOTHING
    `);
  }

  // stock_in for received POs, stock_out for completed orders
  private async seedStockMovementsAsync(qr: QueryRunner): Promise<void> {
    await qr.query(`
      INSERT INTO core.stock_movements
        (id, inventory_id, location_id, product_id, reference_id, reference_type, movement_type, quantity, quantity_before, quantity_after, unit_cost, notes)
      VALUES
        ('66000001-0000-0000-0000-000000000001','${INV.water}',  '${LOC.mainStore}','${PRD.water}',  '${PO.po1}','purchase_order','stock_in', 100,130,230, 10,'Received PO-DEMO-00001'),
        ('66000001-0000-0000-0000-000000000002','${INV.mango}',  '${LOC.mainStore}','${PRD.mango}',  '${PO.po1}','purchase_order','stock_in',  80,130,210, 12,'Received PO-DEMO-00001'),
        ('66000001-0000-0000-0000-000000000003','${INV.milk}',   '${LOC.mainStore}','${PRD.milk}',   '${PO.po2}','purchase_order','stock_in',  50, 65,115, 52,'Received PO-DEMO-00002'),
        ('66000001-0000-0000-0000-000000000004','${INV.dettol}', '${LOC.mainStore}','${PRD.dettol}', '${PO.po2}','purchase_order','stock_in',  60,108,168, 28,'Received PO-DEMO-00002'),
        ('66000001-0000-0000-0000-000000000005','${INV.parleg}', '${LOC.mainStore}','${PRD.parleg}', '${PO.po3}','purchase_order','stock_in', 200,375,575,  7,'Received PO-DEMO-00003'),
        ('66000001-0000-0000-0000-000000000006','${INV.lays}',   '${LOC.mainStore}','${PRD.lays}',   '${PO.po3}','purchase_order','stock_in', 150,230,380,  8,'Received PO-DEMO-00003'),
        ('77000001-0000-0000-0000-000000000001','${INV.water}',  '${LOC.mainStore}','${PRD.water}',  '${ORD.ord1}','order','stock_out', 20,250,230, 10,'Sale ORD-DEMO-00001'),
        ('77000001-0000-0000-0000-000000000002','${INV.lays}',   '${LOC.mainStore}','${PRD.lays}',   '${ORD.ord1}','order','stock_out', 30,410,380,  8,'Sale ORD-DEMO-00001'),
        ('77000001-0000-0000-0000-000000000003','${INV.salt}',   '${LOC.mainStore}','${PRD.salt}',   '${ORD.ord1}','order','stock_out', 10,200,190, 16,'Sale ORD-DEMO-00001'),
        ('77000001-0000-0000-0000-000000000004','${INV.milk}',   '${LOC.mainStore}','${PRD.milk}',   '${ORD.ord2}','order','stock_out', 15,130,115, 52,'Sale ORD-DEMO-00002'),
        ('77000001-0000-0000-0000-000000000005','${INV.parleg}', '${LOC.mainStore}','${PRD.parleg}', '${ORD.ord2}','order','stock_out', 25,600,575,  7,'Sale ORD-DEMO-00002'),
        ('77000001-0000-0000-0000-000000000006','${INV.rice}',   '${LOC.mainStore}','${PRD.rice}',   '${ORD.ord3}','order','stock_out', 10,100, 90, 70,'Sale ORD-DEMO-00003'),
        ('77000001-0000-0000-0000-000000000007','${INV.mango}',  '${LOC.mainStore}','${PRD.mango}',  '${ORD.ord3}','order','stock_out', 20,230,210, 12,'Sale ORD-DEMO-00003'),
        ('77000001-0000-0000-0000-000000000008','${INV.dettol}', '${LOC.mainStore}','${PRD.dettol}', '${ORD.ord3}','order','stock_out', 12,180,168, 28,'Sale ORD-DEMO-00003'),
        ('77000001-0000-0000-0000-000000000009','${INV.surf}',   '${LOC.mainStore}','${PRD.surf}',   '${ORD.ord4}','order','stock_out', 20, 60, 40, 90,'Sale ORD-DEMO-00004'),
        ('77000001-0000-0000-0000-00000000000a','${INV.bread}',  '${LOC.mainStore}','${PRD.bread}',  '${ORD.ord4}','order','stock_out', 30,180,150, 32,'Sale ORD-DEMO-00004'),
        ('77000001-0000-0000-0000-00000000000b','${INV.water}',  '${LOC.mainStore}','${PRD.water}',  '${ORD.ord5}','order','stock_out', 50,280,230, 10,'Sale ORD-DEMO-00005'),
        ('77000001-0000-0000-0000-00000000000c','${INV.lays}',   '${LOC.mainStore}','${PRD.lays}',   '${ORD.ord5}','order','stock_out', 40,420,380,  8,'Sale ORD-DEMO-00005')
      ON CONFLICT (id) DO NOTHING
    `);
  }
}
