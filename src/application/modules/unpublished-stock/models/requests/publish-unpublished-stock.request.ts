import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class PublishUnpublishedStockRequest {
  @ApiProperty() @IsNotEmpty() @IsString() @AutoMap() public unpublishedStockId: string;
  @ApiProperty() @IsNumber() @IsPositive() @AutoMap() public quantity: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
}
