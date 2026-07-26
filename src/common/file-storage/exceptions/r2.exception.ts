import { RpcInternalServerErrorException } from '../../exceptions';

export class R2Exception extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = 'R2 Storage Error') {
    super(objectOrError, description);
  }
}
