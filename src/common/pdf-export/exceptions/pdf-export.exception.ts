export class PdfExportException extends Error {
  constructor(cause?: string) {
    super(`PDF generation failed${cause ? ': ' + cause : ''}`);
    this.name = PdfExportException.name;
  }
}
