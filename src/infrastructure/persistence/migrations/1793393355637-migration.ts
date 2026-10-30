import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1793393355637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // For organizations with no main branch, promote the oldest active branch.
    // This must run before the unique index on (organization_id WHERE is_main) is created.
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Backfill is intentional data correction — no rollback needed.
  }
}
