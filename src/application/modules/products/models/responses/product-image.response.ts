import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductImageResponse {
  @ApiProperty()
  @AutoMap()
  public id: string;

  @ApiProperty()
  @AutoMap()
  public productId: string;

  @ApiProperty()
  @AutoMap()
  public storageKey: string;

  @ApiProperty()
  @AutoMap()
  public sortOrder: number;

  @ApiProperty()
  @AutoMap()
  public isPrimary: boolean;

  @ApiPropertyOptional()
  @AutoMap()
  public uploadedById?: string;

  @ApiPropertyOptional()
  public url?: string;

  @ApiProperty()
  @AutoMap(() => Date)
  public createdAt: Date;
}
