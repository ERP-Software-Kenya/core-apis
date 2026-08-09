import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Batched sales-v2 schema:
 * - org_manager role enum value + seed row
 * - rebuild bills as POS checkout bills + bill_items
 * - customer credit_limit / credit_balance
 * - credit approval / credit txn / commission payable tables
 */
export class Migration1800000000004 implements MigrationInterface {
  name = 'Migration1800000000004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "core"."roles_name_enum" ADD VALUE IF NOT EXISTS 'org_manager'`);
    await queryRunner.query(`
      INSERT INTO "core"."roles" ("id", "name", "description")
      SELECT uuid_generate_v4(), 'org_manager', 'Equal authority to Org Admin for approvals, black sales, and black inventory'
      WHERE NOT EXISTS (SELECT 1 FROM "core"."roles" WHERE "name" = 'org_manager')
    `);

    await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT IF EXISTS "FK__bills__stores"`);
    await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT IF EXISTS "FK__bills__suppliers"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "core"."bill_items"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "core"."bills"`);

    await queryRunner.query(`CREATE TYPE "core"."bills_status_enum" AS ENUM('INITIATED', 'DRAFT', 'COMPLETED', 'CANCELLED')`);
    await queryRunner.query(`CREATE TYPE "core"."bills_payment_method_enum" AS ENUM('CASH', 'CARD', 'UPI', 'NET_BANKING', 'CHEQUE', 'CREDIT')`);
    await queryRunner.query(`CREATE TYPE "core"."bills_sale_type_enum" AS ENUM('normal', 'credit', 'black')`);
    await queryRunner.query(`CREATE TYPE "core"."bills_customer_type_enum" AS ENUM('regular', 'new', 'shop', 'big_customer')`);
    await queryRunner.query(`CREATE TYPE "core"."bills_payment_timing_enum" AS ENUM('before_delivery', 'after_delivery', 'half', 'cod')`);

    await queryRunner.query(`
      CREATE TABLE "core"."bills" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "bill_number" character varying(50) NOT NULL,
        "organization_id" uuid NOT NULL,
        "location_id" uuid NOT NULL,
        "customer_id" uuid,
        "created_by_id" uuid,
        "walk_in_name" character varying(255),
        "walk_in_phone" character varying(30),
        "walk_in_gstin" character varying(20),
        "status" "core"."bills_status_enum" NOT NULL DEFAULT 'INITIATED',
        "payment_method" "core"."bills_payment_method_enum",
        "sale_type" "core"."bills_sale_type_enum" NOT NULL DEFAULT 'normal',
        "customer_type" "core"."bills_customer_type_enum",
        "payment_timing" "core"."bills_payment_timing_enum",
        "partial_amount" numeric(18,4),
        "black_amount" numeric(18,4) NOT NULL DEFAULT '0',
        "facilitator_user_id" uuid,
        "facilitator_name" character varying(255),
        "commission_amount" numeric(18,4) NOT NULL DEFAULT '0',
        "subtotal" numeric(18,4) NOT NULL DEFAULT '0',
        "tax_amount" numeric(18,4) NOT NULL DEFAULT '0',
        "discount_amount" numeric(18,4) NOT NULL DEFAULT '0',
        "total_amount" numeric(18,4) NOT NULL DEFAULT '0',
        "notes" text,
        "billed_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now(),
        CONSTRAINT "UQ_bills_bill_number" UNIQUE ("bill_number"),
        CONSTRAINT "PK_bills" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`CREATE INDEX "IX__bills__org_location_status" ON "core"."bills" ("organization_id", "location_id", "status")`);
    await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "FK__bills__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "FK__bills__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "FK__bills__customers" FOREIGN KEY ("customer_id") REFERENCES "core"."customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "FK__bills__users" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    await queryRunner.query(`
      CREATE TABLE "core"."bill_items" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "bill_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "variant_id" uuid,
        "quantity" numeric(18,4) NOT NULL,
        "unit_price" numeric(18,4) NOT NULL,
        "tax_rate" numeric(18,4) NOT NULL DEFAULT '0',
        "tax_amount" numeric(18,4) NOT NULL DEFAULT '0',
        "discount_amount" numeric(18,4) NOT NULL DEFAULT '0',
        "line_total" numeric(18,4) NOT NULL DEFAULT '0',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now(),
        CONSTRAINT "PK_bill_items" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`ALTER TABLE "core"."bill_items" ADD CONSTRAINT "FK__bill_items__bills" FOREIGN KEY ("bill_id") REFERENCES "core"."bills"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."bill_items" ADD CONSTRAINT "FK__bill_items__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    await queryRunner.query(`ALTER TABLE "core"."customers" ADD "credit_limit" numeric(18,4)`);
    await queryRunner.query(`ALTER TABLE "core"."customers" ADD "credit_balance" numeric(18,4) NOT NULL DEFAULT '0'`);

    await queryRunner.query(`CREATE TYPE "core"."customer_credit_transactions_type_enum" AS ENUM('credit_sale', 'payment', 'adjustment')`);
    await queryRunner.query(`
      CREATE TABLE "core"."customer_credit_transactions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "customer_id" uuid NOT NULL,
        "bill_id" uuid,
        "type" "core"."customer_credit_transactions_type_enum" NOT NULL,
        "amount" numeric(18,4) NOT NULL,
        "balance_before" numeric(18,4) NOT NULL,
        "balance_after" numeric(18,4) NOT NULL,
        "performed_by_id" uuid,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_customer_credit_transactions" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`ALTER TABLE "core"."customer_credit_transactions" ADD CONSTRAINT "FK__customer_credit_transactions__customers" FOREIGN KEY ("customer_id") REFERENCES "core"."customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."customer_credit_transactions" ADD CONSTRAINT "FK__customer_credit_transactions__bills" FOREIGN KEY ("bill_id") REFERENCES "core"."bills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."customer_credit_transactions" ADD CONSTRAINT "FK__customer_credit_transactions__users" FOREIGN KEY ("performed_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    await queryRunner.query(`CREATE TYPE "core"."credit_approval_requests_status_enum" AS ENUM('pending', 'approved', 'rejected')`);
    await queryRunner.query(`
      CREATE TABLE "core"."credit_approval_requests" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "organization_id" uuid NOT NULL,
        "customer_id" uuid NOT NULL,
        "bill_id" uuid NOT NULL,
        "requested_amount" numeric(18,4) NOT NULL,
        "requested_by_id" uuid NOT NULL,
        "status" "core"."credit_approval_requests_status_enum" NOT NULL DEFAULT 'pending',
        "decided_by_id" uuid,
        "decided_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_credit_approval_requests" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`ALTER TABLE "core"."credit_approval_requests" ADD CONSTRAINT "FK__credit_approval_requests__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."credit_approval_requests" ADD CONSTRAINT "FK__credit_approval_requests__customers" FOREIGN KEY ("customer_id") REFERENCES "core"."customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."credit_approval_requests" ADD CONSTRAINT "FK__credit_approval_requests__bills" FOREIGN KEY ("bill_id") REFERENCES "core"."bills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."credit_approval_requests" ADD CONSTRAINT "FK__credit_approval_requests__requested_by__users" FOREIGN KEY ("requested_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."credit_approval_requests" ADD CONSTRAINT "FK__credit_approval_requests__decided_by__users" FOREIGN KEY ("decided_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    await queryRunner.query(`CREATE TYPE "core"."commission_payables_status_enum" AS ENUM('owed', 'paid')`);
    await queryRunner.query(`
      CREATE TABLE "core"."commission_payables" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "organization_id" uuid NOT NULL,
        "bill_id" uuid NOT NULL,
        "facilitator_user_id" uuid,
        "facilitator_name" character varying(255),
        "amount" numeric(18,4) NOT NULL,
        "status" "core"."commission_payables_status_enum" NOT NULL DEFAULT 'owed',
        "paid_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_commission_payables" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`ALTER TABLE "core"."commission_payables" ADD CONSTRAINT "FK__commission_payables__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."commission_payables" ADD CONSTRAINT "FK__commission_payables__bills" FOREIGN KEY ("bill_id") REFERENCES "core"."bills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."commission_payables" ADD CONSTRAINT "FK__commission_payables__users" FOREIGN KEY ("facilitator_user_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "core"."commission_payables" DROP CONSTRAINT "FK__commission_payables__users"`);
    await queryRunner.query(`ALTER TABLE "core"."commission_payables" DROP CONSTRAINT "FK__commission_payables__bills"`);
    await queryRunner.query(`ALTER TABLE "core"."commission_payables" DROP CONSTRAINT "FK__commission_payables__organizations"`);
    await queryRunner.query(`DROP TABLE "core"."commission_payables"`);
    await queryRunner.query(`DROP TYPE "core"."commission_payables_status_enum"`);

    await queryRunner.query(`ALTER TABLE "core"."credit_approval_requests" DROP CONSTRAINT "FK__credit_approval_requests__decided_by__users"`);
    await queryRunner.query(`ALTER TABLE "core"."credit_approval_requests" DROP CONSTRAINT "FK__credit_approval_requests__requested_by__users"`);
    await queryRunner.query(`ALTER TABLE "core"."credit_approval_requests" DROP CONSTRAINT "FK__credit_approval_requests__bills"`);
    await queryRunner.query(`ALTER TABLE "core"."credit_approval_requests" DROP CONSTRAINT "FK__credit_approval_requests__customers"`);
    await queryRunner.query(`ALTER TABLE "core"."credit_approval_requests" DROP CONSTRAINT "FK__credit_approval_requests__organizations"`);
    await queryRunner.query(`DROP TABLE "core"."credit_approval_requests"`);
    await queryRunner.query(`DROP TYPE "core"."credit_approval_requests_status_enum"`);

    await queryRunner.query(`ALTER TABLE "core"."customer_credit_transactions" DROP CONSTRAINT "FK__customer_credit_transactions__users"`);
    await queryRunner.query(`ALTER TABLE "core"."customer_credit_transactions" DROP CONSTRAINT "FK__customer_credit_transactions__bills"`);
    await queryRunner.query(`ALTER TABLE "core"."customer_credit_transactions" DROP CONSTRAINT "FK__customer_credit_transactions__customers"`);
    await queryRunner.query(`DROP TABLE "core"."customer_credit_transactions"`);
    await queryRunner.query(`DROP TYPE "core"."customer_credit_transactions_type_enum"`);

    await queryRunner.query(`ALTER TABLE "core"."customers" DROP COLUMN "credit_balance"`);
    await queryRunner.query(`ALTER TABLE "core"."customers" DROP COLUMN "credit_limit"`);

    await queryRunner.query(`ALTER TABLE "core"."bill_items" DROP CONSTRAINT "FK__bill_items__products"`);
    await queryRunner.query(`ALTER TABLE "core"."bill_items" DROP CONSTRAINT "FK__bill_items__bills"`);
    await queryRunner.query(`DROP TABLE "core"."bill_items"`);

    await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT "FK__bills__users"`);
    await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT "FK__bills__customers"`);
    await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT "FK__bills__locations"`);
    await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT "FK__bills__organizations"`);
    await queryRunner.query(`DROP INDEX "core"."IX__bills__org_location_status"`);
    await queryRunner.query(`DROP TABLE "core"."bills"`);
    await queryRunner.query(`DROP TYPE "core"."bills_payment_timing_enum"`);
    await queryRunner.query(`DROP TYPE "core"."bills_customer_type_enum"`);
    await queryRunner.query(`DROP TYPE "core"."bills_sale_type_enum"`);
    await queryRunner.query(`DROP TYPE "core"."bills_payment_method_enum"`);
    await queryRunner.query(`DROP TYPE "core"."bills_status_enum"`);

    await queryRunner.query(`
      CREATE TABLE "core"."bills" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "supplier_id" uuid NOT NULL,
        "store_id" uuid NOT NULL,
        "total_amount" numeric(18,4) NOT NULL,
        "status" character varying(50) NOT NULL DEFAULT 'pending',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now(),
        CONSTRAINT "PK_bills" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "FK__bills__suppliers" FOREIGN KEY ("supplier_id") REFERENCES "core"."suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "FK__bills__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    await queryRunner.query(`DELETE FROM "core"."roles" WHERE "name" = 'org_manager'`);
  }
}
