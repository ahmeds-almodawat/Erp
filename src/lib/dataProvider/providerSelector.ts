import { productionConfig } from "../config/productionConfig";
import { createSupabaseDataProvider } from "./supabaseProvider";
import { localDataProvider } from "./localProvider";
import { getSupabaseClient, isSupabaseConfigured } from "../supabase/supabaseClient";
import type { EnterpriseDataProvider } from "./types";

export type ProviderSelectionMode = "local-demo" | "supabase" | "safe-fallback";

export interface ProviderSelection {
  mode: ProviderSelectionMode;
  provider: EnterpriseDataProvider;
  reason: string;
}

export function selectDataProvider(): ProviderSelection {
  const client = getSupabaseClient();

  if (productionConfig.runtimeMode === "production" && !isSupabaseConfigured()) {
    return {
      mode: "safe-fallback",
      provider: localDataProvider,
      reason: "Production mode requested but Supabase is not configured. Safe fallback selected.",
    };
  }

  if (client && isSupabaseConfigured() && productionConfig.runtimeMode !== "local-demo") {
    return {
      mode: "supabase",
      provider: createSupabaseDataProvider(client),
      reason: "Supabase configured and runtime mode allows backend data provider.",
    };
  }

  return {
    mode: "local-demo",
    provider: localDataProvider,
    reason: "Local demo provider selected by default.",
  };
}
