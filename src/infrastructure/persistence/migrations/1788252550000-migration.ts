import { MigrationInterface, QueryRunner } from 'typeorm';

/** Separate migration so PostgreSQL commits the new enum before it is referenced. */
export class Migration1788252550000 implements MigrationInterface {
  name = 'Migration1788252550000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TYPE "core"."roles_name_enum" ADD VALUE IF NOT EXISTS 'branch_manager'
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // PostgreSQL does not support removing enum values safely.
  }
}
