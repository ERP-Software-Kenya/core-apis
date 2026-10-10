# Stock Transfers

## What is a Stock Transfer?

A Stock Transfer moves inventory from one location to another within the same organisation. There are two flows: Direct Transfer (immediate) and Transfer Request (branch-to-branch approval flow).

## Direct Stock Transfer

A direct transfer moves stock immediately without requiring approval from the destination.

### Steps

1. Go to Stock Transfers and click "New Transfer".
2. Select the source location.
3. Add items: for each item, specify the source inventory record, product, source location, destination location, and quantity.
4. The destination inventory record is optional — if the destination location has never held the product, the system creates the inventory record automatically.
5. Complete the transfer. Stock is deducted from the source and added to the destination immediately.

### Statuses

- **Pending**: Transfer header created, not yet completed.
- **Completed**: Items transferred. Inventory updated.
- **Cancelled**: Transfer cancelled before completion.

## Stock Transfer Request (Branch-to-Branch)

A transfer request is used when a branch needs stock from another branch and requires the other branch's approval.

### Lifecycle

Raise → Accept → Claim

1. **Raise**: The requesting branch creates a transfer request specifying the product and quantity needed.
2. **Accept**: The supplying branch reviews and accepts the request. On acceptance, stock is deducted from the supplying branch's inventory. The supplying branch must have sufficient stock.
3. **Claim**: The requesting branch claims the stock. On claim, inventory is added to the requesting branch. If the requesting branch has never held the product, the system creates an inventory record automatically.

### Key Rules

- The accepting branch must have an existing inventory record for the product (you cannot send stock you do not have).
- The claiming branch can receive even if it has no prior inventory record for the product.
