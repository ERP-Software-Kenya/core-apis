import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1788283790698 implements MigrationInterface {
    name = 'Migration1788283790698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."branches" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "name" character varying(150) NOT NULL, "code" character varying(50), "address" character varying(300), "city" character varying(100), "state" character varying(100), "country" character varying(100), "phone" character varying(50), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_branches" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" ADD "branch_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."locations" ADD "branch_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TYPE "core"."roles_name_enum" RENAME TO "roles_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "core"."roles_name_enum" AS ENUM('super_admin', 'org_admin', 'org_manager', 'branch_manager', 'store_manager', 'store_staff', 'picker', 'driver')`);
        await queryRunner.query(`ALTER TABLE "core"."roles" ALTER COLUMN "name" TYPE "core"."roles_name_enum" USING "name"::"text"::"core"."roles_name_enum"`);
        await queryRunner.query(`DROP TYPE "core"."roles_name_enum_old"`);
        await queryRunner.query(`ALTER TABLE "core"."branches" ADD CONSTRAINT "FK__branches__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" ADD CONSTRAINT "FK__user_roles__branches" FOREIGN KEY ("branch_id") REFERENCES "core"."branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."locations" ADD CONSTRAINT "FK__locations__branches" FOREIGN KEY ("branch_id") REFERENCES "core"."branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."locations" DROP CONSTRAINT "FK__locations__branches"`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP CONSTRAINT "FK__user_roles__branches"`);
        await queryRunner.query(`ALTER TABLE "core"."branches" DROP CONSTRAINT "FK__branches__organizations"`);
        await queryRunner.query(`CREATE TYPE "core"."roles_name_enum_old" AS ENUM('super_admin', 'org_admin', 'org_manager', 'store_manager', 'store_staff', 'picker', 'driver')`);
        await queryRunner.query(`ALTER TABLE "core"."roles" ALTER COLUMN "name" TYPE "core"."roles_name_enum_old" USING "name"::"text"::"core"."roles_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "core"."roles_name_enum"`);
        await queryRunner.query(`ALTER TYPE "core"."roles_name_enum_old" RENAME TO "roles_name_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."locations" DROP COLUMN "branch_id"`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP COLUMN "branch_id"`);
        await queryRunner.query(`DROP TABLE "core"."branches"`);
    }

}
