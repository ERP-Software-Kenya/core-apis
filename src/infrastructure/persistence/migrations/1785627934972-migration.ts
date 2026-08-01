import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1785627934972 implements MigrationInterface {
    name = 'Migration1785627934972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."stores" ADD "state" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "core"."stores" ADD "image_key" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "core"."locations" ADD "state" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."locations" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "core"."stores" DROP COLUMN "image_key"`);
        await queryRunner.query(`ALTER TABLE "core"."stores" DROP COLUMN "state"`);
    }

}
