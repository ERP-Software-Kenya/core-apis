import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsEmail } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateDriverRequest {
  @ApiProperty()
  @AutoMap()
  @IsUUID()
  public organizationId: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  public firstName: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  public lastName: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  public phone: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsOptional()
  @IsEmail()
  public email?: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  public licenseNumber: string;
}
