import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1789490451712 implements MigrationInterface {
    name = 'Migration1789490451712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "core"."sales_return_items_condition_enum" AS ENUM('restock', 'damaged', 'unpublished_restock')`);
        await queryRunner.query(`CREATE TABLE "core"."sales_return_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sales_return_id" uuid NOT NULL, "bill_item_id" uuid NOT NULL, "product_id" uuid NOT NULL, "variant_id" uuid, "quantity" numeric(18,4) NOT NULL, "unit_price" numeric(18,4) NOT NULL, "tax_rate" numeric(18,4) NOT NULL DEFAULT '0', "tax_amount" numeric(18,4) NOT NULL DEFAULT '0', "discount_amount" numeric(18,4) NOT NULL DEFAULT '0', "line_total" numeric(18,4) NOT NULL DEFAULT '0', "condition" "core"."sales_return_items_condition_enum" NOT NULL, "reason" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_sales_return_items" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IX__sales_return_items__bill_item" ON "core"."sales_return_items" ("bill_item_id") `);
        await queryRunner.query(`CREATE TYPE "core"."sales_returns_sale_type_enum" AS ENUM('normal', 'credit', 'black')`);
        await queryRunner.query(`CREATE TYPE "core"."sales_returns_status_enum" AS ENUM('draft', 'finalized', 'cancelled')`);
        await queryRunner.query(`CREATE TYPE "core"."sales_returns_refund_status_enum" AS ENUM('none', 'pending', 'completed')`);
        await queryRunner.query(`CREATE TABLE "core"."sales_returns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "return_number" character varying(50) NOT NULL, "organization_id" uuid NOT NULL, "location_id" uuid NOT NULL, "bill_id" uuid NOT NULL, "customer_id" uuid, "sale_type" "core"."sales_returns_sale_type_enum" NOT NULL, "status" "core"."sales_returns_status_enum" NOT NULL DEFAULT 'draft', "refund_method" character varying(50), "refund_status" "core"."sales_returns_refund_status_enum" NOT NULL DEFAULT 'none', "subtotal" numeric(18,4) NOT NULL DEFAULT '0', "tax_amount" numeric(18,4) NOT NULL DEFAULT '0', "discount_amount" numeric(18,4) NOT NULL DEFAULT '0', "total_amount" numeric(18,4) NOT NULL DEFAULT '0', "reason" text, "notes" text, "created_by_id" uuid, "finalized_by_id" uuid, "finalized_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_ffa3b94951ab9244d4252d4ad66" UNIQUE ("return_number"), CONSTRAINT "PK_sales_returns" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IX__sales_returns__org_location_status" ON "core"."sales_returns" ("organization_id", "location_id", "status") `);
        await queryRunner.query(`CREATE TYPE "core"."purchase_return_items_source_type_enum" AS ENUM('unallocated_received', 'allocated_stock')`);
        await queryRunner.query(`CREATE TABLE "core"."purchase_return_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "purchase_return_id" uuid NOT NULL, "purchase_item_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity" numeric(18,4) NOT NULL, "unit_cost" numeric(18,4) NOT NULL, "line_total" numeric(18,4) NOT NULL DEFAULT '0', "source_type" "core"."purchase_return_items_source_type_enum" NOT NULL, "location_id" uuid, "reason" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_purchase_return_items" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IX__purchase_return_items__purchase_item" ON "core"."purchase_return_items" ("purchase_item_id") `);
        await queryRunner.query(`CREATE TYPE "core"."purchase_returns_status_enum" AS ENUM('draft', 'finalized', 'cancelled')`);
        await queryRunner.query(`CREATE TYPE "core"."purchase_returns_dispatch_status_enum" AS ENUM('pending_dispatch', 'dispatched', 'credited')`);
        await queryRunner.query(`CREATE TABLE "core"."purchase_returns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "return_number" character varying(50) NOT NULL, "organization_id" uuid NOT NULL, "purchase_order_id" uuid NOT NULL, "supplier_id" uuid NOT NULL, "status" "core"."purchase_returns_status_enum" NOT NULL DEFAULT 'draft', "dispatch_status" "core"."purchase_returns_dispatch_status_enum" NOT NULL DEFAULT 'pending_dispatch', "total_amount" numeric(18,4) NOT NULL DEFAULT '0', "reason" text, "notes" text, "created_by_id" uuid, "finalized_by_id" uuid, "finalized_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_63548e2f28464f17bf1c2cb675b" UNIQUE ("return_number"), CONSTRAINT "PK_purchase_returns" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IX__purchase_returns__org_status" ON "core"."purchase_returns" ("organization_id", "status") `);
        await queryRunner.query(`ALTER TABLE "core"."bill_items" DROP COLUMN "location_id"`);
        await queryRunner.query(`ALTER TYPE "core"."customer_credit_transactions_type_enum" RENAME TO "customer_credit_transactions_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "core"."customer_credit_transactions_type_enum" AS ENUM('credit_sale', 'payment', 'adjustment', 'sales_return')`);
        await queryRunner.query(`ALTER TABLE "core"."customer_credit_transactions" ALTER COLUMN "type" TYPE "core"."customer_credit_transactions_type_enum" USING "type"::"text"::"core"."customer_credit_transactions_type_enum"`);
        await queryRunner.query(`DROP TYPE "core"."customer_credit_transactions_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "core"."sales_return_items" ADD CONSTRAINT "FK__sales_return_items__sales_returns" FOREIGN KEY ("sales_return_id") REFERENCES "core"."sales_returns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."sales_return_items" ADD CONSTRAINT "FK__sales_return_items__bill_items" FOREIGN KEY ("bill_item_id") REFERENCES "core"."bill_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."sales_return_items" ADD CONSTRAINT "FK__sales_return_items__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."sales_returns" ADD CONSTRAINT "FK__sales_returns__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."sales_returns" ADD CONSTRAINT "FK__sales_returns__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."sales_returns" ADD CONSTRAINT "FK__sales_returns__bills" FOREIGN KEY ("bill_id") REFERENCES "core"."bills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."sales_returns" ADD CONSTRAINT "FK__sales_returns__customers" FOREIGN KEY ("customer_id") REFERENCES "core"."customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."sales_returns" ADD CONSTRAINT "FK__sales_returns__users" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."sales_returns" ADD CONSTRAINT "FK__sales_returns__finalized_by" FOREIGN KEY ("finalized_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" ADD CONSTRAINT "FK__purchase_return_items__purchase_returns" FOREIGN KEY ("purchase_return_id") REFERENCES "core"."purchase_returns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" ADD CONSTRAINT "FK__purchase_return_items__purchase_items" FOREIGN KEY ("purchase_item_id") REFERENCES "core"."purchase_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" ADD CONSTRAINT "FK__purchase_return_items__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" ADD CONSTRAINT "FK__purchase_return_items__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_returns" ADD CONSTRAINT "FK__purchase_returns__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_returns" ADD CONSTRAINT "FK__purchase_returns__purchase_orders" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."purchase_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_returns" ADD CONSTRAINT "FK__purchase_returns__suppliers" FOREIGN KEY ("supplier_id") REFERENCES "core"."suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_returns" ADD CONSTRAINT "FK__purchase_returns__users" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_returns" ADD CONSTRAINT "FK__purchase_returns__finalized_by" FOREIGN KEY ("finalized_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."purchase_returns" DROP CONSTRAINT "FK__purchase_returns__finalized_by"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_returns" DROP CONSTRAINT "FK__purchase_returns__users"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_returns" DROP CONSTRAINT "FK__purchase_returns__suppliers"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_returns" DROP CONSTRAINT "FK__purchase_returns__purchase_orders"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_returns" DROP CONSTRAINT "FK__purchase_returns__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" DROP CONSTRAINT "FK__purchase_return_items__locations"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" DROP CONSTRAINT "FK__purchase_return_items__products"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" DROP CONSTRAINT "FK__purchase_return_items__purchase_items"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_return_items" DROP CONSTRAINT "FK__purchase_return_items__purchase_returns"`);
        await queryRunner.query(`ALTER TABLE "core"."sales_returns" DROP CONSTRAINT "FK__sales_returns__finalized_by"`);
        await queryRunner.query(`ALTER TABLE "core"."sales_returns" DROP CONSTRAINT "FK__sales_returns__users"`);
        await queryRunner.query(`ALTER TABLE "core"."sales_returns" DROP CONSTRAINT "FK__sales_returns__customers"`);
        await queryRunner.query(`ALTER TABLE "core"."sales_returns" DROP CONSTRAINT "FK__sales_returns__bills"`);
        await queryRunner.query(`ALTER TABLE "core"."sales_returns" DROP CONSTRAINT "FK__sales_returns__locations"`);
        await queryRunner.query(`ALTER TABLE "core"."sales_returns" DROP CONSTRAINT "FK__sales_returns__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."sales_return_items" DROP CONSTRAINT "FK__sales_return_items__products"`);
        await queryRunner.query(`ALTER TABLE "core"."sales_return_items" DROP CONSTRAINT "FK__sales_return_items__bill_items"`);
        await queryRunner.query(`ALTER TABLE "core"."sales_return_items" DROP CONSTRAINT "FK__sales_return_items__sales_returns"`);
        await queryRunner.query(`CREATE TYPE "core"."customer_credit_transactions_type_enum_old" AS ENUM('credit_sale', 'payment', 'adjustment')`);
        await queryRunner.query(`ALTER TABLE "core"."customer_credit_transactions" ALTER COLUMN "type" TYPE "core"."customer_credit_transactions_type_enum_old" USING "type"::"text"::"core"."customer_credit_transactions_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "core"."customer_credit_transactions_type_enum"`);
        await queryRunner.query(`ALTER TYPE "core"."customer_credit_transactions_type_enum_old" RENAME TO "customer_credit_transactions_type_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."bill_items" ADD "location_id" uuid`);
        await queryRunner.query(`DROP INDEX "core"."IX__purchase_returns__org_status"`);
        await queryRunner.query(`DROP TABLE "core"."purchase_returns"`);
        await queryRunner.query(`DROP TYPE "core"."purchase_returns_dispatch_status_enum"`);
        await queryRunner.query(`DROP TYPE "core"."purchase_returns_status_enum"`);
        await queryRunner.query(`DROP INDEX "core"."IX__purchase_return_items__purchase_item"`);
        await queryRunner.query(`DROP TABLE "core"."purchase_return_items"`);
        await queryRunner.query(`DROP TYPE "core"."purchase_return_items_source_type_enum"`);
        await queryRunner.query(`DROP INDEX "core"."IX__sales_returns__org_location_status"`);
        await queryRunner.query(`DROP TABLE "core"."sales_returns"`);
        await queryRunner.query(`DROP TYPE "core"."sales_returns_refund_status_enum"`);
        await queryRunner.query(`DROP TYPE "core"."sales_returns_status_enum"`);
        await queryRunner.query(`DROP TYPE "core"."sales_returns_sale_type_enum"`);
        await queryRunner.query(`DROP INDEX "core"."IX__sales_return_items__bill_item"`);
        await queryRunner.query(`DROP TABLE "core"."sales_return_items"`);
        await queryRunner.query(`DROP TYPE "core"."sales_return_items_condition_enum"`);
    }

}
