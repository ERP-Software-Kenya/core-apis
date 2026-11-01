import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1793544127978 implements MigrationInterface {
    name = 'Migration1793544127978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."branches" ADD "default_location_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."branches" ADD CONSTRAINT "FK__branches__default_location" FOREIGN KEY ("default_location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."branches" DROP CONSTRAINT "FK__branches__default_location"`);
        await queryRunner.query(`ALTER TABLE "core"."branches" DROP COLUMN "default_location_id"`);
    }

}
