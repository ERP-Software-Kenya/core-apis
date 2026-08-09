import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1786274908831 implements MigrationInterface {
    name = 'Migration1786274908831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."expenses" ADD "status" character varying(20) NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "core"."expenses" ADD "submitted_by" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."expenses" DROP COLUMN "submitted_by"`);
        await queryRunner.query(`ALTER TABLE "core"."expenses" DROP COLUMN "status"`);
    }

}
