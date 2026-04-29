import { RpcNotFoundException } from "./base";

export class OrganizationNotOwnsTicketVdtException extends RpcNotFoundException {
  constructor(orgId?: string, ticketId?: string, description = "Organization does not own the Ticket VDT") {
    const message = orgId && ticketId ? `Organization ${orgId} does not own the Ticket VDT ${ticketId}` : description;
    super(message);
  }
}
