import { Inject, NotFoundException } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  QueryHandlerStrict,
  PDF_EXPORT_SERVICE,
  IPdfExportService,
  PdfDocument,
} from '../../../../../common';
import { QUOTATION_REPO } from '../../../../constants';
import type { IQuotationRepo } from '../../i-quotation.repo';
import { ExportQuotationQuery } from './export-quotation.query';
import { buildQuotationPdfContext } from '../../helpers';

@QueryHandlerStrict(ExportQuotationQuery)
export class ExportQuotationQueryHandler
  implements IQueryHandler<ExportQuotationQuery, PdfDocument>
{
  constructor(
    @Inject(QUOTATION_REPO) private readonly quotationRepo: IQuotationRepo,
    @Inject(PDF_EXPORT_SERVICE) private readonly pdfService: IPdfExportService,
    @InjectPinoLogger(ExportQuotationQueryHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ExportQuotationQuery): Promise<PdfDocument> {
    this.logger.info(`Executing ${ExportQuotationQuery.name} for quotation ${query.id}`);

    const quotation = await this.quotationRepo.getWithDetailsAsync(query.id);
    if (!quotation) {
      throw new NotFoundException(`Quotation ${query.id} not found`);
    }

    const context = buildQuotationPdfContext(quotation);
    const filename = `Quotation_${quotation.quoteNumber}.pdf`;

    return this.pdfService.generateFromTemplateAsync('quotation', context, filename);
  }
}
