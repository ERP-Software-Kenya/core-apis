import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1789071798928 implements MigrationInterface {
    name = 'Migration1789071798928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."users" DROP CONSTRAINT "FK__users__branches"`);
        await queryRunner.query(`ALTER TABLE "core"."users" DROP COLUMN "branch_id"`);
        await queryRunner.query(`ALTER TABLE "core"."branches" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."branches" ADD CONSTRAINT "FK__branches__users" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."branches" DROP CONSTRAINT "FK__branches__users"`);
        await queryRunner.query(`ALTER TABLE "core"."branches" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "core"."users" ADD "branch_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."users" ADD CONSTRAINT "FK__users__branches" FOREIGN KEY ("branch_id") REFERENCES "core"."branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
