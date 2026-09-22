import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateTaxRequest {
  @ApiProperty() @IsString() @MaxLength(100) @AutoMap() public name: string;
  @ApiProperty() @IsNumber() @Min(0) @Max(100) @AutoMap() public rate: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public description?: string;
}
