import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1790050869233 implements MigrationInterface {
    name = 'Migration1790050869233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."taxes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "name" character varying(100) NOT NULL, "rate" numeric(10,4) NOT NULL, "description" text, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_taxes" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."products" ADD "tax_id" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."taxes" ADD CONSTRAINT "FK__taxes__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."products" ADD CONSTRAINT "FK__products__taxes" FOREIGN KEY ("tax_id") REFERENCES "core"."taxes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."products" DROP CONSTRAINT "FK__products__taxes"`);
        await queryRunner.query(`ALTER TABLE "core"."taxes" DROP CONSTRAINT "FK__taxes__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."products" DROP COLUMN "tax_id"`);
        await queryRunner.query(`DROP TABLE "core"."taxes"`);
    }

}
