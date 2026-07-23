export interface ClerkJwtPayload {
  sub: string;
  sid: string;
  iss: string;
  exp: number;
  iat: number;
  nbf: number;
  azp?: string;
  /** JWT v2: organization info nested under "o" */
  o?: { id: string; rol: string; slg: string };
  /** Custom claims from a Clerk JWT template (optional) */
  email?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}
