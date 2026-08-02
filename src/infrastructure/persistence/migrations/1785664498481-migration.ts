import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1785664498481 implements MigrationInterface {
    name = 'Migration1785664498481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" DROP CONSTRAINT "FK__purchase_orders__stores"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" RENAME COLUMN "store_id" TO "location_id"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" ADD CONSTRAINT "FK__purchase_orders__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" DROP CONSTRAINT "FK__purchase_orders__locations"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" RENAME COLUMN "location_id" TO "store_id"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" ADD CONSTRAINT "FK__purchase_orders__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
