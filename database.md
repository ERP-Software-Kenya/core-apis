🧱 1. CORE DESIGN RULES (APPLIED EVERYWHERE)
PK → UUID (id)
All business tables → include org_id
Soft delete → deleted_at
Audit fields → created_at, updated_at
Indexes on ALL FKs
Composite unique constraints where needed
🏢 2. PLATFORM & ORGANIZATION
🟦 platforms
id (PK)
name
config (JSONB)
maintenance_mode
created_at
🟦 platform_configurations
id (PK)
key (UNIQUE)
value (JSONB)
updated_by (FK → users.id)
updated_at
🟩 organizations
id (PK)
name
slug (UNIQUE)
logo_url
status
plan_type
max_stores
max_users
onboarded_at
metadata (JSONB)
created_at, updated_at, deleted_at
🟩 org_addresses
id (PK)
org_id (FK)
type
line1, line2, city, state, country, postal_code
is_primary
created_at
🟩 org_members
id (PK)
org_id (FK)
user_id (FK)
role_id (FK)
status
invited_by (FK → users)
joined_at
UNIQUE(org_id, user_id)
👤 3. USERS & AUTH
🟨 users
id (PK)
email (UNIQUE)
phone
password_hash
auth_provider
auth_provider_uid
status
email_verified_at
last_login_at
mfa_enabled
created_at, updated_at, deleted_at
🟨 user_profiles
id (PK)
user_id (UNIQUE FK)
first_name, last_name
avatar_url
timezone
locale
🟨 user_addresses
id (PK)
user_id (FK)
type
address fields
🔐 4. RBAC SYSTEM
🟧 roles
id (PK)
name
slug (UNIQUE)
portal_type
org_id (nullable)
is_system
🟧 permissions
id (PK)
name (UNIQUE)
resource
action
🟧 role_permissions
role_id (FK)
permission_id (FK)
PRIMARY KEY (role_id, permission_id)
🏬 5. STORES & STAFF
🟪 stores
id (PK)
org_id (FK)
name
code
type
status
address fields
UNIQUE(org_id, code)
🟪 store_members
id (PK)
store_id (FK)
user_id (FK)
role_id (FK)
status
UNIQUE(store_id, user_id)
📦 6. PRODUCT DOMAIN
🟫 categories
id (PK)
org_id (FK)
parent_id (self FK)
name
slug
is_active
UNIQUE(org_id, slug)
🟫 suppliers
id (PK)
org_id (FK)
name
code
email, phone
gstin
status
🟫 products
id (PK)
org_id (FK)
category_id (FK)
supplier_id (FK)
name
sku (UNIQUE per org)
barcode
unit
unit_price
cost_price
tax_rate
min_stock_level
status
🟫 product_variants
id (PK)
product_id (FK)
sku (UNIQUE per product)
attributes (JSONB)
unit_price
cost_price
🟫 store_product_config
id (PK)
store_id (FK)
product_id (FK)
variant_id (FK nullable)
selling_price
min_stock_level
is_available
UNIQUE(store_id, product_id, variant_id)
📊 7. INVENTORY SYSTEM
🟥 stock_inventory (CRITICAL TABLE)
id (PK)
store_id (FK)
product_id (FK)
variant_id (FK nullable)
quantity_on_hand
quantity_reserved
quantity_on_order
updated_at
UNIQUE(store_id, product_id, variant_id)
🟥 stock_entries
id (PK)
store_id (FK)
product_id (FK)
supplier_id (FK)
quantity
unit_cost
entry_type
reference_number
status
🟥 stock_logs (APPEND ONLY)
id (PK)
store_id (FK)
product_id (FK)
variant_id (FK)
reference_id
reference_type
quantity_change
quantity_before
quantity_after
action
created_at
🚚 8. PROCUREMENT
🟦 purchase_orders
id (PK)
org_id (FK)
store_id (FK)
supplier_id (FK)
po_number (UNIQUE)
status
total_amount
🟦 purchase_order_items
id (PK)
po_id (FK)
product_id (FK)
variant_id (FK)
quantity_ordered
quantity_received
🔄 9. STOCK TRANSFER
🟪 stock_transfers
id (PK)
org_id (FK)
from_store_id (FK)
to_store_id (FK)
transfer_number (UNIQUE)
status
🟪 stock_transfer_items
id (PK)
transfer_id (FK)
product_id (FK)
variant_id (FK)
quantity_sent
quantity_received
🛒 10. SALES DOMAIN
🟩 customers
id (PK)
org_id (FK)
name
email
phone
gstin
🟩 orders
id (PK)
order_number (UNIQUE)
store_id (FK)
customer_id (FK)
status
subtotal
tax_amount
total_amount
payment_status
🟩 order_items
id (PK)
order_id (FK)
product_id (FK)
variant_id (FK)
quantity
unit_price
tax_amount
line_total
🎟️ discount_coupons (PROMOCODE)
id (PK)
org_id (FK)
code (UNIQUE per org)
type
value
max_uses
used_count
valid_from
valid_until
is_active
💰 11. FINANCE
🟨 invoices
id (PK)
order_id (FK)
invoice_number (UNIQUE)
total_amount
status
🟨 bills
id (PK)
supplier_id (FK)
store_id (FK)
total_amount
status
🟨 payment_transactions
id (PK)
org_id (FK)
reference_id
reference_type
type
method
amount
status
🟨 expenses
id (PK)
org_id (FK)
store_id (FK)
amount
category
expense_date
🔁 12. RETURNS
🟥 item_returns
id (PK)
store_id (FK)
order_id (FK nullable)
supplier_id (FK nullable)
return_type
status
total_amount
🟥 return_items
id (PK)
return_id (FK)
product_id (FK)
variant_id (FK)
quantity
🔔 13. SYSTEM
🔘 notifications
id (PK)
user_id (FK)
org_id (FK)
type
title
body
read_at
🔘 user_activity_logs
id (PK)
user_id (FK)
org_id (FK)
store_id (FK)
action
resource_type
resource_id
🔘 org_activity_logs
id (PK)
org_id (FK)
actor_id (FK)
event_type
🔘 report_generation_logs
id (PK)
org_id (FK)
report_type
status
file_url