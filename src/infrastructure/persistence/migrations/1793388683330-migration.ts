import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1793388683330 implements MigrationInterface {
    name = 'Migration1793388683330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."drivers" DROP CONSTRAINT "FK__drivers__users"`);
        await queryRunner.query(`ALTER TABLE "core"."user_sessions" DROP CONSTRAINT "FK__user_sessions__users"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" DROP CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchas"`);
        await queryRunner.query(`CREATE TYPE "core"."organization_invitations_status_enum" AS ENUM('pending', 'accepted', 'expired', 'revoked', 'failed')`);
        await queryRunner.query(`CREATE TABLE "core"."organization_invitations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "email" character varying(320) NOT NULL, "email_normalized" character varying(320) NOT NULL, "first_name" character varying(255), "last_name" character varying(255), "role_id" uuid NOT NULL, "location_id" uuid, "invited_by_user_id" uuid NOT NULL, "token_hash" character varying(64) NOT NULL, "status" "core"."organization_invitations_status_enum" NOT NULL DEFAULT 'pending', "expires_at" TIMESTAMP NOT NULL, "accepted_at" TIMESTAMP, "accepted_by_user_id" uuid, "revoked_at" TIMESTAMP, "revoked_by_user_id" uuid, "last_sent_at" TIMESTAMP NOT NULL, "send_count" integer NOT NULL DEFAULT '1', "failure_reason" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_f172f12b8a9ee6584b661f57e24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da2dfab0d3cb7f1bfdc886c428" ON "core"."organization_invitations" ("token_hash") `);
        await queryRunner.query(`ALTER TABLE "core"."locations" DROP COLUMN "parent_id"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" ADD CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchase_orders" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."unpublished_stock_purchase_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."organization_invitations" ADD CONSTRAINT "FK_7f88954e8d667a76ae3ced6f446" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."organization_invitations" ADD CONSTRAINT "FK_2d204b6ac5f1fd0473ad27c10b3" FOREIGN KEY ("role_id") REFERENCES "core"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."organization_invitations" ADD CONSTRAINT "FK_a1d238c3eb67a50cba9503dd216" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."organization_invitations" ADD CONSTRAINT "FK_f04dacf9d9c2b791f06c0fc8b7e" FOREIGN KEY ("invited_by_user_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."organization_invitations" DROP CONSTRAINT "FK_f04dacf9d9c2b791f06c0fc8b7e"`);
        await queryRunner.query(`ALTER TABLE "core"."organization_invitations" DROP CONSTRAINT "FK_a1d238c3eb67a50cba9503dd216"`);
        await queryRunner.query(`ALTER TABLE "core"."organization_invitations" DROP CONSTRAINT "FK_2d204b6ac5f1fd0473ad27c10b3"`);
        await queryRunner.query(`ALTER TABLE "core"."organization_invitations" DROP CONSTRAINT "FK_7f88954e8d667a76ae3ced6f446"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" DROP CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchase_orders"`);
        await queryRunner.query(`ALTER TABLE "core"."locations" ADD "parent_id" uuid`);
        await queryRunner.query(`DROP INDEX "core"."IDX_da2dfab0d3cb7f1bfdc886c428"`);
        await queryRunner.query(`DROP TABLE "core"."organization_invitations"`);
        await queryRunner.query(`DROP TYPE "core"."organization_invitations_status_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."unpublished_stock_purchase_items" ADD CONSTRAINT "FK__unpublished_stock_purchase_items__unpublished_stock_purchas" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."unpublished_stock_purchase_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."user_sessions" ADD CONSTRAINT "FK__user_sessions__users" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."drivers" ADD CONSTRAINT "FK__drivers__users" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
