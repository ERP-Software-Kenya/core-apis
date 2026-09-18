jest.mock('@automapper/classes', () => ({
  AutoMap: () => () => undefined,
}));

jest.mock('../../../../../common', () => ({
  CommandHandlerStrict: () => () => undefined,
  CommandBase: class CommandBase {},
  PDF_EXPORT_SERVICE: 'PDF_EXPORT_SERVICE',
  EMAIL_TEMPLATE_REPO: 'EMAIL_TEMPLATE_REPO',
  MailService: class MailService {
    public sendAsync = jest.fn();
  },
}));

jest.mock('typeorm', () => ({
  DataSource: class MockDataSource {},
}));

jest.mock('../../../../../infrastructure/persistence/entities', () => ({
  QuotationEntity: class MockQuotationEntity {},
}));

jest.mock('../../../../constants', () => ({
  QUOTATION_REPO: 'QUOTATION_REPO',
}));

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SendQuotationEmailCommand } from './send-quotation-email.command';
import { SendQuotationEmailCommandHandler } from './send-quotation-email.command-handler';
import { EQuotationStatus } from '../../../../shared/enums';

describe('SendQuotationEmailCommandHandler', () => {
  it('throws NotFoundException if quotation not found', async () => {
    const quotationRepo = { getWithDetailsAsync: jest.fn().mockResolvedValue(null) };
    const mailService = { sendAsync: jest.fn() };
    const pdfService = { generateFromTemplateAsync: jest.fn() };
    const dataSource = { transaction: jest.fn() };

    const handler = new SendQuotationEmailCommandHandler(
      dataSource as any,
      quotationRepo as any,
      mailService as any,
      pdfService as any,
      { info: jest.fn() } as any,
    );

    const cmd = new SendQuotationEmailCommand();
    cmd.id = 'missing';

    await expect(handler.execute(cmd)).rejects.toThrow(NotFoundException);
  });

  it('throws BadRequestException for CANCELLED quotation', async () => {
    const quotationRepo = {
      getWithDetailsAsync: jest.fn().mockResolvedValue({
        id: 'q-1',
        status: EQuotationStatus.Cancelled,
      }),
    };
    const handler = new SendQuotationEmailCommandHandler(
      {} as any,
      quotationRepo as any,
      {} as any,
      {} as any,
      { info: jest.fn() } as any,
    );

    const cmd = new SendQuotationEmailCommand();
    cmd.id = 'q-1';

    await expect(handler.execute(cmd)).rejects.toThrow(BadRequestException);
  });

  it('automatically generates PDF and default email when pdfBase64 and body are omitted', async () => {
    const mockQuotation = {
      id: 'q-1',
      quoteNumber: 'Q-100',
      versionNumber: 1,
      status: EQuotationStatus.Draft,
      totalAmount: 2000,
      subtotal: 1800,
      taxAmount: 200,
      createdAt: new Date('2026-01-01'),
      customer: { name: 'Acme Corp', email: 'acme@example.com' },
      items: [],
    };

    const quotationRepo = {
      getWithDetailsAsync: jest.fn().mockResolvedValue(mockQuotation),
    };
    const mailService = { sendAsync: jest.fn().mockResolvedValue(undefined) };
    const pdfDoc = {
      buffer: Buffer.from('generated-pdf'),
      filename: 'Quotation_Q-100.pdf',
    };
    const pdfService = {
      generateFromTemplateAsync: jest.fn().mockResolvedValue(pdfDoc),
    };
    const dataSource = {
      transaction: jest.fn().mockImplementation(async (cb) => {
        return cb({
          findOne: jest.fn().mockResolvedValue({ id: 'q-1', status: EQuotationStatus.Draft }),
          save: jest.fn().mockResolvedValue(undefined),
        });
      }),
    };

    const handler = new SendQuotationEmailCommandHandler(
      dataSource as any,
      quotationRepo as any,
      mailService as any,
      pdfService as any,
      { info: jest.fn() } as any,
    );

    const cmd = new SendQuotationEmailCommand();
    cmd.id = 'q-1';

    const res = await handler.execute(cmd);

    expect(res).toBeDefined();
    expect(pdfService.generateFromTemplateAsync).toHaveBeenCalledWith(
      'quotation',
      expect.any(Object),
      'Quotation_Q-100.pdf',
    );
    expect(mailService.sendAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'acme@example.com',
        subject: expect.stringContaining('Q-100'),
        html: expect.stringContaining('Quotation Q-100'),
        attachments: [
          expect.objectContaining({
            filename: 'Quotation_Q-100.pdf',
            contentType: 'application/pdf',
          }),
        ],
      }),
    );
  });
});
