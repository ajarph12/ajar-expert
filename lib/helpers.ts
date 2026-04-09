import type { NextRequest } from "next/server";

const WEBSITE_MARKER = "[SRC:AJAREXPERT]";

/** Check if text contains the website source marker */
export function hasWebsiteMarker(text: string): boolean {
  return text.includes(WEBSITE_MARKER);
}

/** Remove the website source marker from text and trim whitespace */
export function cleanMarker(text: string): string {
  return text.replace(WEBSITE_MARKER, "").replace(/\s{2,}/g, " ").trim();
}

// In-memory rate limit store: phone → last reply timestamp (ms)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 10_000; // 10 seconds

/** Check if a phone number is rate-limited (replied within last 10s) */
export function isRateLimited(phone: string): boolean {
  const lastReply = rateLimitMap.get(phone);
  if (!lastReply) return false;
  return Date.now() - lastReply < RATE_LIMIT_MS;
}

/** Record a reply timestamp for rate limiting */
export function recordReply(phone: string): void {
  rateLimitMap.set(phone, Date.now());

  // Clean up old entries every 100 writes to prevent memory leak
  if (rateLimitMap.size > 1000) {
    const now = Date.now();
    for (const [key, ts] of rateLimitMap) {
      if (now - ts > RATE_LIMIT_MS * 6) {
        rateLimitMap.delete(key);
      }
    }
  }
}

// In-memory rate limit for widget/API by client IP
const ipRateLimitMap = new Map<string, number>();
const IP_RATE_LIMIT_MS = 10_000;

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

export function isIpRateLimited(ip: string): boolean {
  const lastReply = ipRateLimitMap.get(ip);
  if (!lastReply) return false;
  return Date.now() - lastReply < IP_RATE_LIMIT_MS;
}

export function recordIpReply(ip: string): void {
  ipRateLimitMap.set(ip, Date.now());

  if (ipRateLimitMap.size > 1000) {
    const now = Date.now();
    for (const [key, ts] of ipRateLimitMap) {
      if (now - ts > IP_RATE_LIMIT_MS * 6) {
        ipRateLimitMap.delete(key);
      }
    }
  }
}
