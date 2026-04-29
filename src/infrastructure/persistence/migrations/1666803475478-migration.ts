import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1666803475478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "core"`);
    await queryRunner.query(
      `CREATE TABLE "public"."seeds" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "version" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK__seeds" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."seeds"`);
    await queryRunner.query(`DROP SCHEMA "core"`);
  }
}
