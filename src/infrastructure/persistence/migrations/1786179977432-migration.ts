import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1786179977432 implements MigrationInterface {
    name = 'Migration1786179977432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."page_access_configs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "page_key" character varying(100) NOT NULL, "allowed_roles" text NOT NULL DEFAULT '', "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d81fa12fa601b3f7338a0e76d6b" UNIQUE ("page_key"), CONSTRAINT "PK_3d16468835877c173a5678c419a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "core"."page_access_configs"`);
    }

}
