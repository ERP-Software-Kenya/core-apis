import { HttpStatus } from '@nestjs/common';
import { RpcBaseException } from './rpc-base.exception';

export class RpcBadRequestException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = 'Bad Request') {
    super(
      RpcBaseException.createPayload(
        objectOrError,
        description,
        HttpStatus.BAD_REQUEST,
      ),
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class RpcUnauthorizedException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = 'Unauthorized') {
    super(
      RpcBaseException.createPayload(
        objectOrError,
        description,
        HttpStatus.UNAUTHORIZED,
      ),
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class RpcForbiddenException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = 'Forbidden') {
    super(
      RpcBaseException.createPayload(
        objectOrError,
        description,
        HttpStatus.FORBIDDEN,
      ),
      HttpStatus.FORBIDDEN,
    );
  }
}

export class RpcConflictException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = 'Conflict') {
    super(
      RpcBaseException.createPayload(
        objectOrError,
        description,
        HttpStatus.CONFLICT,
      ),
      HttpStatus.CONFLICT,
    );
  }
}

export class RpcUnprocessableEntityException extends RpcBaseException {
  constructor(
    objectOrError?: string | object,
    description = 'Unprocessable Entity',
  ) {
    super(
      RpcBaseException.createPayload(
        objectOrError,
        description,
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
