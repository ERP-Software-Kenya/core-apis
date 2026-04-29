import { RpcNotFoundException } from "./base";

export class IncorrectOrgAdminForCredentialE1VdtException extends RpcNotFoundException {
  constructor(orgId?: string, walletAddress?: string, credentialE1Address?: string, description = "Incorrect org admin for credential e1 vdt") {
    const message =
      orgId && walletAddress && credentialE1Address
        ? `Incorrect org admin for credential e1 vdt ${orgId} for credential e1 wallet address: ${walletAddress} and credential e1 address: ${credentialE1Address}`
        : description;
    super(message);
  }
}
