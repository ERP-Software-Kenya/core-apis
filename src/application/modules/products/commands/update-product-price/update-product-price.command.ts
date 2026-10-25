import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class UpdateProductPriceCommand extends CommandBase {
  @AutoMap()
  public id: string;

  @AutoMap()
  public costPrice?: number;

  @AutoMap()
  public retailPrice?: number;

  @AutoMap()
  public loyaltyPrice?: number;

  @AutoMap()
  public wholesalePrice?: number;

  @AutoMap()
  public transferPrice?: number;

  @AutoMap()
  public reorderPoint?: number;
}
