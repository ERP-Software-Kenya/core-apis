import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1793500000000 implements MigrationInterface {
  name = 'Migration1793500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`WITH first_active_branch AS (
      SELECT DISTINCT ON ("organization_id") "id"
      FROM "core"."branches"
      WHERE "deleted_at" IS NULL AND "is_active" = true
        AND "organization_id" NOT IN (
          SELECT "organization_id" FROM "core"."branches"
          WHERE "is_main" = true AND "deleted_at" IS NULL
        )
      ORDER BY "organization_id", "created_at", "id"
    )
    UPDATE "core"."branches" SET "is_main" = true
    WHERE "id" IN (SELECT "id" FROM first_active_branch)`);
    await queryRunner.query(`CREATE UNIQUE INDEX "UQ_branches_one_main_per_organization"
      ON "core"."branches" ("organization_id")
      WHERE "is_main" = true AND "deleted_at" IS NULL`);
    await queryRunner.query(`CREATE UNIQUE INDEX "UQ_branches_one_branch_per_manager"
      ON "core"."branches" ("user_id")
      WHERE "user_id" IS NOT NULL AND "deleted_at" IS NULL`);
    await queryRunner.query(`CREATE UNIQUE INDEX "UQ_branches_code_per_organization"
      ON "core"."branches" ("organization_id", lower("code"))
      WHERE "code" IS NOT NULL AND "deleted_at" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "core"."UQ_branches_code_per_organization"`);
    await queryRunner.query(`DROP INDEX "core"."UQ_branches_one_branch_per_manager"`);
    await queryRunner.query(`DROP INDEX "core"."UQ_branches_one_main_per_organization"`);
  }
}
