export type RuntimeMode = "local-demo" | "staging" | "production";

export interface ProductionConfig {
  appName: string;
  version: string;
  runtimeMode: RuntimeMode;
  requireAuth: boolean;
  requireBranchScope: boolean;
  requirePostingValidation: boolean;
  allowDemoData: boolean;
  allowDangerousActions: boolean;
}

export const productionConfig: ProductionConfig = {
  appName: "Restaurant ERP",
  version: "v310-enterprise-foundation",
  runtimeMode: "local-demo",
  requireAuth: false,
  requireBranchScope: false,
  requirePostingValidation: true,
  allowDemoData: true,
  allowDangerousActions: false,
};

export function isProductionMode(config: ProductionConfig = productionConfig): boolean {
  return config.runtimeMode === "production";
}

export function assertSafeProductionConfig(config: ProductionConfig = productionConfig): string[] {
  const findings: string[] = [];

  if (config.runtimeMode === "production" && !config.requireAuth) {
    findings.push("Production mode must require authentication.");
  }

  if (config.runtimeMode === "production" && !config.requireBranchScope) {
    findings.push("Production mode must enforce branch scope.");
  }

  if (config.runtimeMode === "production" && config.allowDemoData) {
    findings.push("Production mode must not allow demo data.");
  }

  if (config.runtimeMode === "production" && config.allowDangerousActions) {
    findings.push("Production mode must not allow dangerous actions.");
  }

  return findings;
}
