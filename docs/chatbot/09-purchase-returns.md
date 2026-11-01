# Purchase Returns

## What is a Purchase Return?

A Purchase Return records goods sent back to a supplier after a Purchase Order has been received. It tracks which items are being returned, the quantities, and the credit amount owed by the supplier. Purchase Returns are used when received goods are damaged, incorrect, or surplus.

## Purchase Return Lifecycle

Purchase Returns follow a three-status lifecycle:

- **draft**: The return has been initiated but not yet processed. Items and quantities can still be adjusted.
- **finalized**: The return has been confirmed, stock has been deducted from inventory, and the supplier credit has been recorded. No further changes are possible.
- **cancelled**: The return was discarded. No changes to inventory or financials are made.

## Creating a Purchase Return

1. Go to the Purchase section and open the Returns tab.
2. Tap **New Purchase Return**.
3. Search for and select the original Purchase Order being returned against. Only orders in **received** status are eligible.
4. The system loads the items from that purchase order.
5. Enter the quantity being returned for each applicable item.
6. Optionally enter a reason for the return (e.g. damaged on arrival, wrong specification).
7. Save. The return is created in **draft** status.

## Return Items

Each return line references a specific line item from the original purchase order (`purchaseOrderItemId`) and records:

- **quantityReturned**: how many units are being sent back to the supplier.
- **unitCost**: the cost per unit at the time of the original purchase.
- **lineRefund**: the credit value for this line (quantityReturned × unitCost).

## Finalizing a Return

Once the goods have been physically dispatched to the supplier, tap **Finalize** on the return detail screen. This moves the return to **finalized** status, deducts the returned stock from inventory, and records the supplier credit.

## Cancelling a Return

A return in **draft** status can be cancelled. Cancelling a draft return has no effect on inventory or financials.

## Total Refund (Credit)

The **Total Refund** is the sum of all line refunds across the return. This represents the credit the supplier owes you for the returned goods.

## Filtering Purchase Returns

The returns list can be filtered by status (draft, finalized, cancelled) and searched by return number, PO number, or supplier name.
