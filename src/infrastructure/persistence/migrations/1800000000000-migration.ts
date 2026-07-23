import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1800000000000 implements MigrationInterface {
  name = 'Migration1800000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ── Clerk columns on users ──────────────────────────────────────────────────
    await queryRunner.query(
      `ALTER TABLE "core"."users" ADD COLUMN IF NOT EXISTS "clerk_user_id" character varying(255) UNIQUE`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."users" ALTER COLUMN "password_hash" DROP NOT NULL`,
    );

    // ── Clerk columns on organizations ─────────────────────────────────────────
    await queryRunner.query(
      `ALTER TABLE "core"."organizations" ADD COLUMN IF NOT EXISTS "clerk_org_id" character varying(255) UNIQUE`,
    );

    // ── org_members table ───────────────────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "core"."org_members" (
        "id"           uuid          NOT NULL DEFAULT uuid_generate_v4(),
        "org_id"       uuid          NOT NULL,
        "user_id"      uuid          NOT NULL,
        "role_id"      uuid          NOT NULL,
        "status"       character varying(50) NOT NULL DEFAULT 'active',
        "invited_by"   uuid,
        "joined_at"    TIMESTAMP,
        CONSTRAINT "PK_org_members" PRIMARY KEY ("id"),
        CONSTRAINT "UQ__org_members__org_user" UNIQUE ("org_id", "user_id")
      )
    `);

    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX__org_members__org_id" ON "core"."org_members" ("org_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX__org_members__user_id" ON "core"."org_members" ("user_id")`,
    );

    await queryRunner.query(`
      ALTER TABLE "core"."org_members"
        ADD CONSTRAINT "FK__org_members__organizations"
          FOREIGN KEY ("org_id") REFERENCES "core"."organizations"("id") ON DELETE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "core"."org_members"
        ADD CONSTRAINT "FK__org_members__users"
          FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "core"."org_members"
        ADD CONSTRAINT "FK__org_members__roles"
          FOREIGN KEY ("role_id") REFERENCES "core"."roles"("id")
    `);
    await queryRunner.query(`
      ALTER TABLE "core"."org_members"
        ADD CONSTRAINT "FK__org_members__invited_by"
          FOREIGN KEY ("invited_by") REFERENCES "core"."users"("id") ON DELETE SET NULL
    `);

    // ── users index on clerk_user_id ────────────────────────────────────────────
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX__users__clerk_user_id" ON "core"."users" ("clerk_user_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "core"."IDX__users__clerk_user_id"`);
    await queryRunner.query(
      `ALTER TABLE "core"."org_members" DROP CONSTRAINT IF EXISTS "FK__org_members__invited_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."org_members" DROP CONSTRAINT IF EXISTS "FK__org_members__roles"`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."org_members" DROP CONSTRAINT IF EXISTS "FK__org_members__users"`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."org_members" DROP CONSTRAINT IF EXISTS "FK__org_members__organizations"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "core"."org_members"`);
    await queryRunner.query(
      `ALTER TABLE "core"."organizations" DROP COLUMN IF EXISTS "clerk_org_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."users" ALTER COLUMN "password_hash" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."users" DROP COLUMN IF EXISTS "clerk_user_id"`,
    );
  }
}
