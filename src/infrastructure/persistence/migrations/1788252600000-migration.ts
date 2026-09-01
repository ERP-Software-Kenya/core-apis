import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1788252600000 implements MigrationInterface {
  name = 'Migration1788252600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "core"."branches" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "organization_id" uuid NOT NULL,
        "name" character varying(150) NOT NULL,
        "code" character varying(50),
        "address" character varying(300),
        "city" character varying(100),
        "state" character varying(100),
        "country" character varying(100),
        "phone" character varying(50),
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_branches" PRIMARY KEY ("id"),
        CONSTRAINT "FK__branches__organizations" FOREIGN KEY ("organization_id")
          REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "core"."locations" ADD "branch_id" uuid
    `);

    await queryRunner.query(`
      ALTER TABLE "core"."user_roles" ADD "branch_id" uuid
    `);

    await queryRunner.query(`
      WITH default_branches AS (
        INSERT INTO "core"."branches" ("id", "organization_id", "name", "is_active", "created_at")
        SELECT uuid_generate_v4(), "id", 'Main Branch', true, NOW()
        FROM "core"."organizations"
        RETURNING "id", "organization_id"
      )
      UPDATE "core"."locations" AS l
      SET "branch_id" = db."id"
      FROM default_branches AS db
      WHERE l."organization_id" = db."organization_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "core"."locations" ALTER COLUMN "branch_id" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "core"."locations"
      ADD CONSTRAINT "FK__locations__branches"
      FOREIGN KEY ("branch_id") REFERENCES "core"."branches"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "core"."user_roles"
      ADD CONSTRAINT "FK__user_roles__branches"
      FOREIGN KEY ("branch_id") REFERENCES "core"."branches"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "core"."user_roles"
      ADD CONSTRAINT "CHK__user_roles__single_scope"
      CHECK (NOT ("store_id" IS NOT NULL AND "branch_id" IS NOT NULL))
    `);

    await queryRunner.query(`
      INSERT INTO "core"."roles" ("id", "name", "description", "created_at")
      SELECT uuid_generate_v4(), 'branch_manager'::"core"."roles_name_enum",
        'Manage all stores and warehouses within a branch', NOW()
      WHERE NOT EXISTS (
        SELECT 1 FROM "core"."roles" WHERE "name" = 'branch_manager'::"core"."roles_name_enum"
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP CONSTRAINT "CHK__user_roles__single_scope"`);
    await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP CONSTRAINT "FK__user_roles__branches"`);
    await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP COLUMN "branch_id"`);
    await queryRunner.query(`ALTER TABLE "core"."locations" DROP CONSTRAINT "FK__locations__branches"`);
    await queryRunner.query(`ALTER TABLE "core"."locations" DROP COLUMN "branch_id"`);
    await queryRunner.query(`DELETE FROM "core"."roles" WHERE "name" = 'branch_manager'::"core"."roles_name_enum"`);
    await queryRunner.query(`DROP TABLE "core"."branches"`);
  }
}
