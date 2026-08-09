import { ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { IsOptional, IsString } from 'class-validator';

export class ListMaintenanceTypesRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ each: true })
  @AutoMap(() => Array)
  public $ids?: string[];
}
