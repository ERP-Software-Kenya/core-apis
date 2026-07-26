import { AutoMap } from '@automapper/classes';

export class ProductImage {
  @AutoMap()
  public id: string;

  @AutoMap()
  public productId: string;

  @AutoMap()
  public storageKey: string;

  @AutoMap()
  public sortOrder: number;

  @AutoMap()
  public isPrimary: boolean;

  @AutoMap()
  public uploadedById?: string;

  @AutoMap(() => Date)
  public createdAt: Date;
}
