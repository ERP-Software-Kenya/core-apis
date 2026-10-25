jest.mock('@automapper/classes', () => ({
  AutoMap: () => () => undefined,
}));

jest.mock('../../../../../../common', () => ({
  CommandHandlerStrict: () => () => undefined,
  CommandBase: class CommandBase {},
  PDF_EXPORT_SERVICE: 'PDF_EXPORT_SERVICE',
  EMAIL_TEMPLATE_REPO: 'EMAIL_TEMPLATE_REPO',
  MailService: class MailService {
    public sendAsync = jest.fn();
  },
}));

jest.mock('../../../../../../application/constants', () => ({
  QUOTATION_REPO: 'QUOTATION_REPO',
}));

import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  SendQuotationEmailCommand,
  SendQuotationEmailCommandHandler,
} from '../../../../../../application/modules/quotations/commands';
import { EQuotationStatus } from '../../../../../../application/shared/enums';

describe('SendQuotationEmailCommandHandler', () => {
  it('throws NotFoundException if quotation not found', async () => {
    const quotationRepo = { getWithDetailsAsync: jest.fn().mockResolvedValue(null) };
    const mailService = { sendAsync: jest.fn() };
    const pdfService = { generateFromTemplateAsync: jest.fn() };
    const handler = new SendQuotationEmailCommandHandler(
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
      quotationRepo as any,
      {} as any,
      {} as any,
      { info: jest.fn() } as any,
    );

    const cmd = new SendQuotationEmailCommand();
    cmd.id = 'q-1';

    await expect(handler.execute(cmd)).rejects.toThrow(BadRequestException);
  });

  it('does not send a quotation owned by another organization', async () => {
    const quotationRepo = {
      getWithDetailsAsync: jest.fn().mockResolvedValue({
        id: 'q-1',
        organizationId: 'org-other',
        status: EQuotationStatus.Draft,
      }),
    };
    const mailService = { sendAsync: jest.fn() };
    const handler = new SendQuotationEmailCommandHandler(
      quotationRepo as any,
      mailService as any,
      {} as any,
      { info: jest.fn() } as any,
    );
    const cmd = new SendQuotationEmailCommand();
    cmd.id = 'q-1';
    cmd.organizationId = 'org-current';

    await expect(handler.execute(cmd)).rejects.toThrow(NotFoundException);
    expect(mailService.sendAsync).not.toHaveBeenCalled();
  });

  it('automatically generates PDF and default email when pdfBase64 and body are omitted', async () => {
    const mockQuotation = {
      id: 'q-1',
      organizationId: 'org-1',
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
      markSentIfDraftAsync: jest.fn().mockResolvedValue({
        ...mockQuotation,
        status: EQuotationStatus.Sent,
      }),
    };
    const mailService = { sendAsync: jest.fn().mockResolvedValue(undefined) };
    const pdfDoc = {
      buffer: Buffer.from('generated-pdf'),
      filename: 'Quotation_Q-100.pdf',
    };
    const pdfService = {
      generateFromTemplateAsync: jest.fn().mockResolvedValue(pdfDoc),
    };
    const handler = new SendQuotationEmailCommandHandler(
      quotationRepo as any,
      mailService as any,
      pdfService as any,
      { info: jest.fn() } as any,
    );

    const cmd = new SendQuotationEmailCommand();
    cmd.id = 'q-1';
    cmd.organizationId = 'org-1';

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
    expect(quotationRepo.markSentIfDraftAsync).toHaveBeenCalledWith('q-1', 'org-1');
  });

  it('escapes customer and note HTML in the generated email', async () => {
    const quotation = {
      id: 'q-1',
      organizationId: 'org-1',
      quoteNumber: 'Q-100',
      versionNumber: 1,
      status: EQuotationStatus.Sent,
      totalAmount: 10,
      subtotal: 10,
      taxAmount: 0,
      createdAt: new Date(),
      customer: { name: '<script>alert(1)</script>', email: 'safe@example.com' },
      notes: '<img src=x onerror=alert(1)>',
      items: [],
    };
    const quotationRepo = { getWithDetailsAsync: jest.fn().mockResolvedValue(quotation) };
    const mailService = { sendAsync: jest.fn().mockResolvedValue(undefined) };
    const handler = new SendQuotationEmailCommandHandler(
      quotationRepo as any,
      mailService as any,
      { generateFromTemplateAsync: jest.fn().mockRejectedValue(new Error('no pdf')) } as any,
      { info: jest.fn(), warn: jest.fn() } as any,
    );
    const cmd = new SendQuotationEmailCommand();
    cmd.id = 'q-1';
    cmd.organizationId = 'org-1';

    await handler.execute(cmd);

    const html = mailService.sendAsync.mock.calls[0][0].html;
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(html).not.toContain('<script>');
  });
});
