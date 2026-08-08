import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1785530935311 implements MigrationInterface {
    name = 'Migration1785530935311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // On fresh install, 1800000000003 creates bills with payment_method already included.
        // Skip if column already exists (fresh install) or if bills table doesn't exist yet.
        const rows = await queryRunner.query(
            `SELECT 1 FROM information_schema.columns
             WHERE table_schema='core' AND table_name='bills' AND column_name='payment_method'`
        );
        if (rows.length > 0) return;

        const tableRows = await queryRunner.query(
            `SELECT 1 FROM information_schema.tables
             WHERE table_schema='core' AND table_name='bills'`
        );
        if (tableRows.length === 0) return;

        await queryRunner.query(`CREATE TYPE "core"."bills_payment_method_enum" AS ENUM('CASH', 'CARD', 'UPI', 'NET_BANKING', 'CHEQUE', 'CREDIT')`);
        await queryRunner.query(`ALTER TABLE "core"."bills" ADD "payment_method" "core"."bills_payment_method_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const rows = await queryRunner.query(
            `SELECT 1 FROM information_schema.columns
             WHERE table_schema='core' AND table_name='bills' AND column_name='payment_method'`
        );
        if (rows.length === 0) return;

        await queryRunner.query(`ALTER TABLE "core"."bills" DROP COLUMN "payment_method"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "core"."bills_payment_method_enum"`);
    }
}
