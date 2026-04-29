import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1777456933640 implements MigrationInterface {
    name = 'Migration1777456933640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "name" character varying(255) NOT NULL, "description" text, "parent_id" uuid, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_categories" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."inventory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity_on_hand" numeric(18,4) NOT NULL DEFAULT '0', "quantity_reserved" numeric(18,4) NOT NULL DEFAULT '0', "reorder_level" numeric(18,4) NOT NULL DEFAULT '0', "max_stock" numeric(18,4), "location" character varying(100), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ__inventory__store_product" UNIQUE ("store_id", "product_id"), CONSTRAINT "PK_inventory" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."suppliers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "name" character varying(255) NOT NULL, "contact_person" character varying(255), "email" character varying(255), "phone" character varying(20), "address" text, "tax_id" character varying(100), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_suppliers" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "core"."purchase_orders_status_enum" AS ENUM('draft', 'ordered', 'partially_received', 'received', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "core"."purchase_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" uuid NOT NULL, "supplier_id" uuid NOT NULL, "created_by_id" uuid, "po_number" character varying(50) NOT NULL, "status" "core"."purchase_orders_status_enum" NOT NULL DEFAULT 'draft', "expected_at" TIMESTAMP, "received_at" TIMESTAMP, "total_amount" numeric(18,4) NOT NULL DEFAULT '0', "notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_74065a5d2b8c4c14b8b8fcf0159" UNIQUE ("po_number"), CONSTRAINT "PK_purchase_orders" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."purchase_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "purchase_order_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity_ordered" numeric(18,4) NOT NULL, "quantity_received" numeric(18,4) NOT NULL DEFAULT '0', "unit_cost" numeric(18,4) NOT NULL, "total_cost" numeric(18,4) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_purchase_items" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "core"."products_unit_enum" AS ENUM('piece', 'kg', 'gram', 'litre', 'ml', 'box', 'pack', 'dozen')`);
        await queryRunner.query(`CREATE TABLE "core"."products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "category_id" uuid, "name" character varying(255) NOT NULL, "sku" character varying(100), "barcode" character varying(100), "description" text, "unit" "core"."products_unit_enum" NOT NULL DEFAULT 'piece', "cost_price" numeric(18,4) NOT NULL DEFAULT '0', "selling_price" numeric(18,4) NOT NULL DEFAULT '0', "reorder_point" integer NOT NULL DEFAULT '0', "image_url" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_products" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "core"."stock_movements_movement_type_enum" AS ENUM('stock_in', 'stock_out', 'adjustment', 'transfer', 'return', 'damage', 'purchase_receipt')`);
        await queryRunner.query(`CREATE TABLE "core"."stock_movements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "inventory_id" uuid NOT NULL, "store_id" uuid NOT NULL, "product_id" uuid NOT NULL, "performed_by_id" uuid, "reference_id" uuid, "reference_type" character varying(50), "movement_type" "core"."stock_movements_movement_type_enum" NOT NULL, "quantity" numeric(18,4) NOT NULL, "quantity_before" numeric(18,4) NOT NULL, "quantity_after" numeric(18,4) NOT NULL, "unit_cost" numeric(18,4), "notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_stock_movements" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "core"."activity_logs_action_enum" AS ENUM('login', 'logout', 'add_stock', 'remove_stock', 'adjust_stock', 'transfer_stock', 'create_product', 'update_product', 'delete_product', 'create_purchase_order', 'receive_purchase_order', 'cancel_purchase_order', 'create_store', 'update_store', 'create_user', 'update_user', 'deactivate_user')`);
        await queryRunner.query(`CREATE TABLE "core"."activity_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "organization_id" uuid NOT NULL, "store_id" uuid, "action" "core"."activity_logs_action_enum" NOT NULL, "entity_type" character varying(100), "entity_id" uuid, "metadata" jsonb, "ip_address" character varying(50), "user_agent" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_activity_logs" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password_hash" character varying(255) NOT NULL, "phone" character varying(20), "avatar_url" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "last_login_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_users" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "core"."roles_name_enum" AS ENUM('super_admin', 'org_admin', 'store_manager', 'store_staff')`);
        await queryRunner.query(`CREATE TABLE "core"."roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "core"."roles_name_enum" NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_roles" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."user_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "role_id" uuid NOT NULL, "store_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_user_roles" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."stores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organization_id" uuid NOT NULL, "name" character varying(255) NOT NULL, "code" character varying(100), "address" text, "city" character varying(100), "country" character varying(100), "phone" character varying(20), "email" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_stores" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "slug" character varying(100), "email" character varying(255), "phone" character varying(20), "address" text, "country" character varying(100), "logo_url" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_9b7ca6d30b94fef571cff876884" UNIQUE ("name"), CONSTRAINT "PK_organizations" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."categories" ADD CONSTRAINT "FK__categories__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."categories" ADD CONSTRAINT "FK__categories__parent" FOREIGN KEY ("parent_id") REFERENCES "core"."categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD CONSTRAINT "FK__inventory__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" ADD CONSTRAINT "FK__inventory__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."suppliers" ADD CONSTRAINT "FK__suppliers__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" ADD CONSTRAINT "FK__purchase_orders__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" ADD CONSTRAINT "FK__purchase_orders__suppliers" FOREIGN KEY ("supplier_id") REFERENCES "core"."suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" ADD CONSTRAINT "FK__purchase_orders__users" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_items" ADD CONSTRAINT "FK__purchase_items__purchase_orders" FOREIGN KEY ("purchase_order_id") REFERENCES "core"."purchase_orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_items" ADD CONSTRAINT "FK__purchase_items__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."products" ADD CONSTRAINT "FK__products__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."products" ADD CONSTRAINT "FK__products__categories" FOREIGN KEY ("category_id") REFERENCES "core"."categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" ADD CONSTRAINT "FK__stock_movements__inventory" FOREIGN KEY ("inventory_id") REFERENCES "core"."inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" ADD CONSTRAINT "FK__stock_movements__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" ADD CONSTRAINT "FK__stock_movements__products" FOREIGN KEY ("product_id") REFERENCES "core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" ADD CONSTRAINT "FK__stock_movements__users" FOREIGN KEY ("performed_by_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."activity_logs" ADD CONSTRAINT "FK__activity_logs__users" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."activity_logs" ADD CONSTRAINT "FK__activity_logs__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."activity_logs" ADD CONSTRAINT "FK__activity_logs__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."users" ADD CONSTRAINT "FK__users__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" ADD CONSTRAINT "FK__user_roles__users" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" ADD CONSTRAINT "FK__user_roles__roles" FOREIGN KEY ("role_id") REFERENCES "core"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" ADD CONSTRAINT "FK__user_roles__stores" FOREIGN KEY ("store_id") REFERENCES "core"."stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."stores" ADD CONSTRAINT "FK__stores__organizations" FOREIGN KEY ("organization_id") REFERENCES "core"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."stores" DROP CONSTRAINT "FK__stores__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP CONSTRAINT "FK__user_roles__stores"`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP CONSTRAINT "FK__user_roles__roles"`);
        await queryRunner.query(`ALTER TABLE "core"."user_roles" DROP CONSTRAINT "FK__user_roles__users"`);
        await queryRunner.query(`ALTER TABLE "core"."users" DROP CONSTRAINT "FK__users__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."activity_logs" DROP CONSTRAINT "FK__activity_logs__stores"`);
        await queryRunner.query(`ALTER TABLE "core"."activity_logs" DROP CONSTRAINT "FK__activity_logs__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."activity_logs" DROP CONSTRAINT "FK__activity_logs__users"`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" DROP CONSTRAINT "FK__stock_movements__users"`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" DROP CONSTRAINT "FK__stock_movements__products"`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" DROP CONSTRAINT "FK__stock_movements__stores"`);
        await queryRunner.query(`ALTER TABLE "core"."stock_movements" DROP CONSTRAINT "FK__stock_movements__inventory"`);
        await queryRunner.query(`ALTER TABLE "core"."products" DROP CONSTRAINT "FK__products__categories"`);
        await queryRunner.query(`ALTER TABLE "core"."products" DROP CONSTRAINT "FK__products__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_items" DROP CONSTRAINT "FK__purchase_items__products"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_items" DROP CONSTRAINT "FK__purchase_items__purchase_orders"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" DROP CONSTRAINT "FK__purchase_orders__users"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" DROP CONSTRAINT "FK__purchase_orders__suppliers"`);
        await queryRunner.query(`ALTER TABLE "core"."purchase_orders" DROP CONSTRAINT "FK__purchase_orders__stores"`);
        await queryRunner.query(`ALTER TABLE "core"."suppliers" DROP CONSTRAINT "FK__suppliers__organizations"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP CONSTRAINT "FK__inventory__products"`);
        await queryRunner.query(`ALTER TABLE "core"."inventory" DROP CONSTRAINT "FK__inventory__stores"`);
        await queryRunner.query(`ALTER TABLE "core"."categories" DROP CONSTRAINT "FK__categories__parent"`);
        await queryRunner.query(`ALTER TABLE "core"."categories" DROP CONSTRAINT "FK__categories__organizations"`);
        await queryRunner.query(`DROP TABLE "core"."organizations"`);
        await queryRunner.query(`DROP TABLE "core"."stores"`);
        await queryRunner.query(`DROP TABLE "core"."user_roles"`);
        await queryRunner.query(`DROP TABLE "core"."roles"`);
        await queryRunner.query(`DROP TYPE "core"."roles_name_enum"`);
        await queryRunner.query(`DROP TABLE "core"."users"`);
        await queryRunner.query(`DROP TABLE "core"."activity_logs"`);
        await queryRunner.query(`DROP TYPE "core"."activity_logs_action_enum"`);
        await queryRunner.query(`DROP TABLE "core"."stock_movements"`);
        await queryRunner.query(`DROP TYPE "core"."stock_movements_movement_type_enum"`);
        await queryRunner.query(`DROP TABLE "core"."products"`);
        await queryRunner.query(`DROP TYPE "core"."products_unit_enum"`);
        await queryRunner.query(`DROP TABLE "core"."purchase_items"`);
        await queryRunner.query(`DROP TABLE "core"."purchase_orders"`);
        await queryRunner.query(`DROP TYPE "core"."purchase_orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "core"."suppliers"`);
        await queryRunner.query(`DROP TABLE "core"."inventory"`);
        await queryRunner.query(`DROP TABLE "core"."categories"`);
    }

}
