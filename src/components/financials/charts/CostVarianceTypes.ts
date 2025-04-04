
export interface CostVarianceDataPoint {
  name: string;
  planned: number;
  actual: number;
  variance: number;
}

export interface CostVarianceThemeConfig {
  light: string;
  dark: string;
}

export interface CostVarianceConfig {
  planned: {
    label: string;
    theme: CostVarianceThemeConfig;
  };
  actual: {
    label: string;
    theme: CostVarianceThemeConfig;
  };
}

export interface CostVarianceTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}
