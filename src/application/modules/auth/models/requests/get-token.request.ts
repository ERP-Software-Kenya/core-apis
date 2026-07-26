import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetTokenRequest {
  @ApiProperty({ description: 'Clerk user ID (user_xxx)' })
  @IsString()
  public userId: string;
}
