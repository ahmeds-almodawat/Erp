export interface SupabaseBrowserClientLike {
  from(table: string): any;
  rpc(functionName: string, args?: Record<string, unknown>): Promise<{ data: unknown; error: { message?: string } | null }>;
}

export interface SupabaseEnvironment {
  url?: string;
  anonKey?: string;
}

export function getSupabaseEnvironment(): SupabaseEnvironment {
  return {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  };
}

export function isSupabaseConfigured(): boolean {
  const env = getSupabaseEnvironment();
  return Boolean(env.url?.trim() && env.anonKey?.trim());
}

export function getSupabaseClient(): SupabaseBrowserClientLike | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  // This project currently avoids adding @supabase/supabase-js as a hard dependency.
  // v316 is a safe bridge. The actual client can be wired in the production cutover step.
  return null;
}

export function assertNoServiceRoleInFrontend(): string[] {
  const findings: string[] = [];

  if ("VITE_SUPABASE_SERVICE_ROLE_KEY" in import.meta.env) {
    findings.push("Service role key must never be exposed through VITE_ frontend variables.");
  }

  return findings;
}
