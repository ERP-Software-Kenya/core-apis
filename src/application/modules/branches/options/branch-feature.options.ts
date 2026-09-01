import { Injectable } from '@nestjs/common';
import { EOrder } from '../../../../common';

@Injectable()
export class BranchFeatureOptions {
  public readonly page = 1;
  public readonly perPage = 20;
  public readonly orderBy = 'name';
  public readonly order = EOrder.Asc;
}
