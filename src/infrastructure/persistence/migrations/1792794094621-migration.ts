import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1792794094621 implements MigrationInterface {
    name = 'Migration1792794094621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" DROP CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchas"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP CONSTRAINT "UQ__inventory__org_location_product"`);
        await queryRunner.query(`CREATE TABLE "core"."organization_units" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "name" character varying(100) NOT NULL, "symbol" character varying(20) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "sort_order" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ__organization_units__org_symbol" UNIQUE ("organization_id", "symbol"), CONSTRAINT "PK_organization_units" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."product_units" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "unit_id" uuid NOT NULL, "is_default" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ__product_units__product_unit" UNIQUE ("product_id", "unit_id"), CONSTRAINT "PK_product_units" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."products" DROP COLUMN "unit"`);
        await queryRunner.query(`DROP TYPE "core"."products_unit_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD "unit_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD CONSTRAINT "UQ__inventory__org_location_product_unit" UNIQUE ("organization_id", "location_id", "product_id", "unit_id")`);
        await queryRunner.query(`ALTER TABLE "core"."organization_units" ADD CONSTRAINT "FK__organization_units__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."product_units" ADD CONSTRAINT "FK__product_units__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."product_units" ADD CONSTRAINT "FK__product_units__organization_units" FOREIGN KEY ("unit_id") REFERENCES "core"."organization_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD CONSTRAINT "FK__inventory__organization_units" FOREIGN KEY ("unit_id") REFERENCES "core"."organization_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" ADD CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchase_orders" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."unpublished_stock_purchase_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" DROP CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchase_orders"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP CONSTRAINT "FK__inventory__organization_units"`);
        await queryRunner.query(`ALTER TABLE "core"."product_units" DROP CONSTRAINT "FK__product_units__organization_units"`);
        await queryRunner.query(`ALTER TABLE "core"."product_units" DROP CONSTRAINT "FK__product_units__products"`);
        await queryRunner.query(`ALTER TABLE "core"."organization_units" DROP CONSTRAINT "FK__organization_units__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP CONSTRAINT "UQ__inventory__org_location_product_unit"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP COLUMN "unit_id"`);
        await queryRunner.query(`CREATE TYPE "core"."products_unit_enum" AS ENUM('piece', 'kg', 'gram', 'litre', 'ml', 'box', 'pack', 'dozen', 'bag', 'pkt', 'meter', 'roll', 'feet', 'pcs', 'pair', 'bundle')`);
        await queryRunner.query(`ALTER TABLE "core"."products" ADD "unit" "core"."products_unit_enum" NOT NULL DEFAULT 'piece'`);
        await queryRunner.query(`DROP TABLE "core"."product_units"`);
        await queryRunner.query(`DROP TABLE "core"."organization_units"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD CONSTRAINT "UQ__inventory__org_location_product" UNIQUE ("organization_id", "location_id", "product_id")`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" ADD CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchas" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."unpublished_stock_purchase_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
