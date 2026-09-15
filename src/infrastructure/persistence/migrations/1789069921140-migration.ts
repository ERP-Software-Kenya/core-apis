import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1789069921140 implements MigrationInterface {
    name = 'Migration1789069921140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP CONSTRAINT "FK__user_roles__branches"`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP COLUMN "branch_id"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" ADD "branch_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."users" ADD "branch_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."locations" ADD "branch_id" uuid`);
        // Remove user_role rows that reference roles being dropped, then remove the roles themselves
        const obsoleteRoles = `('org_manager','store_manager','store_staff','picker')`;
        await queryRunner.query(`DELETE FROM "core"."user_roles" WHERE "role_id" IN (SELECT "id" FROM "core"."roles" WHERE "name"::text IN ${obsoleteRoles})`);
        await queryRunner.query(`DELETE FROM "core"."roles" WHERE "name"::text IN ${obsoleteRoles}`);
        await queryRunner.query(`ALTER TYPE "core"."roles_name_enum" RENAME TO "roles_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "core"."roles_name_enum" AS ENUM('super_admin', 'org_admin', 'branch_manager', 'driver', 'packer')`);
        await queryRunner.query(`ALTER TABLE "core"."roles" ALTER COLUMN "name" TYPE "core"."roles_name_enum" USING "name"::"text"::"core"."roles_name_enum"`);
        await queryRunner.query(`DROP TYPE "core"."roles_name_enum_old"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" ADD CONSTRAINT "FK__purchase_orders__branches" FOREIGN KEY ("branch_id") REFERENCES "core"."branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."users" ADD CONSTRAINT "FK__users__branches" FOREIGN KEY ("branch_id") REFERENCES "core"."branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."locations" ADD CONSTRAINT "FK__locations__branches" FOREIGN KEY ("branch_id") REFERENCES "core"."branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."locations" DROP CONSTRAINT "FK__locations__branches"`);
        await queryRunner.query(`ALTER TABLE "core"."users" DROP CONSTRAINT "FK__users__branches"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" DROP CONSTRAINT "FK__purchase_orders__branches"`);
        await queryRunner.query(`CREATE TYPE "core"."roles_name_enum_old" AS ENUM('super_admin', 'org_admin', 'org_manager', 'branch_manager', 'store_manager', 'store_staff', 'picker', 'driver')`);
        await queryRunner.query(`ALTER TABLE "core"."roles" ALTER COLUMN "name" TYPE "core"."roles_name_enum_old" USING "name"::"text"::"core"."roles_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "core"."roles_name_enum"`);
        await queryRunner.query(`ALTER TYPE "core"."roles_name_enum_old" RENAME TO "roles_name_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."locations" DROP COLUMN "branch_id"`);
        await queryRunner.query(`ALTER TABLE "core"."users" DROP COLUMN "branch_id"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" DROP COLUMN "branch_id"`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" ADD "branch_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" ADD CONSTRAINT "FK__user_roles__branches" FOREIGN KEY ("branch_id") REFERENCES "core"."branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
