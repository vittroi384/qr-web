import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { GATE_COOKIE, gateSatisfied, ipAllowedForAdmin } from "./adminAccess";
import { SESSION_COOKIE, verifySessionToken } from "./auth";
import { getClientIpFromHeaders } from "./ip";

/**
 * Server-component side of the admin access policy (adminAccess.ts): allowlisted IP, signed gate
 * cookie and a session bound to this browser. The proxy enforces the same rules at the edge; the
 * pages re-check so a data page never renders on a proxy misconfiguration or matcher gap.
 */
export async function hasAdminSession(): Promise<boolean> {
  const [h, c] = await Promise.all([headers(), cookies()]);
  if (!ipAllowedForAdmin(getClientIpFromHeaders(h))) return false;
  if (!(await gateSatisfied(c.get(GATE_COOKIE)?.value))) return false;
  return verifySessionToken(c.get(SESSION_COOKIE)?.value, h.get("user-agent"));
}

/** Call first in every admin page except the login page: without a valid session the page is a 404, like the proxy's hiding policy. */
export async function requireAdmin(): Promise<void> {
  if (!(await hasAdminSession())) notFound();
}
