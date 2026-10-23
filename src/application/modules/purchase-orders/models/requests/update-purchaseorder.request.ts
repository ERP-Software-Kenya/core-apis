import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';
import { EPurchaseOrderStatus } from 'src/application/shared/enums';

export class UpdatePurchaseOrderRequest {
  @ApiPropertyOptional({ enum: EPurchaseOrderStatus })
  @IsOptional()
  @IsIn([EPurchaseOrderStatus.Ordered, EPurchaseOrderStatus.Cancelled])
  @AutoMap(() => String)
  public status?: EPurchaseOrderStatus;

  @ApiPropertyOptional() @IsOptional() @IsDateString() @AutoMap() public expectedAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @AutoMap() public notes?: string;
}
