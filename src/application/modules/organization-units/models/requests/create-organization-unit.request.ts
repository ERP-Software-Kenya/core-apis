import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateOrganizationUnitRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public name: string;
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public symbol: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @AutoMap() public isActive?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @AutoMap() public sortOrder?: number;
}
