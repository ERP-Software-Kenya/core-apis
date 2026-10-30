import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1792917924490 implements MigrationInterface {
    name = 'Migration1792917924490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "core"."notification_settings_event_enum" AS ENUM('auth.login', 'auth.logout', 'auth.login_failed', 'product.created', 'product.updated', 'product.deleted', 'product.enabled', 'product.disabled', 'product.price_changed', 'stock.added', 'stock.removed', 'stock.adjusted', 'stock.transferred', 'stock.damaged', 'stock.written_off', 'stock.reserved', 'stock.reservation_released', 'sale.created', 'sale.confirmed', 'sale.voided', 'sale.payment_received', 'sale.refunded', 'purchase_order.created', 'purchase_order.sent', 'purchase_order.goods_received', 'purchase_order.cancelled', 'invoice.created', 'invoice.sent', 'invoice.paid', 'invoice.voided', 'bill.created', 'bill.paid', 'customer.created', 'customer.updated', 'customer.credit_limit_changed', 'customer.deactivated', 'supplier.created', 'supplier.updated', 'supplier.deactivated', 'user.created', 'user.updated', 'user.role_changed', 'user.deactivated', 'user.reactivated', 'branch.created', 'branch.updated', 'report.generated', 'report.exported', 'org.settings_updated', 'org.module_toggled', 'org.billing_changed')`);
        await queryRunner.query(`CREATE TABLE "core"."notification_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "event" "core"."notification_settings_event_enum" NOT NULL, "is_enabled" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_4b01b22d239306d36aa7323001f" UNIQUE ("organization_id", "event"), CONSTRAINT "PK_notification_settings" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."notification_settings" ADD CONSTRAINT "FK__notification_settings__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."notification_settings" DROP CONSTRAINT "FK__notification_settings__organizations"`);
        await queryRunner.query(`DROP TABLE "core"."notification_settings"`);
        await queryRunner.query(`DROP TYPE "core"."notification_settings_event_enum"`);
    }

}
