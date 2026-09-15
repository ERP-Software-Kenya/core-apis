jest.mock('@automapper/classes', () => ({
  AutoMap: () => () => undefined,
}));

jest.mock('../../../../../common', () => ({
  QueryHandlerStrict: () => () => undefined,
  QueryBase: class QueryBase {},
  PDF_EXPORT_SERVICE: 'PDF_EXPORT_SERVICE',
}));

jest.mock('../../../../constants', () => ({
  BILL_REPO: 'BILL_REPO',
  ORGANIZATION_REPO: 'ORGANIZATION_REPO',
  USER_REPO: 'USER_REPO',
  CUSTOMER_REPO: 'CUSTOMER_REPO',
}));

jest.mock('../../../../../infrastructure/persistence/entities', () => ({
  ECustomerType: { BigCustomer: 'big_customer' },
  EPaymentMethod: { Cash: 'CASH' },
}));

jest.mock('../..', () => ({
  IBillRepo: class IBillRepo {},
}));

jest.mock('../../domain', () => ({
  Bill: class Bill {},
  BillItem: class BillItem {},
}));

import { ExportBillQuery } from './export-bill.query';
import { ExportBillQueryHandler } from './export-bill.query-handler';

function makeHandler(overrides: {
  billRepo?: any;
  organizationRepo?: any;
  userRepo?: any;
  customerRepo?: any;
  pdfService?: any;
} = {}) {
  const pdfService = overrides.pdfService ?? {
    generateFromTemplateAsync: jest.fn().mockResolvedValue({
      buffer: Buffer.from('pdf'),
      filename: 'bill-BILL-1.pdf',
      contentType: 'application/pdf',
    }),
  };
  const handler = new ExportBillQueryHandler(
    overrides.billRepo,
    overrides.organizationRepo ?? { getAsync: jest.fn().mockResolvedValue(null) },
    overrides.userRepo ?? { getAsync: jest.fn().mockResolvedValue(null) },
    overrides.customerRepo ?? { getAsync: jest.fn().mockResolvedValue(null) },
    pdfService,
    { info: jest.fn() } as any,
  );
  return { handler, pdfService };
}

