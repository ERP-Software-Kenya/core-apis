import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class SearchTaxesRequest {
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public search?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: { value: unknown }) => value === 'true')
  @AutoMap()
  public isActive?: boolean;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @AutoMap() public page?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @AutoMap() public perPage?: number;
}
