import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class PageAccessConfigItemRequest {
  @ApiProperty({ example: 'users' })
  @IsString()
  @IsNotEmpty()
  public pageKey: string;

  @ApiProperty({ type: [String], example: ['super_admin', 'org_admin'] })
  @IsArray()
  @IsString({ each: true })
  public allowedRoles: string[];
}

export class UpdatePageAccessRequest {
  @ApiProperty({ type: [PageAccessConfigItemRequest] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PageAccessConfigItemRequest)
  public configs: PageAccessConfigItemRequest[];
}
