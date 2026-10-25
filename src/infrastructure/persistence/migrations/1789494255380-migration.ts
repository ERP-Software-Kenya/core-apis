import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1789494255380 implements MigrationInterface {
    name = 'Migration1789494255380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."purchase_order_payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "purchase_order_id" uuid NOT NULL, "supplier_id" uuid NOT NULL, "amount" numeric(18,4) NOT NULL, "payment_method" character varying(50) NOT NULL, "paid_at" TIMESTAMP NOT NULL, "note" text, "performed_by_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_purchase_order_payments" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" ADD "amount_paid" numeric(18,4) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "core"."bill_items" ADD "location_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_order_payments" ADD CONSTRAINT "FK__purchase_order_payments__purchase_orders" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."purchase_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_order_payments" ADD CONSTRAINT "FK__purchase_order_payments__suppliers" FOREIGN KEY ("supplier_id") REFERENCES "core"."suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_order_payments" ADD CONSTRAINT "FK__purchase_order_payments__users" FOREIGN KEY ("performed_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."purchase_order_payments" DROP CONSTRAINT "FK__purchase_order_payments__users"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_order_payments" DROP CONSTRAINT "FK__purchase_order_payments__suppliers"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_order_payments" DROP CONSTRAINT "FK__purchase_order_payments__purchase_orders"`);
        await queryRunner.query(`ALTER TABLE "core"."bill_items" DROP COLUMN "location_id"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" DROP COLUMN "amount_paid"`);
        await queryRunner.query(`DROP TABLE "core"."purchase_order_payments"`);
    }

}
