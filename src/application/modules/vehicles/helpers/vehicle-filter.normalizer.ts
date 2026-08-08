import { Injectable, Inject } from '@nestjs/common';
import { IFilterNormalizer, Filter, PageableFilter } from 'src/common';
import { VehicleFeatureOptions } from '../options';
import { Vehicle } from '../domain';

@Injectable()
export class VehicleFilterNormalizer implements IFilterNormalizer<Vehicle> {
  @Inject(VehicleFeatureOptions) public readonly options: VehicleFeatureOptions;

  public normalize(filter: Filter<Vehicle, string>): Filter<Vehicle, string> {
    filter.$orderBy = filter.$orderBy ?? this.options.orderBy;
    filter.$order = filter.$order ?? this.options.order;
    return filter;
  }

  public pageableNormalize(filter: PageableFilter<Vehicle, string>): PageableFilter<Vehicle, string> {
    filter = this.normalize(filter);
    filter.$page = filter.$page ?? this.options.page;
    filter.$perPage = filter.$perPage ?? this.options.perPage;
    return filter;
  }
}
