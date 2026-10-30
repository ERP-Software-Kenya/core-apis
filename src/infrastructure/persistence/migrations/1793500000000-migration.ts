import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1793500000000 implements MigrationInterface {
  name = 'Migration1793500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Backfill: for organizations with no main branch, promote the oldest active branch.
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

    // Preflight: multiple main branches per organization.
    const multiMain: Array<{ organization_id: string; cnt: string }> = await queryRunner.query(`
      SELECT "organization_id", COUNT(*) AS cnt
      FROM "core"."branches"
      WHERE "is_main" = true AND "deleted_at" IS NULL
      GROUP BY "organization_id"
      HAVING COUNT(*) > 1
    `);
    if (multiMain.length > 0) {
      const orgs = multiMain.map((row) => row.organization_id).join(', ');
      throw new Error(
        `Migration pre-check failed: the following organizations have multiple main branches: [${orgs}]. ` +
        'Set is_main = false on all but one branch per organization, then re-run the migration.',
      );
    }

    // Preflight: same manager assigned to multiple branches.
    const multiManager: Array<{ user_id: string; cnt: string }> = await queryRunner.query(`
      SELECT "user_id", COUNT(*) AS cnt
      FROM "core"."branches"
      WHERE "user_id" IS NOT NULL AND "deleted_at" IS NULL
      GROUP BY "user_id"
      HAVING COUNT(*) > 1
    `);
    if (multiManager.length > 0) {
      const users = multiManager.map((row) => row.user_id).join(', ');
      throw new Error(
        `Migration pre-check failed: the following users manage more than one branch: [${users}]. ` +
        'Set user_id = NULL on all but one branch per manager, then re-run the migration.',
      );
    }

    // Preflight: duplicate branch codes (case-insensitive) within the same organization.
    const duplicateCodes: Array<{ organization_id: string; code: string; cnt: string }> = await queryRunner.query(`
      SELECT "organization_id", lower("code") AS code, COUNT(*) AS cnt
      FROM "core"."branches"
      WHERE "code" IS NOT NULL AND "deleted_at" IS NULL
      GROUP BY "organization_id", lower("code")
      HAVING COUNT(*) > 1
    `);
    if (duplicateCodes.length > 0) {
      const pairs = duplicateCodes.map((row) => `${row.organization_id}/${row.code}`).join(', ');
      throw new Error(
        `Migration pre-check failed: the following organization/code combinations are duplicated: [${pairs}]. ` +
        'Rename or clear the duplicate branch codes, then re-run the migration.',
      );
    }

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
