import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1792790857075 implements MigrationInterface {
    name = 'Migration1792790857075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" DROP CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchas"`);
        await queryRunner.query(`CREATE TABLE "core"."product_units" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "unit_id" uuid NOT NULL, "is_default" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ__product_units__product_unit" UNIQUE ("product_id", "unit_id"), CONSTRAINT "PK_product_units" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."products" DROP COLUMN "unit"`);
        await queryRunner.query(`DROP TYPE "core"."products_unit_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."product_units" ADD CONSTRAINT "FK__product_units__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."product_units" ADD CONSTRAINT "FK__product_units__organization_units" FOREIGN KEY ("unit_id") REFERENCES "core"."organization_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" ADD CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchase_orders" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."unpublished_stock_purchase_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" DROP CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchase_orders"`);
        await queryRunner.query(`ALTER TABLE "core"."product_units" DROP CONSTRAINT "FK__product_units__organization_units"`);
        await queryRunner.query(`ALTER TABLE "core"."product_units" DROP CONSTRAINT "FK__product_units__products"`);
        await queryRunner.query(`CREATE TYPE "core"."products_unit_enum" AS ENUM('piece', 'kg', 'gram', 'litre', 'ml', 'box', 'pack', 'dozen', 'bag', 'pkt', 'meter', 'roll', 'feet', 'pcs', 'pair', 'bundle')`);
        await queryRunner.query(`ALTER TABLE "core"."products" ADD "unit" "core"."products_unit_enum" NOT NULL DEFAULT 'piece'`);
        await queryRunner.query(`DROP TABLE "core"."product_units"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" ADD CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchas" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."unpublished_stock_purchase_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
