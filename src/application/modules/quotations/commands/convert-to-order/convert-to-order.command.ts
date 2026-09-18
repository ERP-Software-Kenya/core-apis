import { CommandBase } from '../../../../../common';
import { EFulfillmentMode } from '../../../../shared/enums/e-fulfillment-mode';

export class ConvertToOrderCommand extends CommandBase {
  public id: string;
  public fulfillmentMode?: EFulfillmentMode;
  public fulfillmentLocationId?: string;
  public performedById?: string;
}
