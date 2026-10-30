import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1793400000000 implements MigrationInterface {
  name = 'Migration1793400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "core"."organization_invitations_status_enum" AS ENUM('pending','accepted','expired','revoked','failed')`);
    await queryRunner.query(`CREATE TABLE "core"."organization_invitations" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL,
      "email" character varying(320) NOT NULL, "email_normalized" character varying(320) NOT NULL,
      "first_name" character varying(255), "last_name" character varying(255), "role_id" uuid NOT NULL,
      "location_id" uuid, "invited_by_user_id" uuid NOT NULL, "token_hash" character varying(64) NOT NULL,
      "status" "core"."organization_invitations_status_enum" NOT NULL DEFAULT 'pending',
      "expires_at" TIMESTAMP NOT NULL, "accepted_at" TIMESTAMP, "accepted_by_user_id" uuid,
      "revoked_at" TIMESTAMP, "revoked_by_user_id" uuid, "last_sent_at" TIMESTAMP NOT NULL,
      "send_count" integer NOT NULL DEFAULT 1, "failure_reason" text,
      "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(),
      CONSTRAINT "PK_organization_invitations" PRIMARY KEY ("id")
    )`);
    await queryRunner.query(`CREATE UNIQUE INDEX "UQ_organization_invitations_token_hash" ON "core"."organization_invitations" ("token_hash")`);
    await queryRunner.query(`CREATE UNIQUE INDEX "UQ_organization_invitations_pending_email" ON "core"."organization_invitations" ("organization_id", "email_normalized") WHERE "status" = 'pending'`);
    await queryRunner.query(`CREATE INDEX "IDX_organization_invitations_org_status" ON "core"."organization_invitations" ("organization_id", "status")`);
    await queryRunner.query(`ALTER TABLE "core"."organization_invitations" ADD CONSTRAINT "FK_org_invitation_org" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id")`);
    await queryRunner.query(`ALTER TABLE "core"."organization_invitations" ADD CONSTRAINT "FK_org_invitation_role" FOREIGN KEY ("role_id") REFERENCES "core"."roles"("id")`);
    await queryRunner.query(`ALTER TABLE "core"."organization_invitations" ADD CONSTRAINT "FK_org_invitation_location" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id")`);
    await queryRunner.query(`ALTER TABLE "core"."organization_invitations" ADD CONSTRAINT "FK_org_invitation_inviter" FOREIGN KEY ("invited_by_user_id") REFERENCES "core"."users"("id")`);
    await queryRunner.query(`ALTER TABLE "core"."organization_invitations" ADD CONSTRAINT "FK_org_invitation_acceptor" FOREIGN KEY ("accepted_by_user_id") REFERENCES "core"."users"("id")`);
    await queryRunner.query(`ALTER TABLE "core"."organization_invitations" ADD CONSTRAINT "FK_org_invitation_revoker" FOREIGN KEY ("revoked_by_user_id") REFERENCES "core"."users"("id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "core"."organization_invitations"`);
    await queryRunner.query(`DROP TYPE "core"."organization_invitations_status_enum"`);
  }
}
