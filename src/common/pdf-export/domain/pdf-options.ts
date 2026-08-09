export class PdfOptions {
  public format?: 'A4' | 'A3' | 'Letter';
  public landscape?: boolean;
  public printBackground?: boolean;
  public margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}
