import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1786299878870 implements MigrationInterface {
    name = 'Migration1786299878870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."email_templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying(100) NOT NULL, "name" character varying(255) NOT NULL, "subject" character varying(500) NOT NULL, "html_body" text NOT NULL, "category" character varying(100), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_47fbf61afd456e17d308bb20443" UNIQUE ("slug"), CONSTRAINT "PK_email_templates" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "core"."email_templates"`);
    }

}
