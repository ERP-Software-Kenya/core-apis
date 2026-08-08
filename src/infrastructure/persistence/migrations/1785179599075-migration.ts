import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1785179599075 implements MigrationInterface {
    name = 'Migration1785179599075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP CONSTRAINT "FK__inventory__stores"`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" DROP CONSTRAINT "FK__stock_movements__stores"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP CONSTRAINT "UQ__inventory__store_product"`);
        await queryRunner.query(`CREATE TYPE "core"."locations_type_enum" AS ENUM('store', 'warehouse')`);
        await queryRunner.query(`CREATE TABLE "core"."locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "name" character varying(150) NOT NULL, "type" "core"."locations_type_enum" NOT NULL, "image_key" character varying(500), "address" character varying(300), "city" character varying(100), "country" character varying(100), "phone" character varying(50), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_locations" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "core"."product_logs_action_enum" AS ENUM('product_created', 'product_updated', 'product_disabled', 'product_enabled', 'stock_added', 'stock_removed', 'stock_adjusted', 'stock_reserved', 'stock_reservation_released', 'stock_published', 'stock_damaged', 'stock_written_off', 'stock_transferred_out', 'stock_transferred_in')`);
        await queryRunner.query(`CREATE TABLE "core"."product_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "product_id" uuid NOT NULL, "inventory_id" uuid, "location_id" uuid, "performed_by_id" uuid, "action" "core"."product_logs_action_enum" NOT NULL, "changed_fields" jsonb, "metadata" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_product_logs" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX__product_logs__inventory_created" ON "core"."product_logs" ("inventory_id", "created_at") `);
        await queryRunner.query(`CREATE INDEX "IDX__product_logs__org_created" ON "core"."product_logs" ("organization_id", "created_at") `);
        await queryRunner.query(`CREATE INDEX "IDX__product_logs__product_created" ON "core"."product_logs" ("product_id", "created_at") `);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD "organization_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD "location_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD "quantity_unpublished" numeric(18,4) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD "average_cost" numeric(18,4)`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD "bin_location" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" ADD "location_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" ADD "is_unpublished_entry" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TYPE "core"."stock_movements_movement_type_enum" RENAME TO "stock_movements_movement_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "core"."stock_movements_movement_type_enum" AS ENUM('stock_in', 'stock_out', 'adjustment', 'transfer_in', 'transfer_out', 'return', 'damage', 'write_off', 'published', 'reserved', 'reservation_released')`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" ALTER COLUMN "movement_type" TYPE "core"."stock_movements_movement_type_enum" USING "movement_type"::"text"::"core"."stock_movements_movement_type_enum"`);
        await queryRunner.query(`DROP TYPE "core"."stock_movements_movement_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD CONSTRAINT "UQ__inventory__org_location_product" UNIQUE ("organization_id", "location_id", "product_id")`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD CONSTRAINT "FK__inventory__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD CONSTRAINT "FK__inventory__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" ADD CONSTRAINT "FK__stock_movements__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."locations" ADD CONSTRAINT "FK__locations__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."product_logs" ADD CONSTRAINT "FK__product_logs__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."product_logs" ADD CONSTRAINT "FK__product_logs__users" FOREIGN KEY ("performed_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."product_logs" DROP CONSTRAINT "FK__product_logs__users"`);
        await queryRunner.query(`ALTER TABLE "core"."product_logs" DROP CONSTRAINT "FK__product_logs__products"`);
        await queryRunner.query(`ALTER TABLE "core"."locations" DROP CONSTRAINT "FK__locations__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" DROP CONSTRAINT "FK__stock_movements__locations"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP CONSTRAINT "FK__inventory__locations"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP CONSTRAINT "FK__inventory__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP CONSTRAINT "UQ__inventory__org_location_product"`);
        await queryRunner.query(`CREATE TYPE "core"."stock_movements_movement_type_enum_old" AS ENUM('stock_in', 'stock_out', 'adjustment', 'transfer', 'return', 'damage', 'purchase_receipt')`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" ALTER COLUMN "movement_type" TYPE "core"."stock_movements_movement_type_enum_old" USING "movement_type"::"text"::"core"."stock_movements_movement_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "core"."stock_movements_movement_type_enum"`);
        await queryRunner.query(`ALTER TYPE "core"."stock_movements_movement_type_enum_old" RENAME TO "stock_movements_movement_type_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" DROP COLUMN "is_unpublished_entry"`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" DROP COLUMN "location_id"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP COLUMN "bin_location"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP COLUMN "average_cost"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP COLUMN "quantity_unpublished"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP COLUMN "location_id"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP COLUMN "organization_id"`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" ADD "store_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD "location" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD "store_id" uuid NOT NULL`);
        await queryRunner.query(`DROP INDEX "core"."IDX__product_logs__product_created"`);
        await queryRunner.query(`DROP INDEX "core"."IDX__product_logs__org_created"`);
        await queryRunner.query(`DROP INDEX "core"."IDX__product_logs__inventory_created"`);
        await queryRunner.query(`DROP TABLE "core"."product_logs"`);
        await queryRunner.query(`DROP TYPE "core"."product_logs_action_enum"`);
        await queryRunner.query(`DROP TABLE "core"."locations"`);
        await queryRunner.query(`DROP TYPE "core"."locations_type_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD CONSTRAINT "UQ__inventory__store_product" UNIQUE ("store_id", "product_id")`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" ADD CONSTRAINT "FK__stock_movements__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD CONSTRAINT "FK__inventory__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
