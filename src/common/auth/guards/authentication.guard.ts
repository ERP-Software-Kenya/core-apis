import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { CHAINIT_STRATEGY, END_USER_STRATEGY, EXTERN_USER_REQ_PROP } from "../..";
import { shouldAllowAnonymous } from "./should-allow-anonymous";

@Injectable()
export class Authentication extends AuthGuard([END_USER_STRATEGY, CHAINIT_STRATEGY]) {
  constructor(private reflector: Reflector) {
    super({ property: EXTERN_USER_REQ_PROP });
  }

  public override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Allow anonymous access if specified, otherwise proceed with authentication
    return shouldAllowAnonymous(context, this.reflector) || super.canActivate(context);
  }
}
