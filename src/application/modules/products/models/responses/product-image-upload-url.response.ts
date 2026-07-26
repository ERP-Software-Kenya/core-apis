import { ApiProperty } from '@nestjs/swagger';

export class ProductImageUploadUrlResponse {
  @ApiProperty({ description: 'Presigned PUT URL — upload the file directly via HTTP PUT to this URL' })
  public uploadUrl: string;

  @ApiProperty({ description: 'R2 object key; pass as imageKey when confirming the upload' })
  public key: string;

  @ApiProperty({ description: 'Public URL that will resolve once the upload completes' })
  public publicUrl: string;
}
