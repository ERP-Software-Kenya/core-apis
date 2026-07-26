import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({ description: 'Clerk JWT — use as Authorization: Bearer <token>' })
  public token: string;
}
