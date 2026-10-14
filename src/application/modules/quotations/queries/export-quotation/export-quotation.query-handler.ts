import { Inject, NotFoundException, Optional } from '@nestjs/common';
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
import { OrganizationSettingsService } from '../../../billing-settings/currency';

@QueryHandlerStrict(ExportQuotationQuery)
export class ExportQuotationQueryHandler
  implements IQueryHandler<ExportQuotationQuery, PdfDocument>
{
  constructor(
    @Inject(QUOTATION_REPO) private readonly quotationRepo: IQuotationRepo,
    @Inject(PDF_EXPORT_SERVICE) private readonly pdfService: IPdfExportService,
    @InjectPinoLogger(ExportQuotationQueryHandler.name)
    private readonly logger: PinoLogger,
    @Optional() private readonly organizationSettings?: OrganizationSettingsService,
  ) {}

  public async execute(query: ExportQuotationQuery): Promise<PdfDocument> {
    this.logger.info(`Executing ${ExportQuotationQuery.name} for quotation ${query.id}`);

    const quotation = await this.quotationRepo.getWithDetailsAsync(query.id);
    if (!quotation) {
      throw new NotFoundException(`Quotation ${query.id} not found`);
    }

    const currencyCode = this.organizationSettings
      ? await this.organizationSettings.currencyCode(quotation.organizationId)
      : 'USD';
    const context = buildQuotationPdfContext(quotation, undefined, currencyCode);
    const filename = `Quotation_${quotation.quoteNumber}.pdf`;

    return this.pdfService.generateFromTemplateAsync('quotation', context, filename);
  }
}
