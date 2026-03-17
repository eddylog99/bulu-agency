/**
 * Utilities per sicurezza API: validazione input, rate limiting, IP.
 */

const MAX_STRING_LENGTH = 2000;
const MAX_EMAIL_LENGTH = 254;
const MAX_BODY_KEYS = 25;
const MAX_BODY_BYTES = 15 * 1024; // 15 KB
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 10; // per IP per finestra

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RateEntry = { count: number; resetAt: number };
const rateMap = new Map<string, RateEntry>();

function cleanupRateMap() {
  const now = Date.now();
  for (const [ip, entry] of rateMap.entries()) {
    if (entry.resetAt < now) rateMap.delete(ip);
  }
}

export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xri = request.headers.get("x-real-ip");
  if (xri) return xri.trim();
  return "unknown";
}

export function checkRateLimit(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  cleanupRateMap();
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sanitizeString(value: unknown, maxLen: number = MAX_STRING_LENGTH): string | null {
  if (value == null) return null;
  const s = String(value).trim();
  if (s.length === 0) return null;
  if (s.length > maxLen) return null;
  return s;
}

const CONTACT_ALLOWED_KEYS = new Set([
  "source", "name", "email", "telefono", "company", "budget", "servizio",
  "ruolo", "sitoWeb", "dimensioneAzienda", "comeConosciuto", "progetto",
]);

export function validateContactBody(body: unknown): { ok: true; data: Record<string, string> } | { ok: false; error: string } {
  if (!isPlainObject(body)) return { ok: false, error: "Body non valido" };
  if (Object.keys(body).length > MAX_BODY_KEYS) return { ok: false, error: "Troppi campi" };

  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) {
    if (!CONTACT_ALLOWED_KEYS.has(key)) continue;
    const s = key === "email" ? sanitizeString(value, MAX_EMAIL_LENGTH) : sanitizeString(value);
    if (s != null) data[key] = s;
  }

  if (data.email && !EMAIL_REGEX.test(data.email))
    return { ok: false, error: "Email non valida" };
  const source = data.source;
  if (source && source !== "Home" && source !== "Contattaci" && source !== "Chat") return { ok: false, error: "Source non valido" };

  return { ok: true, data };
}

const BOOK_CALL_ALLOWED_KEYS = new Set([
  "date", "time", "durationMinutes", "nome", "cognome", "azienda", "telefono",
  "email", "ruolo", "sitoWeb", "dimensioneAzienda", "areaProgetto", "budget", "aspettative",
]);

export function validateBookCallBody(body: unknown): { ok: true; data: Record<string, string> } | { ok: false; error: string } {
  if (!isPlainObject(body)) return { ok: false, error: "Body non valido" };
  if (Object.keys(body).length > MAX_BODY_KEYS) return { ok: false, error: "Troppi campi" };

  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) {
    if (!BOOK_CALL_ALLOWED_KEYS.has(key)) continue;
    const s = key === "email" ? sanitizeString(value, MAX_EMAIL_LENGTH) : sanitizeString(value);
    if (s != null) data[key] = s;
  }

  const email = data.email;
  if (email && !EMAIL_REGEX.test(email)) return { ok: false, error: "Email non valida" };

  return { ok: true, data };
}

export async function parseJsonBody(request: Request, maxBytes: number = MAX_BODY_BYTES): Promise<unknown> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > maxBytes) return null;
  const raw = await request.text();
  if (raw.length > maxBytes) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}
