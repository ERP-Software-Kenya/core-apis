import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1792891000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "core"."drivers" ADD "user_id" uuid`);
    await queryRunner.query(`CREATE UNIQUE INDEX "UQ__drivers__user_id" ON "core"."drivers" ("user_id") WHERE "user_id" IS NOT NULL`);
    await queryRunner.query(`ALTER TABLE "core"."drivers" ADD CONSTRAINT "FK__drivers__users" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE SET NULL`);
    await queryRunner.query(`ALTER TABLE "core"."trip_stops" ADD "latitude" numeric(10,7)`);
    await queryRunner.query(`ALTER TABLE "core"."trip_stops" ADD "longitude" numeric(10,7)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "core"."trip_stops" DROP COLUMN "longitude"`);
    await queryRunner.query(`ALTER TABLE "core"."trip_stops" DROP COLUMN "latitude"`);
    await queryRunner.query(`ALTER TABLE "core"."drivers" DROP CONSTRAINT "FK__drivers__users"`);
    await queryRunner.query(`DROP INDEX "core"."UQ__drivers__user_id"`);
    await queryRunner.query(`ALTER TABLE "core"."drivers" DROP COLUMN "user_id"`);
  }
}
