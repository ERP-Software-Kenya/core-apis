# Purchase Orders

## What is a Purchase Order?

A Purchase Order (PO) is a record of goods ordered from a supplier. It tracks the full lifecycle from ordering to allocation into inventory.

## Purchase Order Lifecycle

Draft → Ordered → Partially Received → Received → Partially Allocated → Allocated → Cancelled

- **Draft**: PO is being prepared. Items can be added or changed.
- **Ordered**: PO has been sent to the supplier. No further item changes.
- **Partially Received**: Some items have arrived and been received into the warehouse.
- **Received**: All items have been received.
- **Partially Allocated**: Some received items have been allocated to inventory locations.
- **Allocated**: All received items have been allocated.
- **Cancelled**: The PO has been cancelled.

## Creating a Purchase Order

1. Go to Purchase Orders and click "New".
2. Select a supplier.
3. Select the destination location (warehouse or store).
4. Add line items: product, quantity, and unit cost for each item.
5. Save as Draft. Review and confirm, then move to Ordered status when you are ready to send to the supplier.

## Receiving Stock

When goods arrive from the supplier:

1. Open the PO and click "Receive".
2. For each item, enter the quantity actually received (may differ from ordered quantity).
3. Save the receipt. The PO status changes to Partially Received or Received depending on whether all items were fulfilled.

## Allocating Stock

After receiving, the stock must be allocated to inventory:

1. Open the received PO.
2. Click "Allocate".
3. Assign received quantities to specific inventory locations.
4. Save. The PO moves to Partially Allocated or Allocated.

## Purchase Returns

If received goods are defective or incorrect, create a Purchase Return referencing the original PO. The return deducts stock from inventory and records the credit with the supplier.

## Spend This Month (Analytics)

The monthly purchase spend figure includes all POs in statuses: Received, Partially Allocated, and Allocated.
