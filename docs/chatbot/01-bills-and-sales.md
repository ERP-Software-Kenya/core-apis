# Bills and Sales

## What is a Bill?

A Bill is a sales transaction that tracks goods or services sold to a customer. Bills follow a lifecycle: Initiated → Draft → Completed or Cancelled.

## Sale Types

- **Normal**: Standard retail sale. Price is taken from the product's branch price.
- **Credit**: Goods are given now, payment collected later. The customer's credit balance is debited.
- **Black**: An off-the-books sale that uses unpublished (unregistered) stock. Black sale items are deducted from the unpublished-stock pool.

## Creating a Bill

1. Go to the Bills section and click "New Bill".
2. Select the location (warehouse or store) where the sale takes place.
3. Choose or create a customer. Walk-in customers can be entered by name and phone without a pre-existing customer record.
4. Choose the Sale Type (Normal, Credit, or Black).
5. Set Payment Method: Cash, Card, UPI, Net Banking, Cheque, or Credit.
6. Set Payment Timing: COD (cash on delivery), Before Delivery, After Delivery, or Half (partial upfront).
7. Add products using the item picker. Each item requires: product, quantity, unit price. Tax rate and discount are optional.
8. Save as Draft, then Complete when the transaction is finalised.

## Completing a Bill

A bill in Draft status can be moved to Completed. On completion the system deducts stock from inventory and records the payment transaction. A completed bill cannot be edited; create a Sales Return to reverse items.

## Cancelling a Bill

A Draft bill can be cancelled. Cancellation does not affect inventory (stock was not yet deducted at draft stage).

## Payment Methods

Accepted payment methods: CASH, CARD, UPI, NET_BANKING, CHEQUE, CREDIT.

## Payment Timing Options

- **COD**: Payment is collected at delivery.
- **Before Delivery**: Payment required before goods leave the location.
- **After Delivery**: Payment collected after goods are delivered.
- **Half**: A partial advance payment is collected upfront; the remainder is due later. Set the partial amount when creating the bill.

## Customer Types

Regular, New, Shop, or Big Customer. The customer type may affect pricing rules and credit limits.

## Bill Items

Each line item on a bill has: product, optional variant, quantity, unit price, optional tax rate, and optional discount amount. Items can be added, updated, or removed while the bill is in Draft status.

## Sales Returns

If a customer returns goods after a bill is completed, create a Sales Return referencing the original bill. The return re-adds stock to inventory and records a refund transaction.
