import { IBaseRepo, Filter, PageableFilter } from 'src/common';
import { ProductLog, ProductLogFilter } from 'src/application/modules/product-logs/domain';

export const PRODUCT_LOG_REPO = 'PRODUCT_LOG_REPO';

export interface IProductLogRepo extends IBaseRepo<ProductLog, string, PageableFilter<ProductLogFilter>, Filter<ProductLogFilter>> {}
