export class PdfDocument {
  public buffer: Buffer;
  public filename: string;
  public sizeBytes: number;

  constructor(buffer: Buffer, filename: string) {
    this.buffer = buffer;
    this.filename = filename;
    this.sizeBytes = buffer.byteLength;
  }
}
