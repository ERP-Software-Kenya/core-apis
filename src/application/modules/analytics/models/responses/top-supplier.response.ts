import { ApiProperty } from '@nestjs/swagger';

export class TopSupplierResponse {
  @ApiProperty()
  public supplierId: string;

  @ApiProperty()
  public supplierName: string;

  @ApiProperty()
  public totalSpend: number;

  @ApiProperty()
  public poCount: number;
}
