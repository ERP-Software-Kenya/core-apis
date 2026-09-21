import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1790014638423 implements MigrationInterface {
    name = 'Migration1790014638423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."product_branch_prices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "branch_id" uuid NOT NULL, "product_id" uuid NOT NULL, "cost_price" numeric(18,4), "retail_price" numeric(18,4), "loyalty_price" numeric(18,4), "wholesale_price" numeric(18,4), "transfer_price" numeric(18,4), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ__product_branch_prices__branch_product" UNIQUE ("branch_id", "product_id"), CONSTRAINT "PK_product_branch_prices" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."branches" ADD "is_main" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "core"."products" ADD COLUMN IF NOT EXISTS "weight_kg" numeric(10,4)`);
        await queryRunner.query(`ALTER TABLE "core"."product_branch_prices" ADD CONSTRAINT "FK__product_branch_prices__branches" FOREIGN KEY ("branch_id") REFERENCES "core"."branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."product_branch_prices" ADD CONSTRAINT "FK__product_branch_prices__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."product_branch_prices" DROP CONSTRAINT "FK__product_branch_prices__products"`);
        await queryRunner.query(`ALTER TABLE "core"."product_branch_prices" DROP CONSTRAINT "FK__product_branch_prices__branches"`);
        await queryRunner.query(`ALTER TABLE "core"."products" DROP COLUMN "weight_kg"`);
        await queryRunner.query(`ALTER TABLE "core"."branches" DROP COLUMN "is_main"`);
        await queryRunner.query(`DROP TABLE "core"."product_branch_prices"`);
    }

}
