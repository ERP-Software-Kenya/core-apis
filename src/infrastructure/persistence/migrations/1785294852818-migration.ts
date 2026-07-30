import { MigrationInterface, QueryRunner } from "typeorm";

export class UnpublishedStockTables1785294852818 implements MigrationInterface {
    name = 'UnpublishedStockTables1785294852818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "core"."unpublished_stock_movements_movement_type_enum" AS ENUM('stock_in', 'transfer_out')`);
        await queryRunner.query(`CREATE TABLE "core"."unpublished_stock_movements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "unpublished_stock_id" uuid NOT NULL, "location_id" uuid NOT NULL, "product_id" uuid NOT NULL, "performed_by_id" uuid, "movement_type" "core"."unpublished_stock_movements_movement_type_enum" NOT NULL, "quantity" numeric(18,4) NOT NULL, "quantity_before" numeric(18,4) NOT NULL, "quantity_after" numeric(18,4) NOT NULL, "unit_cost" numeric(18,4), "notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_unpublished_stock_movements" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."unpublished_stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "location_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity_on_hand" numeric(18,4) NOT NULL DEFAULT '0', "average_cost" numeric(18,4), "bin_location" character varying(100), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ__unpublished_stock__org_location_product" UNIQUE ("organization_id", "location_id", "product_id"), CONSTRAINT "PK_unpublished_stock" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP COLUMN "quantity_unpublished"`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" DROP COLUMN "is_unpublished_entry"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_movements" ADD CONSTRAINT "FK__unpublished_stock_movements__unpublished_stock" FOREIGN KEY ("unpublished_stock_id") REFERENCES "core"."unpublished_stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_movements" ADD CONSTRAINT "FK__unpublished_stock_movements__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_movements" ADD CONSTRAINT "FK__unpublished_stock_movements__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_movements" ADD CONSTRAINT "FK__unpublished_stock_movements__users" FOREIGN KEY ("performed_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock" ADD CONSTRAINT "FK__unpublished_stock__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock" ADD CONSTRAINT "FK__unpublished_stock__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock" ADD CONSTRAINT "FK__unpublished_stock__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock" DROP CONSTRAINT "FK__unpublished_stock__products"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock" DROP CONSTRAINT "FK__unpublished_stock__locations"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock" DROP CONSTRAINT "FK__unpublished_stock__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_movements" DROP CONSTRAINT "FK__unpublished_stock_movements__users"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_movements" DROP CONSTRAINT "FK__unpublished_stock_movements__products"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_movements" DROP CONSTRAINT "FK__unpublished_stock_movements__locations"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_movements" DROP CONSTRAINT "FK__unpublished_stock_movements__unpublished_stock"`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" ADD "is_unpublished_entry" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD "quantity_unpublished" numeric(18,4) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "core"."unpublished_stock"`);
        await queryRunner.query(`DROP TABLE "core"."unpublished_stock_movements"`);
        await queryRunner.query(`DROP TYPE "core"."unpublished_stock_movements_movement_type_enum"`);
    }

}
