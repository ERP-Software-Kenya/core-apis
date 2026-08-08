import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EAttachmentMimeType } from '../../../../../common';

const IMAGE_MIME_TYPES = [
  EAttachmentMimeType.ImageJpeg,
  EAttachmentMimeType.ImagePng,
  EAttachmentMimeType.ImageWebp,
  EAttachmentMimeType.ImageGif,
  EAttachmentMimeType.ImageBmp,
  EAttachmentMimeType.ImageTiff,
  EAttachmentMimeType.ImageSvg,
];

export class GetProductImageUploadUrlRequest {
  @ApiProperty({ enum: IMAGE_MIME_TYPES, example: EAttachmentMimeType.ImageJpeg })
  @IsEnum(IMAGE_MIME_TYPES)
  public mimeType: EAttachmentMimeType;
}
