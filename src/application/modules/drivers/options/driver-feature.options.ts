import { Injectable } from '@nestjs/common';
import { EOrder } from 'src/common';

@Injectable()
export class DriverFeatureOptions {
  public orderBy = 'createdAt';
  public order = EOrder.Asc;
  public page = 1;
  public perPage = 10;
}
