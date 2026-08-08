import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Filter } from 'src/common';
import { UnpublishedStockFilter } from '../../i-unpublished-stock.repo';

export class ListUnpublishedStockRequest implements Filter<UnpublishedStockFilter> {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public locationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public productId?: string;
}
