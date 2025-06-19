import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simples rate limiting em memória (use Redis em produção)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  // Obter IP do header x-forwarded-for ou x-real-ip
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  let ip = "unknown";
  if (forwardedFor) {
    // x-forwarded-for pode conter múltiplos IPs separados por vírgula
    ip = forwardedFor.split(",")[0].trim();
  } else if (realIp) {
    ip = realIp;
  }

  return `${ip}:${request.nextUrl.pathname}`;
}

export function middleware(request: NextRequest) {
  // Aplicar apenas em rotas de API
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const key = getRateLimitKey(request);
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minuto
    const maxRequests = 10; // 10 requisições por minuto

    const current = rateLimit.get(key);

    if (!current || current.resetTime < now) {
      rateLimit.set(key, { count: 1, resetTime: now + windowMs });
    } else if (current.count >= maxRequests) {
      return NextResponse.json(
        { error: "Muitas requisições. Tente novamente mais tarde." },
        { status: 429 }
      );
    } else {
      current.count++;
    }

    // Limpar entradas antigas
    if (rateLimit.size > 1000) {
      for (const [k, v] of rateLimit.entries()) {
        if (v.resetTime < now) {
          rateLimit.delete(k);
        }
      }
    }
  }

  // Headers de segurança
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
