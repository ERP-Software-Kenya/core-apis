import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1793471994287 implements MigrationInterface {
    name = 'Migration1793471994287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."organizations" ADD "industry" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "core"."organizations" ADD "business_type" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "core"."organizations" ADD "team_size" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "core"."organizations" ADD "modules" jsonb`);
        await queryRunner.query(`ALTER TABLE "core"."organizations" ADD "sales_method" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "core"."organizations" ADD "tax_id" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."organizations" DROP COLUMN "tax_id"`);
        await queryRunner.query(`ALTER TABLE "core"."organizations" DROP COLUMN "sales_method"`);
        await queryRunner.query(`ALTER TABLE "core"."organizations" DROP COLUMN "modules"`);
        await queryRunner.query(`ALTER TABLE "core"."organizations" DROP COLUMN "team_size"`);
        await queryRunner.query(`ALTER TABLE "core"."organizations" DROP COLUMN "business_type"`);
        await queryRunner.query(`ALTER TABLE "core"."organizations" DROP COLUMN "industry"`);
    }

}
