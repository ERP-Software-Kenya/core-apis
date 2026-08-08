import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class OnboardOrganizationRequest {
  @ApiProperty({ example: 'Acme Corp' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @AutoMap()
  public name: string;

  @ApiPropertyOptional({ example: 'acme-corp' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @AutoMap()
  public slug?: string;

  @ApiPropertyOptional({ description: 'Clerk organization ID (passed by frontend after creating org in Clerk)' })
  @IsOptional()
  @IsString()
  @AutoMap()
  public clerkOrgId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @AutoMap()
  public logoUrl?: string;
}
