
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

// Updated to match ChartConfig from ChartContext.tsx
export interface CostVarianceConfig {
  [key: string]: {
    label: string;
    theme: CostVarianceThemeConfig;
  };
}

export interface CostVarianceTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}
