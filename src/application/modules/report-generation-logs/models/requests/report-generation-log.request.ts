import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { EReportPeriod } from '../../domain/e-report-period';
import { EReportType } from '../../domain/e-report-type';

export class GenerateReportRequest {
  @ApiProperty({ enum: EReportType }) @IsEnum(EReportType) @IsNotEmpty() public reportType: EReportType;
  @ApiProperty({ enum: EReportPeriod }) @IsEnum(EReportPeriod) @IsNotEmpty() public reportPeriod: EReportPeriod;
  @ApiProperty() @IsString() @IsNotEmpty() public fromDate: string;
  @ApiProperty() @IsString() @IsNotEmpty() public toDate: string;
  @ApiProperty({ required: false }) @IsOptional() @IsUUID() public locationId?: string;
}

export class CreateReportLogRequest {
  @ApiProperty() public orgId: string;
  @ApiProperty() public reportType: string;
  @ApiProperty({ default: 'PENDING' }) public status?: string;
}

export class UpdateReportLogRequest {
  @ApiProperty({ required: false }) public status?: string;
  @ApiProperty({ required: false }) public fileUrl?: string;
  @ApiProperty({ required: false }) public errorMessage?: string;
}

export class SearchReportLogsRequest {
  @ApiProperty({ required: false }) public orgId?: string;
  @ApiProperty({ required: false }) public reportType?: string;
  @ApiProperty({ required: false }) public reportPeriod?: string;
  @ApiProperty({ required: false }) public status?: string;
  @ApiProperty({ required: false, default: 1 }) public $page?: number;
  @ApiProperty({ required: false, default: 20 }) public $perPage?: number;
}

export class ListReportLogsRequest {
  @ApiProperty({ required: false }) public orgId?: string;
}
