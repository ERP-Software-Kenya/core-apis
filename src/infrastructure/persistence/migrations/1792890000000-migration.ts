import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1792890000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "core"."user_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "clerk_session_id" character varying(255) NOT NULL, "device_id" character varying(255) NOT NULL, "device_name" character varying(255) NOT NULL, "platform" character varying(50) NOT NULL, "app_version" character varying(50), "ip_address" character varying(64), "user_agent" character varying(1000), "status" character varying(20) NOT NULL DEFAULT 'active', "last_active_at" TIMESTAMP NOT NULL DEFAULT now(), "ended_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_user_sessions" PRIMARY KEY ("id"), CONSTRAINT "FK__user_sessions__users" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE CASCADE)`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "UQ__user_sessions__clerk_session_id" ON "core"."user_sessions" ("clerk_session_id")`);
    await queryRunner.query(`CREATE INDEX "IDX__user_sessions__user_last_active" ON "core"."user_sessions" ("user_id", "last_active_at")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "core"."user_sessions"`);
  }
}
