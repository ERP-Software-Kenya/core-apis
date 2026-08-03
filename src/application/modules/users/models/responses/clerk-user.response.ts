import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClerkUserResponse {
  @ApiProperty() public clerkUserId: string;
  @ApiProperty() public email: string;
  @ApiPropertyOptional({ nullable: true }) public firstName: string | null;
  @ApiPropertyOptional({ nullable: true }) public lastName: string | null;
  @ApiProperty() public imageUrl: string;
  @ApiProperty() public banned: boolean;
  @ApiProperty({ type: [String] }) public roles: string[];
  @ApiProperty() public createdAt: number;
  @ApiPropertyOptional({ nullable: true }) public lastSignInAt: number | null;
}
