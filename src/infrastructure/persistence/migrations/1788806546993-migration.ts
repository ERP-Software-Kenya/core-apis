import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1788806546993 implements MigrationInterface {
    name = 'Migration1788806546993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "core"."orders_fulfillment_mode_enum" AS ENUM('delivery', 'pickup')`);
        await queryRunner.query(`ALTER TABLE "core"."orders" ADD "fulfillment_mode" "core"."orders_fulfillment_mode_enum" NOT NULL DEFAULT 'delivery'`);
        await queryRunner.query(`ALTER TABLE "core"."orders" ADD "fulfillment_location_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."orders" DROP COLUMN "fulfillment_location_id"`);
        await queryRunner.query(`ALTER TABLE "core"."orders" DROP COLUMN "fulfillment_mode"`);
        await queryRunner.query(`DROP TYPE "core"."orders_fulfillment_mode_enum"`);
    }

}
