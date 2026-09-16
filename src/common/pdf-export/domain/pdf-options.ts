export class PdfOptions {
  public format?: 'A4' | 'A3' | 'Letter';
  /** Fixed page width (e.g. '80mm') for receipt-style PDFs. Height is measured from content. */
  public width?: string;
  public landscape?: boolean;
  public printBackground?: boolean;
  public margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}