describe('ExportBillQueryHandler', () => {
  it('uses the thermal template with a fixed 80mm width for a regular walk-in bill', async () => {
    const bill = {
      id: 'b1',
      billNumber: 'BILL-1',
      organizationId: 'org-1',
      status: 'COMPLETED',
      customerId: null,
      customerType: 'regular',
      walkInName: 'Jane Walk-in',
      locationId: 'loc-1',
      createdById: 'u1',
      billedAt: new Date('2026-08-01'),
      items: [{ productId: 'Dettol Soap', quantity: 1, unitPrice: 65, lineTotal: 65 }],
      subtotal: 65,
      taxAmount: 0,
      discountAmount: 0,
      totalAmount: 65,
      paymentMethod: 'CASH',
    };
    const { handler, pdfService } = makeHandler({
      billRepo: { getAsync: jest.fn().mockResolvedValue(bill) },
      organizationRepo: {
        getAsync: jest.fn().mockResolvedValue({ id: 'org-1', name: 'Ola Mini Supermarket', phone: '0717111021' }),
      },
      userRepo: { getAsync: jest.fn().mockResolvedValue({ firstName: 'Dennis', lastName: 'Kiplagat' }) },
    });

    await handler.execute(Object.assign(new ExportBillQuery(), { id: 'b1' }));

    expect(pdfService.generateFromTemplateAsync).toHaveBeenCalledTimes(1);
    const [templateName, context, , options] = pdfService.generateFromTemplateAsync.mock.calls[0];
    expect(templateName).toBe('bill-thermal');
    expect(options).toEqual({ width: '80mm' });
    expect(context.servedByName).toBe('Dennis Kiplagat');
    expect(context.isCash).toBe(true);
    expect(context.items[0]).toEqual({ name: 'Dettol Soap', quantity: 1, rate: '65.00', amount: '65.00' });
    expect(context.totalAmount).toBe('65.00');
  });

  it('uses the thermal template for a registered (non-walk-in) regular customer too', async () => {
    const bill = {
      id: 'b1',
      billNumber: 'BILL-1',
      organizationId: 'org-1',
      status: 'COMPLETED',
      customerId: 'cust-1',
      customerType: 'new',
      locationId: 'loc-1',
      createdById: 'u1',
      items: [],
      subtotal: 0,
      taxAmount: 0,
      discountAmount: 0,
      totalAmount: 0,
      paymentMethod: 'CARD',
    };
    const { handler, pdfService } = makeHandler({
      billRepo: { getAsync: jest.fn().mockResolvedValue(bill) },
    });

    await handler.execute(Object.assign(new ExportBillQuery(), { id: 'b1' }));

    expect(pdfService.generateFromTemplateAsync.mock.calls[0][0]).toBe('bill-thermal');
  });

  it('uses the invoice template for a big-customer bill, resolving customer name and Authorized By', async () => {
    const bill = {
      id: 'b1',
      billNumber: 'I-13306',
      organizationId: 'org-1',
      status: 'COMPLETED',
      customerId: 'cust-1',
      customerType: 'big_customer',
      locationId: 'loc-1',
      createdById: 'u1',
      paymentTiming: 'half',
      billedAt: new Date('2026-09-07'),
      items: [{ productId: 'Mombasa Cement', quantity: 620, unitPrice: 860, discountAmount: 0, taxRate: 16, lineTotal: 533200 }],
      subtotal: 533200,
      taxAmount: 73544.83,
      discountAmount: 0,
      totalAmount: 533200,
    };
    const { handler, pdfService } = makeHandler({
      billRepo: { getAsync: jest.fn().mockResolvedValue(bill) },
      organizationRepo: { getAsync: jest.fn().mockResolvedValue({ id: 'org-1', name: 'Jalaram Merchandise Ltd' }) },
      userRepo: { getAsync: jest.fn().mockResolvedValue({ firstName: 'Yogesh', lastName: '' }) },
      customerRepo: { getAsync: jest.fn().mockResolvedValue({ id: 'cust-1', name: 'Pramukh Hardwaremart Ltd', phone: '0733' }) },
    });

    await handler.execute(Object.assign(new ExportBillQuery(), { id: 'b1' }));

    expect(pdfService.generateFromTemplateAsync).toHaveBeenCalledTimes(1);
    const [templateName, context, filename, options] = pdfService.generateFromTemplateAsync.mock.calls[0];
    expect(templateName).toBe('bill-invoice');
    expect(filename).toBe('bill-I-13306.pdf');
    expect(options).toBeUndefined();
    expect(context.customerName).toBe('Pramukh Hardwaremart Ltd');
    expect(context.creditTerms).toBe('Half Payment');
    expect(context.authorizedByName).toBe('Yogesh');
    expect(context.items[0]).toEqual({
      no: 1,
      name: 'Mombasa Cement',
      quantity: 620,
      price: '860.00',
      discount: '0.00',
      taxRate: 16,
      amount: '533200.00',
    });
  });

  it('falls back to the walk-in name when a big-customer bill has no linked customer record', async () => {
    const bill = {
      id: 'b1',
      billNumber: 'BILL-2',
      organizationId: 'org-1',
      status: 'COMPLETED',
      customerId: null,
      customerType: 'big_customer',
      walkInName: 'Cash Corp Buyer',
      locationId: 'loc-1',
      createdById: null,
      items: [],
      subtotal: 0,
      taxAmount: 0,
      discountAmount: 0,
      totalAmount: 0,
    };
    const { handler, pdfService } = makeHandler({
      billRepo: { getAsync: jest.fn().mockResolvedValue(bill) },
    });

    await handler.execute(Object.assign(new ExportBillQuery(), { id: 'b1' }));

    const context = pdfService.generateFromTemplateAsync.mock.calls[0][1];
    expect(context.customerName).toBe('Cash Corp Buyer');
    expect(context.authorizedByName).toBeNull();
  });
});
