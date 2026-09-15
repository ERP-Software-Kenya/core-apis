import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1789469000000 implements MigrationInterface {
  name = 'Migration1789469000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "core"."customer_credit_transactions_type_enum" ADD VALUE IF NOT EXISTS 'sales_return'`);

    await queryRunner.query(`CREATE TYPE "core"."sales_returns_sale_type_enum" AS ENUM('normal', 'credit', 'black')`);
    await queryRunner.query(`CREATE TYPE "core"."sales_returns_status_enum" AS ENUM('draft', 'finalized', 'cancelled')`);
    await queryRunner.query(`CREATE TYPE "core"."sales_returns_refund_status_enum" AS ENUM('none', 'pending', 'completed')`);
    await queryRunner.query(`CREATE TYPE "core"."sales_return_items_condition_enum" AS ENUM('restock', 'damaged', 'unpublished_restock')`);
    await queryRunner.query(`CREATE TYPE "core"."purchase_returns_status_enum" AS ENUM('draft', 'finalized', 'cancelled')`);
    await queryRunner.query(`CREATE TYPE "core"."purchase_returns_dispatch_status_enum" AS ENUM('pending_dispatch', 'dispatched', 'credited')`);
    await queryRunner.query(`CREATE TYPE "core"."purchase_return_items_source_type_enum" AS ENUM('unallocated_received', 'allocated_stock')`);

    await queryRunner.query(`
      CREATE TABLE "core"."sales_returns" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "return_number" character varying(50) NOT NULL,
        "organization_id" uuid NOT NULL,
        "location_id" uuid NOT NULL,
        "bill_id" uuid NOT NULL,
        "customer_id" uuid,
        "sale_type" "core"."sales_returns_sale_type_enum" NOT NULL,
        "status" "core"."sales_returns_status_enum" NOT NULL DEFAULT 'draft',
        "refund_method" character varying(50),
        "refund_status" "core"."sales_returns_refund_status_enum" NOT NULL DEFAULT 'none',
        "subtotal" numeric(18,4) NOT NULL DEFAULT 0,
        "tax_amount" numeric(18,4) NOT NULL DEFAULT 0,
        "discount_amount" numeric(18,4) NOT NULL DEFAULT 0,
        "total_amount" numeric(18,4) NOT NULL DEFAULT 0,
        "reason" text,
        "notes" text,
        "created_by_id" uuid,
        "finalized_by_id" uuid,
        "finalized_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now(),
        CONSTRAINT "PK_sales_returns" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_sales_returns_return_number" UNIQUE ("return_number")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "core"."sales_return_items" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "sales_return_id" uuid NOT NULL,
        "bill_item_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "variant_id" uuid,
        "quantity" numeric(18,4) NOT NULL,
        "unit_price" numeric(18,4) NOT NULL,
        "tax_rate" numeric(18,4) NOT NULL DEFAULT 0,
        "tax_amount" numeric(18,4) NOT NULL DEFAULT 0,
        "discount_amount" numeric(18,4) NOT NULL DEFAULT 0,
        "line_total" numeric(18,4) NOT NULL DEFAULT 0,
        "condition" "core"."sales_return_items_condition_enum" NOT NULL,
        "reason" text,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now(),
        CONSTRAINT "PK_sales_return_items" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "core"."purchase_returns" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "return_number" character varying(50) NOT NULL,
        "organization_id" uuid NOT NULL,
        "purchase_order_id" uuid NOT NULL,
        "supplier_id" uuid NOT NULL,
        "status" "core"."purchase_returns_status_enum" NOT NULL DEFAULT 'draft',
        "dispatch_status" "core"."purchase_returns_dispatch_status_enum" NOT NULL DEFAULT 'pending_dispatch',
        "total_amount" numeric(18,4) NOT NULL DEFAULT 0,
        "reason" text,
        "notes" text,
        "created_by_id" uuid,
        "finalized_by_id" uuid,
        "finalized_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now(),
        CONSTRAINT "PK_purchase_returns" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_purchase_returns_return_number" UNIQUE ("return_number")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "core"."purchase_return_items" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "purchase_return_id" uuid NOT NULL,
        "purchase_item_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "quantity" numeric(18,4) NOT NULL,
        "unit_cost" numeric(18,4) NOT NULL,
        "line_total" numeric(18,4) NOT NULL DEFAULT 0,
        "source_type" "core"."purchase_return_items_source_type_enum" NOT NULL,
        "location_id" uuid,
        "reason" text,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now(),
        CONSTRAINT "PK_purchase_return_items" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`CREATE INDEX "IX_sales_returns_org_location_status" ON "core"."sales_returns" ("organization_id", "location_id", "status")`);
    await queryRunner.query(`CREATE INDEX "IX_sales_return_items_bill_item" ON "core"."sales_return_items" ("bill_item_id")`);
    await queryRunner.query(`CREATE INDEX "IX_purchase_returns_org_status" ON "core"."purchase_returns" ("organization_id", "status")`);
    await queryRunner.query(`CREATE INDEX "IX_purchase_return_items_purchase_item" ON "core"."purchase_return_items" ("purchase_item_id")`);

    await queryRunner.query(`ALTER TABLE "core"."sales_returns" ADD CONSTRAINT "FK_sales_returns_org" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."sales_returns" ADD CONSTRAINT "FK_sales_returns_location" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."sales_returns" ADD CONSTRAINT "FK_sales_returns_bill" FOREIGN KEY ("bill_id") REFERENCES "core"."bills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."sales_returns" ADD CONSTRAINT "FK_sales_returns_customer" FOREIGN KEY ("customer_id") REFERENCES "core"."customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."sales_returns" ADD CONSTRAINT "FK_sales_returns_created_by" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."sales_returns" ADD CONSTRAINT "FK_sales_returns_finalized_by" FOREIGN KEY ("finalized_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."sales_return_items" ADD CONSTRAINT "FK_sales_return_items_return" FOREIGN KEY ("sales_return_id") REFERENCES "core"."sales_returns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."sales_return_items" ADD CONSTRAINT "FK_sales_return_items_bill_item" FOREIGN KEY ("bill_item_id") REFERENCES "core"."bill_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."sales_return_items" ADD CONSTRAINT "FK_sales_return_items_product" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    await queryRunner.query(`ALTER TABLE "core"."purchase_returns" ADD CONSTRAINT "FK_purchase_returns_org" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_returns" ADD CONSTRAINT "FK_purchase_returns_order" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."purchase_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_returns" ADD CONSTRAINT "FK_purchase_returns_supplier" FOREIGN KEY ("supplier_id") REFERENCES "core"."suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_returns" ADD CONSTRAINT "FK_purchase_returns_created_by" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_returns" ADD CONSTRAINT "FK_purchase_returns_finalized_by" FOREIGN KEY ("finalized_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" ADD CONSTRAINT "FK_purchase_return_items_return" FOREIGN KEY ("purchase_return_id") REFERENCES "core"."purchase_returns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" ADD CONSTRAINT "FK_purchase_return_items_purchase_item" FOREIGN KEY ("purchase_item_id") REFERENCES "core"."purchase_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" ADD CONSTRAINT "FK_purchase_return_items_product" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" ADD CONSTRAINT "FK_purchase_return_items_location" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" DROP CONSTRAINT "FK_purchase_return_items_location"`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" DROP CONSTRAINT "FK_purchase_return_items_product"`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" DROP CONSTRAINT "FK_purchase_return_items_purchase_item"`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" DROP CONSTRAINT "FK_purchase_return_items_return"`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_returns" DROP CONSTRAINT "FK_purchase_returns_finalized_by"`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_returns" DROP CONSTRAINT "FK_purchase_returns_created_by"`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_returns" DROP CONSTRAINT "FK_purchase_returns_supplier"`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_returns" DROP CONSTRAINT "FK_purchase_returns_order"`);
    await queryRunner.query(`ALTER TABLE "core"."purchase_returns" DROP CONSTRAINT "FK_purchase_returns_org"`);
    await queryRunner.query(`ALTER TABLE "core"."sales_return_items" DROP CONSTRAINT "FK_sales_return_items_product"`);
    await queryRunner.query(`ALTER TABLE "core"."sales_return_items" DROP CONSTRAINT "FK_sales_return_items_bill_item"`);
    await queryRunner.query(`ALTER TABLE "core"."sales_return_items" DROP CONSTRAINT "FK_sales_return_items_return"`);
    await queryRunner.query(`ALTER TABLE "core"."sales_returns" DROP CONSTRAINT "FK_sales_returns_finalized_by"`);
    await queryRunner.query(`ALTER TABLE "core"."sales_returns" DROP CONSTRAINT "FK_sales_returns_created_by"`);
    await queryRunner.query(`ALTER TABLE "core"."sales_returns" DROP CONSTRAINT "FK_sales_returns_customer"`);
    await queryRunner.query(`ALTER TABLE "core"."sales_returns" DROP CONSTRAINT "FK_sales_returns_bill"`);
    await queryRunner.query(`ALTER TABLE "core"."sales_returns" DROP CONSTRAINT "FK_sales_returns_location"`);
    await queryRunner.query(`ALTER TABLE "core"."sales_returns" DROP CONSTRAINT "FK_sales_returns_org"`);
    await queryRunner.query(`DROP INDEX "core"."IX_purchase_return_items_purchase_item"`);
    await queryRunner.query(`DROP INDEX "core"."IX_purchase_returns_org_status"`);
    await queryRunner.query(`DROP INDEX "core"."IX_sales_return_items_bill_item"`);
    await queryRunner.query(`DROP INDEX "core"."IX_sales_returns_org_location_status"`);
    await queryRunner.query(`DROP TABLE "core"."purchase_return_items"`);
    await queryRunner.query(`DROP TABLE "core"."purchase_returns"`);
    await queryRunner.query(`DROP TABLE "core"."sales_return_items"`);
    await queryRunner.query(`DROP TABLE "core"."sales_returns"`);
    await queryRunner.query(`DROP TYPE "core"."purchase_return_items_source_type_enum"`);
    await queryRunner.query(`DROP TYPE "core"."purchase_returns_dispatch_status_enum"`);
    await queryRunner.query(`DROP TYPE "core"."purchase_returns_status_enum"`);
    await queryRunner.query(`DROP TYPE "core"."sales_return_items_condition_enum"`);
    await queryRunner.query(`DROP TYPE "core"."sales_returns_refund_status_enum"`);
    await queryRunner.query(`DROP TYPE "core"."sales_returns_status_enum"`);
    await queryRunner.query(`DROP TYPE "core"."sales_returns_sale_type_enum"`);
    await queryRunner.query(`UPDATE "core"."customer_credit_transactions" SET "type" = 'adjustment' WHERE "type" = 'sales_return'`);
    await queryRunner.query(`ALTER TYPE "core"."customer_credit_transactions_type_enum" RENAME TO "customer_credit_transactions_type_enum_old"`);
    await queryRunner.query(`CREATE TYPE "core"."customer_credit_transactions_type_enum" AS ENUM('credit_sale', 'payment', 'adjustment')`);
    await queryRunner.query(`ALTER TABLE "core"."customer_credit_transactions" ALTER COLUMN "type" TYPE "core"."customer_credit_transactions_type_enum" USING "type"::"text"::"core"."customer_credit_transactions_type_enum"`);
    await queryRunner.query(`DROP TYPE "core"."customer_credit_transactions_type_enum_old"`);
  }
}
