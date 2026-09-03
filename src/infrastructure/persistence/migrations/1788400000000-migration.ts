import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1788400000000 implements MigrationInterface {
  name = 'Migration1788400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "core"."orders_fulfillment_mode_enum" AS ENUM('delivery', 'pickup')`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."orders" ADD "fulfillment_mode" "core"."orders_fulfillment_mode_enum" NOT NULL DEFAULT 'delivery'`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."orders" ADD "fulfillment_location_id" uuid`,
    );
    await queryRunner.query(
      `UPDATE "core"."orders" SET "fulfillment_location_id" = "location_id" WHERE "fulfillment_location_id" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."orders" ADD CONSTRAINT "FK__orders__fulfillment_locations" FOREIGN KEY ("fulfillment_location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "core"."orders" DROP CONSTRAINT "FK__orders__fulfillment_locations"`,
    );
    await queryRunner.query(`ALTER TABLE "core"."orders" DROP COLUMN "fulfillment_location_id"`);
    await queryRunner.query(`ALTER TABLE "core"."orders" DROP COLUMN "fulfillment_mode"`);
    await queryRunner.query(`DROP TYPE "core"."orders_fulfillment_mode_enum"`);
  }
}
