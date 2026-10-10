# Inventory Management

## What is Inventory?

Inventory tracks how much of each product is held at each location. A separate inventory record exists for every product-location combination.

## Inventory Record Fields

- **Product**: The product this record tracks.
- **Location**: The warehouse or store holding the stock.
- **Quantity on Hand**: Current physical stock count.
- **Reserved Quantity**: Stock reserved for pending orders (not yet dispatched).
- **Unit Cost**: Average cost per unit, updated automatically on stock additions.

## Stock Operations

### Add Stock
Stock is added when a Purchase Order is received and allocated. The unit cost is recalculated as a weighted average of existing stock cost and incoming cost.

### Deduct Stock
Stock is deducted when a sale (bill) is completed or when stock is transferred out.

### Reserve Stock
Stock is reserved when an order is confirmed but not yet dispatched. Reserved stock is unavailable for other sales.

### Release Reservation
Reservation is released when an order is cancelled or the reserved quantity is dispatched.

### Adjust Stock
An admin can make a manual stock adjustment (e.g. after a physical count). The quantity is set to the absolute value provided, and the unit cost is updated.

## Low Stock Alerts

The system identifies products where quantity on hand falls below a configurable threshold. These appear in the Low Stock section of Analytics.

## Stock Valuation

The valuation report shows the total value of stock at each location, calculated as quantity × unit cost per product.

## Unpublished Stock

Unpublished stock is off-the-books inventory used for Black Sales. It is managed separately from regular inventory.

- Add unpublished stock via the Unpublished Stock section.
- Use unpublished stock in a Black Sale (it is deducted automatically on bill completion).
- Publish unpublished stock to bring it into the regular inventory (e.g. to correct records).
