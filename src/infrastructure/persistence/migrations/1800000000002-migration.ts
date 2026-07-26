import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1800000000002 implements MigrationInterface {
  name = 'Migration1800000000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "core"."products" ALTER COLUMN "image_url" TYPE text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "core"."products" ALTER COLUMN "image_url" TYPE character varying(255)`,
    );
  }
}
