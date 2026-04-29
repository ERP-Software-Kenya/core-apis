import { ErrorDetails } from "./error-details";
import { ResponseDetails } from "./response-details";
import { ResponseMetadata } from "./response-metadata";

export class PublicResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
  metadata: ResponseMetadata<T>;
  errorCode?: string;
  errors?: ErrorDetails[];
  details?: ResponseDetails;

  constructor(status: number, success: boolean, message: string, data: T, metadata: ResponseMetadata<T>, errorCode?: string, errors?: ErrorDetails[], details?: ResponseDetails) {
    this.status = status;
    this.success = success;
    this.message = message;
    this.data = data;
    this.metadata = metadata;
    this.errorCode = errorCode;
    this.errors = errors;
    this.details = details;
  }
}
