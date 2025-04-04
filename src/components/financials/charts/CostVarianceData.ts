
export const costVarianceData = [
  {
    name: "Site Work",
    planned: 425000,
    actual: 412750,
    variance: 12250,
  },
  {
    name: "Structural Framing",
    planned: 720000,
    actual: 748800,
    variance: -28800,
  },
  {
    name: "Electrical",
    planned: 345000,
    actual: 341550,
    variance: 3450,
  },
  {
    name: "Plumbing & HVAC",
    planned: 520000,
    actual: 546000,
    variance: -26000,
  },
  {
    name: "Interior Finishes",
    planned: 635000,
    actual: 622300,
    variance: 12700,
  },
  {
    name: "Exterior Facades",
    planned: 390000,
    actual: 409500,
    variance: -19500,
  },
];

export const costVarianceChartConfig = {
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
