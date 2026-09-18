import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1789767169439 implements MigrationInterface {
    name = 'Migration1789767169439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."quotation_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quotation_id" uuid NOT NULL, "product_id" uuid NOT NULL, "variant_id" uuid, "quantity" numeric(18,4) NOT NULL, "unit_price_inclusive" numeric(18,4) NOT NULL, "unit_taxable" numeric(18,4) NOT NULL, "tax_rate" numeric(5,2) NOT NULL DEFAULT '0', "tax_amount" numeric(18,4) NOT NULL DEFAULT '0', "line_total" numeric(18,4) NOT NULL, CONSTRAINT "PK_quotation_items" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."quotations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quote_number" character varying(60) NOT NULL, "version_number" integer NOT NULL DEFAULT '1', "root_quotation_id" uuid NOT NULL, "parent_quotation_id" uuid, "is_latest" boolean NOT NULL DEFAULT true, "status" character varying(30) NOT NULL DEFAULT 'DRAFT', "organization_id" uuid NOT NULL, "location_id" uuid NOT NULL, "customer_id" uuid NOT NULL, "subtotal" numeric(18,4) NOT NULL DEFAULT '0', "tax_amount" numeric(18,4) NOT NULL DEFAULT '0', "total_amount" numeric(18,4) NOT NULL DEFAULT '0', "notes" text, "converted_order_id" uuid, "created_by_user_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_2d428c2e27281edd74219494d9f" UNIQUE ("converted_order_id"), CONSTRAINT "PK_quotations" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e1f9b4267c4ac6bbf6a5718653" ON "core"."quotations" ("organization_id", "quote_number") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6ac1dd7bc9d46df23ce8456645" ON "core"."quotations" ("root_quotation_id", "version_number") `);
        await queryRunner.query(`ALTER TABLE "core"."orders" ADD "source_quotation_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."orders" ADD CONSTRAINT "UQ_6c16cb5d32ee285c99e87316d29" UNIQUE ("source_quotation_id")`);
        await queryRunner.query(`ALTER TABLE "core"."quotation_items" ADD CONSTRAINT "FK__quotation_items__quotations" FOREIGN KEY ("quotation_id") REFERENCES "core"."quotations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."quotation_items" ADD CONSTRAINT "FK__quotation_items__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."quotation_items" ADD CONSTRAINT "FK__quotation_items__product_variants" FOREIGN KEY ("variant_id") REFERENCES "core"."product_variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."quotations" ADD CONSTRAINT "FK__quotations__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."quotations" ADD CONSTRAINT "FK__quotations__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."quotations" ADD CONSTRAINT "FK__quotations__customers" FOREIGN KEY ("customer_id") REFERENCES "core"."customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."quotations" ADD CONSTRAINT "FK__quotations__users" FOREIGN KEY ("created_by_user_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."quotations" ADD CONSTRAINT "FK__quotations__orders" FOREIGN KEY ("converted_order_id") REFERENCES "core"."orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."quotations" ADD CONSTRAINT "FK__quotations__parent_quotation" FOREIGN KEY ("parent_quotation_id") REFERENCES "core"."quotations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."quotations" DROP CONSTRAINT "FK__quotations__parent_quotation"`);
        await queryRunner.query(`ALTER TABLE "core"."quotations" DROP CONSTRAINT "FK__quotations__orders"`);
        await queryRunner.query(`ALTER TABLE "core"."quotations" DROP CONSTRAINT "FK__quotations__users"`);
        await queryRunner.query(`ALTER TABLE "core"."quotations" DROP CONSTRAINT "FK__quotations__customers"`);
        await queryRunner.query(`ALTER TABLE "core"."quotations" DROP CONSTRAINT "FK__quotations__locations"`);
        await queryRunner.query(`ALTER TABLE "core"."quotations" DROP CONSTRAINT "FK__quotations__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."quotation_items" DROP CONSTRAINT "FK__quotation_items__product_variants"`);
        await queryRunner.query(`ALTER TABLE "core"."quotation_items" DROP CONSTRAINT "FK__quotation_items__products"`);
        await queryRunner.query(`ALTER TABLE "core"."quotation_items" DROP CONSTRAINT "FK__quotation_items__quotations"`);
        await queryRunner.query(`ALTER TABLE "core"."orders" DROP CONSTRAINT "UQ_6c16cb5d32ee285c99e87316d29"`);
        await queryRunner.query(`ALTER TABLE "core"."orders" DROP COLUMN "source_quotation_id"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_6ac1dd7bc9d46df23ce8456645"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_e1f9b4267c4ac6bbf6a5718653"`);
        await queryRunner.query(`DROP TABLE "core"."quotations"`);
        await queryRunner.query(`DROP TABLE "core"."quotation_items"`);
    }

}
