import { EOrder } from '../../../../common';

export class InventoryFeatureOptions {
  public page: number;
  public perPage: number;
  public orderBy: string;
  public order: EOrder;

  constructor(page?: number, perPage?: number, orderBy?: string, order?: EOrder) {
    this.page = page ?? 1;
    this.perPage = perPage ?? 20;
    this.orderBy = orderBy ?? 'id'; // Default order by id for inventory
    this.order = order ?? EOrder.Asc;
  }
}
