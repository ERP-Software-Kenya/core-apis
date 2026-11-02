import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1793664000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of ['stock_movements', 'order_items', 'purchase_items', 'bill_items']) {
      await queryRunner.query(`ALTER TABLE "core"."${table}" ADD "product_unit_id" uuid`);
      await queryRunner.query(`ALTER TABLE "core"."${table}" ADD "selected_unit_id" uuid`);
      await queryRunner.query(`ALTER TABLE "core"."${table}" ADD "selected_unit_name_snapshot" varchar(100)`);
      await queryRunner.query(`ALTER TABLE "core"."${table}" ADD "selected_unit_symbol_snapshot" varchar(20)`);
      await queryRunner.query(`ALTER TABLE "core"."${table}" ADD "entered_quantity" numeric(24,8)`);
      await queryRunner.query(`ALTER TABLE "core"."${table}" ADD "conversion_factor_snapshot" numeric(24,8)`);
      await queryRunner.query(`ALTER TABLE "core"."${table}" ADD "base_unit_id" uuid`);
    }
    await queryRunner.query(`ALTER TABLE "core"."order_items" ADD "price_per_base_unit" numeric(18,4)`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_items" ADD "price_per_selected_unit" numeric(18,4)`);
    await queryRunner.query(`ALTER TABLE "core"."bill_items" ADD "price_per_base_unit" numeric(18,4)`);
    await queryRunner.query(`ALTER TABLE "core"."stock_movements" ADD "quantity_components_snapshot" jsonb`);

    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM "core"."inventory" i
          JOIN "core"."products" p ON p.id = i.product_id
          LEFT JOIN "core"."product_units" pu
            ON pu.product_id = i.product_id AND pu.unit_id = COALESCE(i.unit_id, p.base_unit_id)
          WHERE p.base_unit_id IS NULL OR pu.id IS NULL
        ) THEN
          RAISE EXCEPTION 'Multi-UOM migration stopped: inventory contains products or units without an unambiguous configured base conversion';
        END IF;
      END $$
    `);

    await queryRunner.query(`
      UPDATE "core"."stock_movements" sm SET
        product_unit_id = pu.id,
        selected_unit_id = pu.unit_id,
        selected_unit_name_snapshot = ou.name,
        selected_unit_symbol_snapshot = ou.symbol,
        entered_quantity = sm.quantity,
        conversion_factor_snapshot = pu.conversion_factor,
        base_unit_id = p.base_unit_id,
        quantity = sm.quantity * pu.conversion_factor,
        quantity_before = sm.quantity_before * pu.conversion_factor,
        quantity_after = sm.quantity_after * pu.conversion_factor,
        unit_cost = CASE WHEN sm.unit_cost IS NULL THEN NULL ELSE sm.unit_cost / pu.conversion_factor END
      FROM "core"."inventory" i
      JOIN "core"."products" p ON p.id = i.product_id
      JOIN "core"."product_units" pu ON pu.product_id = i.product_id AND pu.unit_id = COALESCE(i.unit_id, p.base_unit_id)
      JOIN "core"."organization_units" ou ON ou.id = pu.unit_id
      WHERE sm.inventory_id = i.id
    `);

    await queryRunner.query(`
      CREATE TEMP TABLE multi_uom_inventory_rollup ON COMMIT DROP AS
      SELECT
        MIN(i.id::text)::uuid AS keeper_id,
        i.organization_id, i.location_id, i.product_id, p.base_unit_id,
        SUM(i.quantity_on_hand * pu.conversion_factor) AS quantity_on_hand,
        SUM(i.quantity_reserved * pu.conversion_factor) AS quantity_reserved,
        SUM(i.reorder_level * pu.conversion_factor) AS reorder_level,
        CASE WHEN BOOL_OR(i.max_stock IS NULL) THEN NULL ELSE SUM(i.max_stock * pu.conversion_factor) END AS max_stock,
        CASE WHEN SUM(i.quantity_on_hand * pu.conversion_factor) = 0 THEN NULL
          ELSE SUM(i.quantity_on_hand * COALESCE(i.average_cost, 0)) / SUM(i.quantity_on_hand * pu.conversion_factor)
        END AS average_cost
      FROM "core"."inventory" i
      JOIN "core"."products" p ON p.id = i.product_id
      JOIN "core"."product_units" pu ON pu.product_id = i.product_id AND pu.unit_id = COALESCE(i.unit_id, p.base_unit_id)
      GROUP BY i.organization_id, i.location_id, i.product_id, p.base_unit_id
    `);
    await queryRunner.query(`
      UPDATE "core"."stock_movements" sm SET inventory_id = r.keeper_id
      FROM "core"."inventory" i
      JOIN multi_uom_inventory_rollup r ON r.organization_id=i.organization_id AND r.location_id=i.location_id AND r.product_id=i.product_id
      WHERE sm.inventory_id=i.id AND i.id<>r.keeper_id
    `);
    await queryRunner.query(`
      UPDATE "core"."product_logs" pl SET inventory_id = r.keeper_id
      FROM "core"."inventory" i
      JOIN multi_uom_inventory_rollup r ON r.organization_id=i.organization_id AND r.location_id=i.location_id AND r.product_id=i.product_id
      WHERE pl.inventory_id=i.id AND i.id<>r.keeper_id
    `);
    await queryRunner.query(`
      DELETE FROM "core"."inventory" i USING multi_uom_inventory_rollup r
      WHERE i.organization_id=r.organization_id AND i.location_id=r.location_id AND i.product_id=r.product_id AND i.id<>r.keeper_id
    `);
    await queryRunner.query(`
      UPDATE "core"."inventory" i SET
        unit_id=r.base_unit_id, quantity_on_hand=r.quantity_on_hand, quantity_reserved=r.quantity_reserved,
        reorder_level=r.reorder_level, max_stock=r.max_stock, average_cost=r.average_cost
      FROM multi_uom_inventory_rollup r WHERE i.id=r.keeper_id
    `);
    await queryRunner.query(`ALTER TABLE "core"."inventory" DROP CONSTRAINT "UQ__inventory__org_location_product_unit"`);
    await queryRunner.query(`ALTER TABLE "core"."inventory" ADD CONSTRAINT "UQ__inventory__org_location_product" UNIQUE ("organization_id", "location_id", "product_id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "core"."inventory" DROP CONSTRAINT "UQ__inventory__org_location_product"`);
    await queryRunner.query(`ALTER TABLE "core"."inventory" ADD CONSTRAINT "UQ__inventory__org_location_product_unit" UNIQUE ("organization_id", "location_id", "product_id", "unit_id")`);
    await queryRunner.query(`ALTER TABLE "core"."stock_movements" DROP COLUMN "quantity_components_snapshot"`);
    await queryRunner.query(`ALTER TABLE "core"."bill_items" DROP COLUMN "price_per_base_unit"`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_items" DROP COLUMN "price_per_selected_unit"`);
    await queryRunner.query(`ALTER TABLE "core"."order_items" DROP COLUMN "price_per_base_unit"`);
    for (const table of ['bill_items', 'purchase_items', 'order_items', 'stock_movements']) {
      await queryRunner.query(`ALTER TABLE "core"."${table}" DROP COLUMN "base_unit_id"`);
      await queryRunner.query(`ALTER TABLE "core"."${table}" DROP COLUMN "conversion_factor_snapshot"`);
      await queryRunner.query(`ALTER TABLE "core"."${table}" DROP COLUMN "entered_quantity"`);
      await queryRunner.query(`ALTER TABLE "core"."${table}" DROP COLUMN "selected_unit_symbol_snapshot"`);
      await queryRunner.query(`ALTER TABLE "core"."${table}" DROP COLUMN "selected_unit_name_snapshot"`);
      await queryRunner.query(`ALTER TABLE "core"."${table}" DROP COLUMN "selected_unit_id"`);
      await queryRunner.query(`ALTER TABLE "core"."${table}" DROP COLUMN "product_unit_id"`);
    }
  }
}
