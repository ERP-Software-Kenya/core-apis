import { QueryBase } from '../../../../../common';
import { EAttachmentMimeType } from '../../../../../common/types';

export class GetProductImageUploadUrlQuery extends QueryBase {
  public productId: string;
  public mimeType: EAttachmentMimeType;
}
