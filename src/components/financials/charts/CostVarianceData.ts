
import { CostVarianceDataPoint, CostVarianceConfig } from './CostVarianceTypes';

// costVarianceData array export removed.
// The CostVarianceDataPoint type is defined in CostVarianceTypes.ts and re-exported here if needed,
// or imported directly in components that use it.
// For this refactor, we assume CostVarianceDataPoint is available via CostVarianceTypes.ts.

export const costVarianceChartConfig: CostVarianceConfig = {
  planned: {
    label: "Planned",
    theme: {
      light: "rgba(139, 92, 246, 0.9)", // Vivid purple
      dark: "rgba(139, 92, 246, 0.9)"
    }
  },
  actual: {
    label: "Actual",
    theme: {
      light: "rgba(14, 165, 233, 0.9)", // Ocean blue
      dark: "rgba(14, 165, 233, 0.9)"
    }
  }
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};
