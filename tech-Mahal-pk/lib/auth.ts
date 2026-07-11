/**
 * Very small, dependency-free admin auth.
 *
 * One shared admin password (set as ADMIN_PASSWORD in env vars) protects
 * everything under /admin. On successful login we set a signed cookie
 * (HMAC-SHA256, so it can't be forged without knowing ADMIN_SESSION_SECRET)
 * that expires after 30 days. No user accounts, no database table needed —
 * good enough for a single shop-owner style admin panel.
 */

export const ADMIN_COOKIE_NAME = "tm_admin_session";
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "dev-only-secret-change-this";
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(value: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return toHex(sig);
}

export async function createSessionToken(): Promise<string> {
  const payload = `admin.${Date.now()}`;
  const sig = await hmac(payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, ts, sig] = parts;
  const payload = `${role}.${ts}`;
  const expected = await hmac(payload);
  if (expected !== sig) return false;
  const timestamp = Number(ts);
  if (!timestamp || Date.now() - timestamp > SESSION_MAX_AGE_MS) return false;
  return true;
}
