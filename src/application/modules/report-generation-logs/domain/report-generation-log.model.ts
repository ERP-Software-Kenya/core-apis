import { AutoMap } from '@automapper/classes';

export class ReportGenerationLog {
  @AutoMap() public id: string;
  @AutoMap() public orgId: string;
  @AutoMap() public reportType: string;
  @AutoMap() public status: string;
  @AutoMap() public fileUrl?: string;
  @AutoMap() public errorMessage?: string;
  @AutoMap(() => Date) public createdAt: Date;
}
