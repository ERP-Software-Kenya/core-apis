# Sales Returns

## What is a Sales Return?

A Sales Return records goods that a customer returns after a completed Sales Order. It tracks which items are being returned, how many units, and calculates the refund amount owed to the customer. Creating a return re-adds the returned stock to inventory.

## Sales Return Lifecycle

Sales Returns follow a three-status lifecycle:

- **draft**: The return has been initiated but not yet processed. Items and quantities can still be adjusted.
- **finalized**: The return has been confirmed, stock has been re-added to inventory, and the refund has been recorded. No further changes are possible.
- **cancelled**: The return was discarded. No changes to inventory or financials are made.

## Creating a Sales Return

1. Go to the Sales section and open the Returns tab.
2. Tap **New Return**.
3. Search for and select the original Sales Order being returned against.
4. The system loads the returnable items from that order — each showing the original quantity ordered, quantity already returned (if any), and quantity still returnable.
5. Enter the quantity being returned for each applicable item. You cannot return more than the remaining returnable quantity.
6. Optionally enter a reason for the return (e.g. damaged goods, wrong item).
7. Save. The return is created in **draft** status.

## Return Items

Each return line references a specific line item from the original order (`orderItemId`) and records:

- **quantityOrdered**: how many units were on the original order line.
- **quantityReturnable**: how many units are still eligible to be returned.
- **quantityReturned**: how many units this return is taking back.
- **unitPrice**: the price per unit at the time of the original order.
- **lineRefund**: the refund value for this line (quantityReturned × unitPrice).

## Finalizing a Return

Once the returned goods are received and verified, tap **Finalize** on the return detail screen. This moves the return to **finalized** status, restores the stock, and records the refund.

## Cancelling a Return

A return in **draft** status can be cancelled. Cancelling a draft return has no effect on inventory or financials.

## Refund Total

The **Total Refund** is the sum of all line refunds across the return. This is the amount owed back to the customer.

## Filtering Sales Returns

The returns list can be filtered by status (draft, finalized, cancelled) and searched by return number, order number, or customer name.
