import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';

export class UpdatePurchaseOrderRequest {
  @ApiPropertyOptional({ enum: EPurchaseOrderStatus })
  @IsOptional()
  @IsEnum(EPurchaseOrderStatus)
  @AutoMap(() => String)
  public status?: EPurchaseOrderStatus;

  @ApiPropertyOptional() @IsOptional() @IsDateString() @AutoMap() public expectedAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
}
