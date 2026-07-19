import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { EMaintenanceStatus } from '../../../../shared/enums/e-maintenance-status';

export class CreateMaintenanceRequest {
  @ApiProperty()
  @AutoMap()
  @IsUUID()
  public vehicleId: string;

  @ApiProperty()
  @AutoMap()
  @IsUUID()
  public maintenanceTypeId: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  public serviceCenter: string;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  public cost: number;

  @ApiProperty()
  @AutoMap()
  @IsDateString()
  public serviceDate: Date;
  
  @ApiPropertyOptional()
  @AutoMap()
  @IsOptional()
  @IsEnum(EMaintenanceStatus)
  public status?: EMaintenanceStatus;
}
