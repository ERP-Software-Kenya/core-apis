import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ required: false }) public status?: string;
  @ApiProperty({ required: false, default: 1 }) public $page?: number;
  @ApiProperty({ required: false, default: 20 }) public $perPage?: number;
}

export class ListReportLogsRequest {
  @ApiProperty({ required: false }) public orgId?: string;
}
