import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1789445188905 implements MigrationInterface {
    name = 'Migration1789445188905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."bill_items" ADD "location_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."bill_items" DROP COLUMN "location_id"`);
    }

}
