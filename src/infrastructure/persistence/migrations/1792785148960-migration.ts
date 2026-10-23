import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1792785148960 implements MigrationInterface {
    name = 'Migration1792785148960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" DROP CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchas"`);
        await queryRunner.query(`ALTER TYPE "core"."products_unit_enum" RENAME TO "products_unit_enum_old"`);
        await queryRunner.query(`CREATE TYPE "core"."products_unit_enum" AS ENUM('piece', 'kg', 'gram', 'litre', 'ml', 'box', 'pack', 'dozen', 'bag', 'pkt', 'meter', 'roll', 'feet', 'pcs', 'pair', 'bundle')`);
        await queryRunner.query(`ALTER TABLE "core"."products" ALTER COLUMN "unit" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."products" ALTER COLUMN "unit" TYPE "core"."products_unit_enum" USING "unit"::"text"::"core"."products_unit_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."products" ALTER COLUMN "unit" SET DEFAULT 'piece'`);
        await queryRunner.query(`DROP TYPE "core"."products_unit_enum_old"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" ADD CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchase_orders" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."unpublished_stock_purchase_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" DROP CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchase_orders"`);
        await queryRunner.query(`CREATE TYPE "core"."products_unit_enum_old" AS ENUM('piece', 'kg', 'gram', 'litre', 'ml', 'box', 'pack', 'dozen')`);
        await queryRunner.query(`ALTER TABLE "core"."products" ALTER COLUMN "unit" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."products" ALTER COLUMN "unit" TYPE "core"."products_unit_enum_old" USING "unit"::"text"::"core"."products_unit_enum_old"`);
        await queryRunner.query(`ALTER TABLE "core"."products" ALTER COLUMN "unit" SET DEFAULT 'piece'`);
        await queryRunner.query(`DROP TYPE "core"."products_unit_enum"`);
        await queryRunner.query(`ALTER TYPE "core"."products_unit_enum_old" RENAME TO "products_unit_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" ADD CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchas" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."unpublished_stock_purchase_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
