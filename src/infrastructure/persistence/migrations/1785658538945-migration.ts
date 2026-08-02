import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1785658538945 implements MigrationInterface {
    name = 'Migration1785658538945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" ADD "organization_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" ADD CONSTRAINT "FK__purchase_orders__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" DROP CONSTRAINT "FK__purchase_orders__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" DROP COLUMN "organization_id"`);
    }

}
