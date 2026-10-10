export class QdrantOptions {
  public constructor(
    public readonly url: string,
    public readonly apiKey: string,
    public readonly collection: string,
  ) {}
}
