import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1785700000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Each rename is conditional — table may not exist yet on fresh install
    // (those tables are created with location_id already in 1800000000003).

    let check: unknown[];

    // orders
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='orders' AND column_name='store_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."orders" DROP CONSTRAINT IF EXISTS "FK__orders__stores"`);
      await queryRunner.query(`ALTER TABLE "core"."orders" RENAME COLUMN "store_id" TO "location_id"`);
      await queryRunner.query(`ALTER TABLE "core"."orders" ADD CONSTRAINT "FK__orders__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    // stock_entries
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='stock_entries' AND column_name='store_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."stock_entries" DROP CONSTRAINT IF EXISTS "FK__stock_entries__stores"`);
      await queryRunner.query(`ALTER TABLE "core"."stock_entries" RENAME COLUMN "store_id" TO "location_id"`);
      await queryRunner.query(`ALTER TABLE "core"."stock_entries" ADD CONSTRAINT "FK__stock_entries__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    // stock_transfers
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='stock_transfers' AND column_name='from_store_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."stock_transfers" DROP CONSTRAINT IF EXISTS "FK__stock_transfers__from_stores"`);
      await queryRunner.query(`ALTER TABLE "core"."stock_transfers" DROP CONSTRAINT IF EXISTS "FK__stock_transfers__to_stores"`);
      await queryRunner.query(`ALTER TABLE "core"."stock_transfers" RENAME COLUMN "from_store_id" TO "from_location_id"`);
      await queryRunner.query(`ALTER TABLE "core"."stock_transfers" RENAME COLUMN "to_store_id" TO "to_location_id"`);
      await queryRunner.query(`ALTER TABLE "core"."stock_transfers" ADD CONSTRAINT "FK__stock_transfers__from_locations" FOREIGN KEY ("from_location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "core"."stock_transfers" ADD CONSTRAINT "FK__stock_transfers__to_locations" FOREIGN KEY ("to_location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    // item_returns
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='item_returns' AND column_name='store_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."item_returns" DROP CONSTRAINT IF EXISTS "FK__item_returns__stores"`);
      await queryRunner.query(`ALTER TABLE "core"."item_returns" RENAME COLUMN "store_id" TO "location_id"`);
      await queryRunner.query(`ALTER TABLE "core"."item_returns" ADD CONSTRAINT "FK__item_returns__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    // expenses
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='expenses' AND column_name='store_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."expenses" DROP CONSTRAINT IF EXISTS "FK__expenses__stores"`);
      await queryRunner.query(`ALTER TABLE "core"."expenses" RENAME COLUMN "store_id" TO "location_id"`);
      await queryRunner.query(`ALTER TABLE "core"."expenses" ADD CONSTRAINT "FK__expenses__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    // activity_logs (created in 1777456933640 — exists on fresh install)
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='activity_logs' AND column_name='store_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."activity_logs" DROP CONSTRAINT IF EXISTS "FK__activity_logs__stores"`);
      await queryRunner.query(`ALTER TABLE "core"."activity_logs" RENAME COLUMN "store_id" TO "location_id"`);
      await queryRunner.query(`ALTER TABLE "core"."activity_logs" ADD CONSTRAINT "FK__activity_logs__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    // user_roles (created in 1777456933640 — exists on fresh install)
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='user_roles' AND column_name='store_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP CONSTRAINT IF EXISTS "FK__user_roles__stores"`);
      await queryRunner.query(`ALTER TABLE "core"."user_roles" RENAME COLUMN "store_id" TO "location_id"`);
      await queryRunner.query(`ALTER TABLE "core"."user_roles" ADD CONSTRAINT "FK__user_roles__locations" FOREIGN KEY ("location_id") REFERENCES "core"."locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    let check: unknown[];

    // user_roles
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='user_roles' AND column_name='location_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP CONSTRAINT IF EXISTS "FK__user_roles__locations"`);
      await queryRunner.query(`ALTER TABLE "core"."user_roles" RENAME COLUMN "location_id" TO "store_id"`);
      await queryRunner.query(`ALTER TABLE "core"."user_roles" ADD CONSTRAINT "FK__user_roles__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    // activity_logs
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='activity_logs' AND column_name='location_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."activity_logs" DROP CONSTRAINT IF EXISTS "FK__activity_logs__locations"`);
      await queryRunner.query(`ALTER TABLE "core"."activity_logs" RENAME COLUMN "location_id" TO "store_id"`);
      await queryRunner.query(`ALTER TABLE "core"."activity_logs" ADD CONSTRAINT "FK__activity_logs__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    // expenses
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='expenses' AND column_name='location_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."expenses" DROP CONSTRAINT IF EXISTS "FK__expenses__locations"`);
      await queryRunner.query(`ALTER TABLE "core"."expenses" RENAME COLUMN "location_id" TO "store_id"`);
      await queryRunner.query(`ALTER TABLE "core"."expenses" ADD CONSTRAINT "FK__expenses__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    // item_returns
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='item_returns' AND column_name='location_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."item_returns" DROP CONSTRAINT IF EXISTS "FK__item_returns__locations"`);
      await queryRunner.query(`ALTER TABLE "core"."item_returns" RENAME COLUMN "location_id" TO "store_id"`);
      await queryRunner.query(`ALTER TABLE "core"."item_returns" ADD CONSTRAINT "FK__item_returns__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    // stock_transfers
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='stock_transfers' AND column_name='from_location_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."stock_transfers" DROP CONSTRAINT IF EXISTS "FK__stock_transfers__from_locations"`);
      await queryRunner.query(`ALTER TABLE "core"."stock_transfers" DROP CONSTRAINT IF EXISTS "FK__stock_transfers__to_locations"`);
      await queryRunner.query(`ALTER TABLE "core"."stock_transfers" RENAME COLUMN "from_location_id" TO "from_store_id"`);
      await queryRunner.query(`ALTER TABLE "core"."stock_transfers" RENAME COLUMN "to_location_id" TO "to_store_id"`);
      await queryRunner.query(`ALTER TABLE "core"."stock_transfers" ADD CONSTRAINT "FK__stock_transfers__from_stores" FOREIGN KEY ("from_store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "core"."stock_transfers" ADD CONSTRAINT "FK__stock_transfers__to_stores" FOREIGN KEY ("to_store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    // stock_entries
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='stock_entries' AND column_name='location_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."stock_entries" DROP CONSTRAINT IF EXISTS "FK__stock_entries__locations"`);
      await queryRunner.query(`ALTER TABLE "core"."stock_entries" RENAME COLUMN "location_id" TO "store_id"`);
      await queryRunner.query(`ALTER TABLE "core"."stock_entries" ADD CONSTRAINT "FK__stock_entries__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    // orders
    check = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_schema='core' AND table_name='orders' AND column_name='location_id'`,
    );
    if (check.length > 0) {
      await queryRunner.query(`ALTER TABLE "core"."orders" DROP CONSTRAINT IF EXISTS "FK__orders__locations"`);
      await queryRunner.query(`ALTER TABLE "core"."orders" RENAME COLUMN "location_id" TO "store_id"`);
      await queryRunner.query(`ALTER TABLE "core"."orders" ADD CONSTRAINT "FK__orders__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
  }
}
