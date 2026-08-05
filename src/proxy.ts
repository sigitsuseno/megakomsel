import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "megakomsel_session";

async function verifySession(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(
      process.env.AUTH_SECRET ?? "dev-only-secret-ganti-di-produksi-1234567890"
    );
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

/**
 * Proxy (pengganti middleware di Next.js 16).
 * Melindungi /dashboard dan /checkout, serta mengarahkan user
 * yang sudah login menjauh dari halaman /login dan /register.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySession(request);

  const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/checkout");
  if (isProtected && !session) {
    const url = new URL("/login", request.url);
    if (pathname.startsWith("/checkout")) {
      url.searchParams.set("redirect", "/checkout");
    }
    return NextResponse.redirect(url);
  }

  if ((pathname === "/login" || pathname === "/register") && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/checkout/:path*", "/login", "/register"],
};