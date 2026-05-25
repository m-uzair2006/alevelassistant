import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_FILE = /\.(.*)$/;

function mapRequestCookies(req: NextRequest) {
  return req.cookies.getAll().map((cookie) => ({
    name: cookie.name,
    value: cookie.value,
  }));
}

function applyResponseCookies(response: NextResponse, cookies: Array<{ name: string; value: string; options?: Record<string, any> }>) {
  cookies.forEach(({ name, value, options }) => {
    if (!value) {
      response.cookies.delete({ name });
      return;
    }

    response.cookies.set({
      name,
      value,
      path: options?.path,
      domain: options?.domain,
      httpOnly: options?.httpOnly,
      secure: options?.secure,
      sameSite: options?.sameSite as "lax" | "strict" | "none" | undefined,
      expires: options?.expires ? new Date(options.expires) : undefined,
      maxAge: options?.maxAge,
    });
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: async () => mapRequestCookies(request),
      setAll: async (cookies) => applyResponseCookies(response, cookies),
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (pathname === "/auth/login" || pathname === "/auth/signup") {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return response;
  }

  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/signup"],
};
