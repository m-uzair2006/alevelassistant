import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local",
    );
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: async () =>
        cookieStore.getAll().map((cookie) => ({
          name: cookie.name,
          value: cookie.value,
        })),
      setAll: async (cookieList) => {
        cookieList.forEach(({ name, value, options }) => {
          if (!value) {
            cookieStore.delete({ name });
            return;
          }

          cookieStore.set({
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
      },
    },
  });
}
