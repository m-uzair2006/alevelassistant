import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isPublicPreviewHostname } from "@/lib/public-preview";

const PUBLIC_FILE = /\.(.*)$/;

type MiddlewareCookieOptions = {
  path?: string;
  domain?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: boolean | "lax" | "strict" | "none";
  expires?: string | Date;
  maxAge?: number;
};

type MiddlewareCookie = {
  name: string;
  value: string;
  options?: MiddlewareCookieOptions;
};

function mapRequestCookies(req: NextRequest) {
  return req.cookies.getAll().map((cookie) => ({
    name: cookie.name,
    value: cookie.value,
  }));
}

function applyResponseCookies(response: NextResponse, cookies: MiddlewareCookie[]) {
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
      sameSite:
        options?.sameSite === false
          ? undefined
          : (options?.sameSite as "lax" | "strict" | "none" | undefined),
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

  if (isPublicPreviewHostname(request.nextUrl.hostname)) {
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/auth/callback")) {
      return NextResponse.redirect(new URL("/coming-soon", request.url));
    }

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

  const hasCompletedOnboarding = async (userId: string) => {
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("full_name, subjects")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) {
      console.error("Failed to check onboarding status in middleware", {
        profileError,
      });
      return false;
    }

    return Boolean(profile?.full_name?.trim()) && (profile?.subjects?.length ?? 0) > 0;
  };

  // Redirect to /auth if accessing protected routes without session
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  // Redirect to dashboard if already authenticated and trying to access auth
  if (pathname === "/auth" || pathname === "/auth/") {
    if (session) {
      const onboardingComplete = await hasCompletedOnboarding(session.user.id);

      if (onboardingComplete) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth", "/auth/", "/auth/callback", "/auth/callback/:path*"],
};
