import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { CUSTOMER_DEBTOR_FILTERS, CustomerDebtorFilter } from '../../domain/customer-debtor-filter';

export class SearchCustomersRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public organizationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public phone?: string;
  @ApiPropertyOptional({ description: 'When true, only customers with creditLimit > 0' })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  @IsBoolean()
  @AutoMap()
  public hasCreditLimit?: boolean;
  @ApiPropertyOptional({ enum: CUSTOMER_DEBTOR_FILTERS, description: 'any = credit line or balance > 0; with-dues = balance > 0; over-limit = balance > limit > 0' })
  @IsOptional() @IsIn(CUSTOMER_DEBTOR_FILTERS) @AutoMap(() => String) public debtors?: CustomerDebtorFilter;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() @Min(1) @AutoMap() public $page?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() @Min(1) @AutoMap() public $perPage?: number;
}
