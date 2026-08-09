import { MigrationInterface, QueryRunner } from "typeorm";

export class BillingModuleSchema1785530081321 implements MigrationInterface {
    name = 'BillingModuleSchema1785530081321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // On fresh install, 1800000000003 creates bills with the final schema already.
        // Skip if bills does not have the old supplier_id column (table absent or already migrated).
        const rows = await queryRunner.query(
            `SELECT 1 FROM information_schema.columns
             WHERE table_schema='core' AND table_name='bills' AND column_name='supplier_id'`
        );
        if (rows.length === 0) return;

        await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT "FK__bills__stores"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT "FK__bills__suppliers"`);
        await queryRunner.query(`CREATE TABLE "core"."bill_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bill_id" uuid NOT NULL, "product_id" uuid NOT NULL, "variant_id" uuid, "quantity" numeric(18,4) NOT NULL, "unit_price" numeric(18,4) NOT NULL, "tax_rate" numeric(5,2) NOT NULL DEFAULT '0', "tax_amount" numeric(18,4) NOT NULL DEFAULT '0', "discount_amount" numeric(18,4) NOT NULL DEFAULT '0', "line_total" numeric(18,4) NOT NULL, CONSTRAINT "PK_bill_items" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "supplier_id"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "bill_number" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "UQ_df496d8e68bf4899d47956865e2" UNIQUE ("bill_number")`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "organization_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "location_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "customer_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "created_by_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "walk_in_name" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "walk_in_phone" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "walk_in_gstin" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "subtotal" numeric(18,4) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "tax_amount" numeric(18,4) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "discount_amount" numeric(18,4) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "notes" text`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "billed_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "core"."bills_status_enum" AS ENUM('INITIATED', 'DRAFT', 'COMPLETED', 'CANCELLED')`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "status" "core"."bills_status_enum" NOT NULL DEFAULT 'INITIATED'`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ALTER COLUMN "total_amount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "core"."bill_items" ADD CONSTRAINT "FK__bill_items__bills" FOREIGN KEY ("bill_id") REFERENCES "core"."bills"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."bill_items" ADD CONSTRAINT "FK__bill_items__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."bill_items" ADD CONSTRAINT "FK__bill_items__product_variants" FOREIGN KEY ("variant_id") REFERENCES "core"."product_variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "FK__bills__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "FK__bills__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "FK__bills__customers" FOREIGN KEY ("customer_id") REFERENCES "core"."customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "FK__bills__users" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Skip if bills is already in old schema (no bill_number column)
        const rows = await queryRunner.query(
            `SELECT 1 FROM information_schema.columns
             WHERE table_schema='core' AND table_name='bills' AND column_name='bill_number'`
        );
        if (rows.length === 0) return;

        await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT "FK__bills__users"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT "FK__bills__customers"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT "FK__bills__locations"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT "FK__bills__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."bill_items" DROP CONSTRAINT "FK__bill_items__product_variants"`);
        await queryRunner.query(`ALTER TABLE "core"."bill_items" DROP CONSTRAINT "FK__bill_items__products"`);
        await queryRunner.query(`ALTER TABLE "core"."bill_items" DROP CONSTRAINT "FK__bill_items__bills"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ALTER COLUMN "total_amount" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "core"."bills_status_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "status" character varying(50) NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "billed_at"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "discount_amount"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "tax_amount"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "subtotal"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "walk_in_gstin"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "walk_in_phone"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "walk_in_name"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "created_by_id"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "customer_id"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "location_id"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "organization_id"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP CONSTRAINT "UQ_df496d8e68bf4899d47956865e2"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "bill_number"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "store_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "supplier_id" uuid NOT NULL`);
        await queryRunner.query(`DROP TABLE "core"."bill_items"`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "FK__bills__suppliers" FOREIGN KEY ("supplier_id") REFERENCES "core"."suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD CONSTRAINT "FK__bills__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
