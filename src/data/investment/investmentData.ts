
export interface InvestmentMetric {
  label: string;
  original: string;
  current: string;
  impact: "positive" | "negative";
  variance: string;
}

export const roiData = [
  { name: 'Jan', projected: 7.2, actual: 7.0 },
  { name: 'Feb', projected: 7.3, actual: 6.9 },
  { name: 'Mar', projected: 7.4, actual: 6.8 },
  { name: 'Apr', projected: 7.5, actual: 6.7 },
  { name: 'May', projected: 7.6, actual: 6.5 },
  { name: 'Jun', projected: 7.7, actual: 6.3 },
  { name: 'Jul', projected: 7.8, actual: 6.4 },
  { name: 'Aug', projected: 7.9, actual: 6.6 },
  { name: 'Sep', projected: 8.0, actual: 6.8 },
  { name: 'Oct', projected: 8.1, actual: 7.0 },
  { name: 'Nov', projected: 8.2, actual: 7.2 },
  { name: 'Dec', projected: 8.3, actual: 7.3 },
];

export const propertyValueData = [
  { name: 'Q1 2022', value: 12.5 },
  { name: 'Q2 2022', value: 13.2 },
  { name: 'Q3 2022', value: 14.1 },
  { name: 'Q4 2022', value: 14.5 },
  { name: 'Q1 2023', value: 15.3 },
  { name: 'Q2 2023', value: 16.0 },
  { name: 'Q3 2023', value: 16.8 },
  { name: 'Q4 2023', value: 17.5 },
];

export const investmentMetrics: InvestmentMetric[] = [
  {
    label: 'Total Investment',
    original: '$36.8M',
    current: '$38.2M',
    impact: "positive",
    variance: '+$1.4M'
  },
  {
    label: 'Yearly ROI',
    original: '7.2%',
    current: '6.9%',
    impact: "negative",
    variance: '-0.3%'
  },
  {
    label: 'Property Value',
    original: '$52.5M',
    current: '$57.2M',
    impact: "positive",
    variance: '+$4.7M'
  },
  {
    label: 'Occupancy Rate',
    original: '92%',
    current: '95%',
    impact: "positive",
    variance: '+3%'
  },
  {
    label: 'Operating Expenses',
    original: '$4.2M',
    current: '$4.5M',
    impact: "negative",
    variance: '+$0.3M'
  }
];

export const investmentAllocationData = [
  { name: 'Land Acquisition', value: 35 },
  { name: 'Construction', value: 40 },
  { name: 'Design & Engineering', value: 10 },
  { name: 'Permits & Fees', value: 5 },
  { name: 'Contingency', value: 7 },
  { name: 'Other', value: 3 },
];

export type InsightType = "warning" | "success" | "info";

export interface Insight {
  title: string;
  content: string;
  type: InsightType;
}

export const investmentInsights: Insight[] = [
  {
    title: "ROI Alert",
    content: "Current ROI is 0.3% below projection due to increased material costs",
    type: "warning"
  },
  {
    title: "Investment Impact",
    content: "Property value has increased by 9.3%, outperforming market average by 2.1%",
    type: "success"
  },
  {
    title: "Budget Variance",
    content: "Construction phase is currently under budget by $325,000",
    type: "info"
  },
  {
    title: "Market Analysis",
    content: "Similar properties in the area have appreciated 7.2% on average this year",
    type: "info"
  }
];
