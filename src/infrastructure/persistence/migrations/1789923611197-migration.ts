import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1789923611197 implements MigrationInterface {
    name = 'Migration1789923611197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."products" ADD "weight_kg" numeric(10,4)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."products" DROP COLUMN "weight_kg"`);
    }

}
