import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ELocationType } from 'src/infrastructure/persistence/entities';

export class CreateLocationRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public name: string;
  @ApiProperty({ enum: ELocationType }) @IsEnum(ELocationType) @AutoMap(() => String) public type: ELocationType;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public address?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public city?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public country?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public phone?: string;
}
