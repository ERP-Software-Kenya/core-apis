import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1793393288639 implements MigrationInterface {
    name = 'Migration1793393288639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_branches_code_per_organization" ON "core"."branches" ("organization_id", "code") WHERE "code" IS NOT NULL AND "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_branches_one_branch_per_manager" ON "core"."branches" ("user_id") WHERE "user_id" IS NOT NULL AND "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_branches_one_main_per_organization" ON "core"."branches" ("organization_id") WHERE "is_main" = true AND "deleted_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "core"."UQ_branches_one_main_per_organization"`);
        await queryRunner.query(`DROP INDEX "core"."UQ_branches_one_branch_per_manager"`);
        await queryRunner.query(`DROP INDEX "core"."UQ_branches_code_per_organization"`);
    }

}
