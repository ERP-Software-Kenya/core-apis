jest.mock('@automapper/classes', () => ({
  AutoMap: () => () => undefined,
}));

jest.mock('../../../../../common', () => ({
  QueryHandlerStrict: () => () => undefined,
  QueryBase: class QueryBase {},
  PDF_EXPORT_SERVICE: 'PDF_EXPORT_SERVICE',
}));

jest.mock('../../../../constants', () => ({
  QUOTATION_REPO: 'QUOTATION_REPO',
}));

import { NotFoundException } from '@nestjs/common';
import { ExportQuotationQuery } from './export-quotation.query';
import { ExportQuotationQueryHandler } from './export-quotation.query-handler';

describe('ExportQuotationQueryHandler', () => {
  it('throws NotFoundException if quotation does not exist', async () => {
    const quotationRepo = {
      getWithDetailsAsync: jest.fn().mockResolvedValue(null),
    };
    const pdfService = {
      generateFromTemplateAsync: jest.fn(),
    };
    const handler = new ExportQuotationQueryHandler(
      quotationRepo as any,
      pdfService as any,
      { info: jest.fn() } as any,
    );

    const query = new ExportQuotationQuery();
    query.id = 'not-found';

    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
  });

  it('generates PDF from quotation template with correct context', async () => {
    const mockQuotation = {
      id: 'q-1',
      quoteNumber: 'Q-2026-001',
      versionNumber: 1,
      status: 'DRAFT',
      totalAmount: 1500,
      subtotal: 1300,
      taxAmount: 200,
      createdAt: new Date('2026-01-01'),
      customer: { name: 'Customer A', email: 'cust@example.com' },
      items: [
        {
          product: { name: 'Item 1', sku: 'SKU-1' },
          quantity: 2,
          unitPriceInclusive: 750,
          taxRate: 18,
          taxAmount: 200,
          lineTotal: 1500,
        },
      ],
    };

    const quotationRepo = {
      getWithDetailsAsync: jest.fn().mockResolvedValue(mockQuotation),
    };
    const pdfDoc = {
      buffer: Buffer.from('pdf-data'),
      filename: 'Quotation_Q-2026-001.pdf',
    };
    const pdfService = {
      generateFromTemplateAsync: jest.fn().mockResolvedValue(pdfDoc),
    };

    const handler = new ExportQuotationQueryHandler(
      quotationRepo as any,
      pdfService as any,
      { info: jest.fn() } as any,
    );

    const query = new ExportQuotationQuery();
    query.id = 'q-1';

    const result = await handler.execute(query);

    expect(result).toBe(pdfDoc);
    expect(pdfService.generateFromTemplateAsync).toHaveBeenCalledWith(
      'quotation',
      expect.objectContaining({
        quoteNumber: 'Q-2026-001',
        customerName: 'Customer A',
        totalAmount: '1500.00',
      }),
      'Quotation_Q-2026-001.pdf',
    );
  });
});
