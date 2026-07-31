import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1785530935311 implements MigrationInterface {
    name = 'Migration1785530935311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "core"."bills_payment_method_enum" AS ENUM('CASH', 'CARD', 'UPI', 'NET_BANKING', 'CHEQUE', 'CREDIT')`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "payment_method" "core"."bills_payment_method_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "payment_method"`);
        await queryRunner.query(`DROP TYPE "core"."bills_payment_method_enum"`);
    }

}
