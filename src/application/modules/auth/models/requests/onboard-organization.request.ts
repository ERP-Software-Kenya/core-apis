import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsInt, IsOptional, IsString, Length, Max, MaxLength, Min, MinLength } from "class-validator";

export class OnboardOrganizationRequest {
  @ApiProperty({ example: "Acme Corp" })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @AutoMap()
  public name: string;

  @ApiPropertyOptional({ example: "acme-corp" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @AutoMap()
  public slug?: string;

  @ApiProperty({ description: "Clerk organization ID created by the authenticated Clerk organization administrator" })
  @IsString()
  @MinLength(1)
  @AutoMap()
  public clerkOrgId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @AutoMap()
  public logoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @AutoMap()
  public country?: string;

  // Org profile fields
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @AutoMap()
  public industry?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @AutoMap()
  public businessType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @AutoMap()
  public teamSize?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @AutoMap(() => [String])
  public modules?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @AutoMap()
  public salesMethod?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @AutoMap()
  public taxId?: string;

  // Organization settings fields
  @ApiPropertyOptional({ example: 'KES' })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  @AutoMap()
  public baseCurrencyCode?: string;

  @ApiPropertyOptional({ example: 'Africa/Nairobi' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @AutoMap()
  public timeZone?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  @AutoMap()
  public fiscalYearStartMonth?: number;
}
