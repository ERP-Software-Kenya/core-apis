import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1789326976505 implements MigrationInterface {
    name = 'Migration1789326976505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."expenses" ADD "submitted_by_user_id" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."expenses" ADD "submitted_by_name" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "core"."expenses" ADD "receipt_key" text`);
        await queryRunner.query(`ALTER TABLE "core"."expenses" ADD "admin_comment" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."expenses" DROP COLUMN "admin_comment"`);
        await queryRunner.query(`ALTER TABLE "core"."expenses" DROP COLUMN "receipt_key"`);
        await queryRunner.query(`ALTER TABLE "core"."expenses" DROP COLUMN "submitted_by_name"`);
        await queryRunner.query(`ALTER TABLE "core"."expenses" DROP COLUMN "submitted_by_user_id"`);
    }

}
