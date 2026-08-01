import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1785581125459 implements MigrationInterface {
    name = 'Migration1785581125459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."ref_cities" ("id" integer NOT NULL, "name" character varying(255) NOT NULL, "state_id" integer NOT NULL, "state_code" character varying(10), "country_id" integer NOT NULL, "country_code" character varying(2), "latitude" numeric(11,8), "longitude" numeric(11,8), CONSTRAINT "PK_ref_cities" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."ref_states" ("id" integer NOT NULL, "name" character varying(255) NOT NULL, "country_id" integer NOT NULL, "country_code" character varying(2), "fips_code" character varying(10), "iso2" character varying(10), "latitude" numeric(11,8), "longitude" numeric(11,8), CONSTRAINT "PK_ref_states" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."ref_countries" ("id" integer NOT NULL, "name" character varying(255) NOT NULL, "iso3" character varying(3) NOT NULL, "iso2" character varying(2) NOT NULL, "phone_code" character varying(25), "currency" character varying(10), "currency_symbol" character varying(10), "native" character varying(255), "region" character varying(50), "latitude" numeric(11,8), "longitude" numeric(11,8), "timezones" jsonb, CONSTRAINT "PK_ref_countries" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."ref_currencies" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "name" character varying(255) NOT NULL, "symbol" character varying(10), "symbol_native" character varying(10), "decimal_digits" integer NOT NULL DEFAULT '2', "rounding" numeric(5,2) NOT NULL DEFAULT '0', "name_plural" character varying(255), CONSTRAINT "UQ_a245452b5daddbf766ce0a85b77" UNIQUE ("code"), CONSTRAINT "PK_ref_currencies" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."ref_languages" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_6ded80eec51006d7471136cdc0c" UNIQUE ("code"), CONSTRAINT "PK_ref_languages" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."ref_cities" ADD CONSTRAINT "FK_ref_cities_state" FOREIGN KEY ("state_id") REFERENCES "core"."ref_states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."ref_cities" ADD CONSTRAINT "FK_ref_cities_country" FOREIGN KEY ("country_id") REFERENCES "core"."ref_countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."ref_states" ADD CONSTRAINT "FK_ref_states_country" FOREIGN KEY ("country_id") REFERENCES "core"."ref_countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."ref_states" DROP CONSTRAINT "FK_ref_states_country"`);
        await queryRunner.query(`ALTER TABLE "core"."ref_cities" DROP CONSTRAINT "FK_ref_cities_country"`);
        await queryRunner.query(`ALTER TABLE "core"."ref_cities" DROP CONSTRAINT "FK_ref_cities_state"`);
        await queryRunner.query(`DROP TABLE "core"."ref_languages"`);
        await queryRunner.query(`DROP TABLE "core"."ref_currencies"`);
        await queryRunner.query(`DROP TABLE "core"."ref_countries"`);
        await queryRunner.query(`DROP TABLE "core"."ref_states"`);
        await queryRunner.query(`DROP TABLE "core"."ref_cities"`);
    }

}
