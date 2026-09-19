import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1789812283669 implements MigrationInterface {
    name = 'Migration1789812283669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "core"."locations" DROP CONSTRAINT "FK__locations__parent"`);
        await queryRunner.query(`CREATE TABLE "core"."unpublished_stock_purchase_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "purchase_order_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity_ordered" numeric(18,4) NOT NULL, "quantity_received" numeric(18,4) NOT NULL DEFAULT '0', "quantity_allocated" numeric(18,4) NOT NULL DEFAULT '0', "unit_cost" numeric(18,4) NOT NULL, "total_cost" numeric(18,4) NOT NULL DEFAULT '0', "pack_quantity" numeric(18,4), "pack_size_snapshot" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_unpublished_stock_purchase_items" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "core"."unpublished_stock_purchase_orders_status_enum" AS ENUM('draft', 'ordered', 'partially_received', 'received', 'partially_allocated', 'allocated', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "core"."unpublished_stock_purchase_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "supplier_id" uuid NOT NULL, "created_by_id" uuid, "branch_id" uuid, "po_number" character varying(50) NOT NULL, "status" "core"."unpublished_stock_purchase_orders_status_enum" NOT NULL DEFAULT 'draft', "expected_at" TIMESTAMP, "received_at" TIMESTAMP, "total_amount" numeric(18,4) NOT NULL DEFAULT '0', "amount_paid" numeric(18,4) NOT NULL DEFAULT '0', "notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_fc4192ac1be386dcd634e6fa90e" UNIQUE ("po_number"), CONSTRAINT "PK_unpublished_stock_purchase_orders" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."unpublished_stock_purchase_item_allocations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "purchase_order_id" uuid NOT NULL, "purchase_item_id" uuid NOT NULL, "location_id" uuid NOT NULL, "quantity" numeric(18,4) NOT NULL, "performed_by_id" uuid, "notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_unpublished_stock_purchase_item_allocations" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."locations" DROP COLUMN "parent_id"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" ADD CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchase_orders" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."unpublished_stock_purchase_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" ADD CONSTRAINT "FK__unpublished_stock_purchase_items__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_orders" ADD CONSTRAINT "FK__unpublished_stock_purchase_orders__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_orders" ADD CONSTRAINT "FK__unpublished_stock_purchase_orders__suppliers" FOREIGN KEY ("supplier_id") REFERENCES "core"."suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_orders" ADD CONSTRAINT "FK__unpublished_stock_purchase_orders__users" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_orders" ADD CONSTRAINT "FK__unpublished_stock_purchase_orders__branches" FOREIGN KEY ("branch_id") REFERENCES "core"."branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_item_allocations" ADD CONSTRAINT "FK__uspia__us_purchase_orders" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."unpublished_stock_purchase_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_item_allocations" ADD CONSTRAINT "FK__uspia__us_purchase_items" FOREIGN KEY ("purchase_item_id") REFERENCES "core"."unpublished_stock_purchase_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_item_allocations" ADD CONSTRAINT "FK__unpublished_stock_purchase_item_allocations__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_item_allocations" ADD CONSTRAINT "FK__unpublished_stock_purchase_item_allocations__users" FOREIGN KEY ("performed_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_item_allocations" DROP CONSTRAINT "FK__unpublished_stock_purchase_item_allocations__users"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_item_allocations" DROP CONSTRAINT "FK__unpublished_stock_purchase_item_allocations__locations"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_item_allocations" DROP CONSTRAINT "FK__uspia__us_purchase_items"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_item_allocations" DROP CONSTRAINT "FK__uspia__us_purchase_orders"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_orders" DROP CONSTRAINT "FK__unpublished_stock_purchase_orders__branches"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_orders" DROP CONSTRAINT "FK__unpublished_stock_purchase_orders__users"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_orders" DROP CONSTRAINT "FK__unpublished_stock_purchase_orders__suppliers"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_orders" DROP CONSTRAINT "FK__unpublished_stock_purchase_orders__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" DROP CONSTRAINT "FK__unpublished_stock_purchase_items__products"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" DROP CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchase_orders"`);
        await queryRunner.query(`ALTER TABLE "core"."locations" ADD "parent_id" uuid`);
        await queryRunner.query(`DROP TABLE "core"."unpublished_stock_purchase_item_allocations"`);
        await queryRunner.query(`DROP TABLE "core"."unpublished_stock_purchase_orders"`);
        await queryRunner.query(`DROP TYPE "core"."unpublished_stock_purchase_orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "core"."unpublished_stock_purchase_items"`);
        // await queryRunner.query(`ALTER TABLE "core"."locations" ADD CONSTRAINT "FK__locations__parent" FOREIGN KEY ("parent_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
