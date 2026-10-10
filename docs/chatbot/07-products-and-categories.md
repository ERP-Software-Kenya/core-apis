# Products and Categories

## Products

A product represents a sellable or purchasable item in the ERP. Products belong to a category and to an organisation.

### Product Fields

- **Name**: Display name of the product.
- **SKU**: Unique stock-keeping unit code.
- **Category**: The category this product belongs to (hierarchical).
- **Unit**: Unit of measure (e.g. piece, kg, litre).
- **Weight (kg)**: Gross weight per unit, used for logistics calculations.
- **Tax Rate**: Default tax rate applied to this product on bills.
- **Variants**: A product can have multiple variants (e.g. size, colour). Each variant may have a different price or SKU.

### Product Pricing

Branch-specific pricing can be configured for each product. If a branch price is set, it overrides the default product price for sales made at that branch.

For Black Sales, a markup percentage is applied on top of the branch price to calculate the black sale price.

## Categories

Categories organise products into a hierarchy. A category can have parent categories, forming a tree. For example: Electronics > Mobile Phones > Smartphones.

### Creating a Category

1. Go to Categories.
2. Click "New Category".
3. Enter the name and select a parent category (optional for top-level categories).

## Product Suppliers

A product can be linked to multiple suppliers. The supplier link records the supplier's price (unit cost) for that product, used when creating Purchase Orders.

## Product Images

Product images can be uploaded and stored in the object storage (S3/Backblaze). Multiple images per product are supported.

## Taxes

Tax rates can be configured at the product level and at the organisation level. When a bill item is created, the tax rate on the product is used by default. It can be overridden per item.

Organisation-wide taxes (GST, VAT, etc.) can be configured in the Taxes section. These can be applied globally or per product type.
