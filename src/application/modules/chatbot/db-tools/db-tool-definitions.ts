import { FunctionDeclaration, SchemaType } from '@google/generative-ai';

export const DB_TOOL_DECLARATIONS: FunctionDeclaration[] = [
  {
    name: 'getSalesThisMonth',
    description: 'Get total sales revenue, bill count, and average bill value for the current calendar month',
    parameters: {
      type: SchemaType.OBJECT,
      properties: { locationId: { type: SchemaType.STRING, description: 'Optional: filter by a specific location ID' } },
    },
  },
  {
    name: 'getSalesByDateRange',
    description: 'Get sales statistics (revenue, bill count) for a custom date range',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        from:       { type: SchemaType.STRING, description: 'Start date in YYYY-MM-DD format' },
        to:         { type: SchemaType.STRING, description: 'End date in YYYY-MM-DD format' },
        locationId: { type: SchemaType.STRING, description: 'Optional: filter by location ID' },
      },
      required: ['from', 'to'],
    },
  },
  {
    name: 'getTopSellingProducts',
    description: 'Get the top-selling products by revenue for the current calendar month',
    parameters: {
      type: SchemaType.OBJECT,
      properties: { limit: { type: SchemaType.NUMBER, description: 'How many products to return (default 10)' } },
    },
  },
  {
    name: 'getTopCustomers',
    description: 'Get top customers by total spend for the current calendar month',
    parameters: {
      type: SchemaType.OBJECT,
      properties: { limit: { type: SchemaType.NUMBER, description: 'How many customers to return (default 10)' } },
    },
  },
  {
    name: 'getLowStockProducts',
    description: 'Get products where quantity on hand is at or below the reorder level across all locations',
    parameters: { type: SchemaType.OBJECT, properties: {} },
  },
  {
    name: 'getInventoryValuation',
    description: 'Get total inventory value (quantity × average cost) across all or a specific location',
    parameters: {
      type: SchemaType.OBJECT,
      properties: { locationId: { type: SchemaType.STRING, description: 'Optional: filter by location ID' } },
    },
  },
  {
    name: 'searchProductStock',
    description: 'Search inventory levels for a specific product by name across all locations. Use when user asks about stock of a particular product.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: { productName: { type: SchemaType.STRING, description: 'Product name or partial name to search for' } },
      required: ['productName'],
    },
  },
  {
    name: 'getLocationInventory',
    description: 'Get all products and their stock levels at a specific warehouse or store location. Use when user asks about inventory at a specific location.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: { locationName: { type: SchemaType.STRING, description: 'Location or warehouse name (partial match)' } },
      required: ['locationName'],
    },
  },
  {
    name: 'getPurchaseSpendThisMonth',
    description: 'Get total purchase spend from received purchase orders for the current calendar month',
    parameters: { type: SchemaType.OBJECT, properties: {} },
  },
  {
    name: 'getPurchaseOrdersByStatus',
    description: 'Get a breakdown of all purchase orders grouped by status (draft, ordered, received, allocated, etc.) with counts and total values',
    parameters: { type: SchemaType.OBJECT, properties: {} },
  },
  {
    name: 'getTopSuppliers',
    description: 'Get top suppliers by total purchase value (excluding draft and cancelled orders)',
    parameters: {
      type: SchemaType.OBJECT,
      properties: { limit: { type: SchemaType.NUMBER, description: 'How many suppliers to return (default 10)' } },
    },
  },
  {
    name: 'getCustomerStats',
    description: 'Get overall customer statistics: total customer count, total credit limit, and total outstanding credit balance',
    parameters: { type: SchemaType.OBJECT, properties: {} },
  },
  {
    name: 'searchCustomer',
    description: 'Find a specific customer by name and retrieve their credit limit, credit balance, and customer type',
    parameters: {
      type: SchemaType.OBJECT,
      properties: { name: { type: SchemaType.STRING, description: 'Customer name or partial name to search for' } },
      required: ['name'],
    },
  },
  {
    name: 'getExpensesSummary',
    description: 'Get expense totals grouped by category for the current calendar month',
    parameters: { type: SchemaType.OBJECT, properties: {} },
  },
  {
    name: 'getStockTransferSummary',
    description: 'Get a summary of stock transfers grouped by status (PENDING, IN_TRANSIT, COMPLETED, etc.)',
    parameters: { type: SchemaType.OBJECT, properties: {} },
  },
  {
    name: 'getSalesReturnSummary',
    description: 'Get total sales return count and refunded amount for the current calendar month',
    parameters: { type: SchemaType.OBJECT, properties: {} },
  },
  {
    name: 'getGeneralStats',
    description: 'Get a high-level business overview: total product count, customer count, location count, and supplier count',
    parameters: { type: SchemaType.OBJECT, properties: {} },
  },
];
