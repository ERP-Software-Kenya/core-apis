import { RpcNotFoundException } from "./base";

export class OrganizationNotOwnsProductVdtException extends RpcNotFoundException {
    constructor(orgId?: string, productId?: string, description = "Organization does not own the Product VDT") {
        const message = orgId && productId ? `Organization ${orgId} does not own the Product VDT ${productId}` : description;
        super(message);
    }
}