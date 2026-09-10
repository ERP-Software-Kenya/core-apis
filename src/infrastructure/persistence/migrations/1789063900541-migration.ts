import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1789063900541 implements MigrationInterface {
    name = 'Migration1789063900541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."user_roles" ADD "branch_id" uuid`);
        await queryRunner.query(`CREATE TYPE "core"."orders_fulfillment_mode_enum" AS ENUM('delivery', 'pickup')`);
        await queryRunner.query(`ALTER TABLE "core"."orders" ADD "fulfillment_mode" "core"."orders_fulfillment_mode_enum" NOT NULL DEFAULT 'delivery'`);
        await queryRunner.query(`ALTER TABLE "core"."orders" ADD "fulfillment_location_id" uuid`);
        await queryRunner.query(`ALTER TYPE "core"."roles_name_enum" RENAME TO "roles_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "core"."roles_name_enum" AS ENUM('super_admin', 'org_admin', 'org_manager', 'branch_manager', 'store_manager', 'store_staff', 'picker', 'driver')`);
        await queryRunner.query(`ALTER TABLE "core"."roles" ALTER COLUMN "name" TYPE "core"."roles_name_enum" USING "name"::"text"::"core"."roles_name_enum"`);
        await queryRunner.query(`DROP TYPE "core"."roles_name_enum_old"`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" ADD CONSTRAINT "FK__user_roles__branches" FOREIGN KEY ("branch_id") REFERENCES "core"."branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP CONSTRAINT "FK__user_roles__branches"`);
        await queryRunner.query(`CREATE TYPE "core"."roles_name_enum_old" AS ENUM('super_admin', 'org_admin', 'org_manager', 'store_manager', 'store_staff', 'picker', 'driver')`);
        await queryRunner.query(`ALTER TABLE "core"."roles" ALTER COLUMN "name" TYPE "core"."roles_name_enum_old" USING "name"::"text"::"core"."roles_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "core"."roles_name_enum"`);
        await queryRunner.query(`ALTER TYPE "core"."roles_name_enum_old" RENAME TO "roles_name_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."orders" DROP COLUMN "fulfillment_location_id"`);
        await queryRunner.query(`ALTER TABLE "core"."orders" DROP COLUMN "fulfillment_mode"`);
        await queryRunner.query(`DROP TYPE "core"."orders_fulfillment_mode_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP COLUMN "branch_id"`);
    }

}
