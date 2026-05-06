import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ReportGenerationLogResponse {
  @AutoMap() @ApiProperty() public id: string;
  @AutoMap() @ApiProperty() public orgId: string;
  @AutoMap() @ApiProperty() public reportType: string;
  @AutoMap() @ApiProperty() public status: string;
  @AutoMap() @ApiProperty() public fileUrl?: string;
  @AutoMap() @ApiProperty() public errorMessage?: string;
  @AutoMap() @ApiProperty() public createdAt: Date;
}

export class ReportGenerationLogsPagedResponse {
  @ApiProperty({ type: [ReportGenerationLogResponse] }) public items: ReportGenerationLogResponse[];
  @ApiProperty() public page: number;
  @ApiProperty() public perPage: number;
  @ApiProperty() public totalCount: number;
  @ApiProperty() public totalPages: number;
}
