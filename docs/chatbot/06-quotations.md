# Quotations

## What is a Quotation?

A Quotation is a formal price offer sent to a customer before a sale is confirmed. It lists products with quantities, unit prices, optional discounts, and optional tax. The customer can accept the quotation, at which point it is converted into a Sales Order.

## Quotation Lifecycle

Quotations follow a four-status lifecycle:

- **draft**: The quotation has been created but not yet shared with the customer. It can be edited.
- **sent**: The quotation has been emailed to the customer. It is awaiting a response.
- **converted**: The customer accepted the quotation and it has been converted into a Sales Order. No further changes are possible.
- **cancelled**: The quotation was withdrawn or rejected. No further changes are possible.

## Creating a Quotation

1. Go to the Sales section and open the Quotations tab.
2. Tap **New Quotation**.
3. Select or enter a customer. You can link an existing customer by ID or enter the customer name directly without a pre-existing record.
4. Optionally set a **Valid Until** date — the date after which the offer expires.
5. Add line items. Each item requires a product and quantity. Unit price, discount percentage, and tax percentage are optional per line.
6. Add any internal notes if needed.
7. Save. The quotation is created in **draft** status.

## Quotation Items

Each line item contains: product, quantity, unit price, optional discount percentage, optional tax percentage, and a calculated line total. Discounts and tax are applied per line, not on the whole quotation.

## Sending a Quotation by Email

From the quotation detail screen, tap **Send Email**. The system emails the quotation to the customer's registered email address and moves the status from **draft** to **sent**.

## Converting a Quotation to a Sales Order

When the customer accepts the offer, tap **Convert to Order** on the quotation detail screen. The system creates a new Sales Order pre-filled with the quotation's customer and line items, and moves the quotation status to **converted**. The resulting order ID is returned so you can navigate directly to it.

A quotation can only be converted if it is in **draft** or **sent** status.

## Totals

The quotation summary shows:

- **Subtotal**: sum of line totals before tax.
- **Discount Total**: total discount amount across all lines.
- **Tax Total**: total tax amount across all lines.
- **Grand Total**: the final amount the customer would pay.

## Filtering Quotations

The quotations list can be filtered by status (draft, sent, converted, cancelled) and searched by customer name or quotation number.
