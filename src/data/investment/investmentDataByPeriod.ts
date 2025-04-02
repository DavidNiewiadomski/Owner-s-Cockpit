
import { InvestmentMetric, Insight } from './investmentData';

// Generate period-specific ROI data
export const generateRoiData = (period: string) => {
  // Base ROI data (monthly)
  const baseData = [
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

  // Weekly data with days
  const weeklyData = [
    { name: 'Mon', projected: 7.0, actual: 6.8 },
    { name: 'Tue', projected: 7.1, actual: 6.9 },
    { name: 'Wed', projected: 7.2, actual: 7.0 },
    { name: 'Thu', projected: 7.3, actual: 7.1 },
    { name: 'Fri', projected: 7.4, actual: 7.0 },
    { name: 'Sat', projected: 7.3, actual: 6.9 },
    { name: 'Sun', projected: 7.2, actual: 6.8 },
  ];

  // Quarterly data
  const quarterlyData = [
    { name: 'Q1 2023', projected: 7.2, actual: 6.9 },
    { name: 'Q2 2023', projected: 7.6, actual: 6.5 },
    { name: 'Q3 2023', projected: 7.9, actual: 6.6 },
    { name: 'Q4 2023', projected: 8.2, actual: 7.1 },
    { name: 'Q1 2024', projected: 8.3, actual: 7.3 },
  ];

  // Yearly data
  const yearlyData = [
    { name: '2020', projected: 6.8, actual: 6.5 },
    { name: '2021', projected: 7.0, actual: 6.7 },
    { name: '2022', projected: 7.4, actual: 6.9 },
    { name: '2023', projected: 7.8, actual: 7.0 },
    { name: '2024', projected: 8.2, actual: 7.3 },
  ];

  switch (period) {
    case 'weekly':
      return weeklyData;
    case 'monthly':
      return baseData;
    case 'quarterly':
      return quarterlyData;
    case 'yearly':
      return yearlyData;
    default:
      return baseData;
  }
};

// Generate period-specific property value data
export const generatePropertyValueData = (period: string) => {
  // Base property value data (quarterly)
  const baseData = [
    { name: 'Q1 2022', value: 12.5 },
    { name: 'Q2 2022', value: 13.2 },
    { name: 'Q3 2022', value: 14.1 },
    { name: 'Q4 2022', value: 14.5 },
    { name: 'Q1 2023', value: 15.3 },
    { name: 'Q2 2023', value: 16.0 },
    { name: 'Q3 2023', value: 16.8 },
    { name: 'Q4 2023', value: 17.5 },
  ];

  // Weekly data
  const weeklyData = [
    { name: 'Week 1', value: 16.9 },
    { name: 'Week 2', value: 17.0 },
    { name: 'Week 3', value: 17.2 },
    { name: 'Week 4', value: 17.3 },
    { name: 'Week 5', value: 17.5 },
  ];

  // Monthly data
  const monthlyData = [
    { name: 'Jul 2022', value: 13.5 },
    { name: 'Aug 2022', value: 13.8 },
    { name: 'Sep 2022', value: 14.1 },
    { name: 'Oct 2022', value: 14.3 },
    { name: 'Nov 2022', value: 14.4 },
    { name: 'Dec 2022', value: 14.5 },
    { name: 'Jan 2023', value: 15.0 },
    { name: 'Feb 2023', value: 15.3 },
    { name: 'Mar 2023', value: 16.0 },
    { name: 'Apr 2023', value: 16.3 },
    { name: 'May 2023', value: 16.5 },
    { name: 'Jun 2023', value: 16.8 },
  ];

  // Yearly data
  const yearlyData = [
    { name: '2019', value: 9.8 },
    { name: '2020', value: 11.2 },
    { name: '2021', value: 12.7 },
    { name: '2022', value: 14.5 },
    { name: '2023', value: 17.5 },
  ];

  switch (period) {
    case 'weekly':
      return weeklyData;
    case 'monthly':
      return monthlyData;
    case 'quarterly':
      return baseData;
    case 'yearly':
      return yearlyData;
    default:
      return baseData;
  }
};

// Generate period-specific investment metrics
export const generateInvestmentMetrics = (period: string): InvestmentMetric[] => {
  // Base investment metrics
  const baseMetrics = [
    {
      label: 'Total Investment',
      original: '$36.8M',
      current: '$38.2M',
      impact: "positive" as const,
      variance: '+$1.4M'
    },
    {
      label: 'Yearly ROI',
      original: '7.2%',
      current: '6.9%',
      impact: "negative" as const,
      variance: '-0.3%'
    },
    {
      label: 'Property Value',
      original: '$52.5M',
      current: '$57.2M',
      impact: "positive" as const,
      variance: '+$4.7M'
    },
    {
      label: 'Occupancy Rate',
      original: '92%',
      current: '95%',
      impact: "positive" as const,
      variance: '+3%'
    },
    {
      label: 'Operating Expenses',
      original: '$4.2M',
      current: '$4.5M',
      impact: "negative" as const,
      variance: '+$0.3M'
    }
  ];

  // Variations by period
  switch (period) {
    case 'weekly':
      return [
        { ...baseMetrics[0], current: '$37.2M', variance: '+$0.4M' },
        { ...baseMetrics[1], current: '6.8%', variance: '-0.4%' },
        { ...baseMetrics[2], current: '$55.1M', variance: '+$2.6M' },
        { ...baseMetrics[3], current: '93%', variance: '+1%' },
        { ...baseMetrics[4], current: '$4.3M', variance: '+$0.1M' },
      ];
    case 'monthly':
      return baseMetrics;
    case 'quarterly':
      return [
        { ...baseMetrics[0], current: '$39.5M', variance: '+$2.7M' },
        { ...baseMetrics[1], current: '7.0%', variance: '-0.2%' },
        { ...baseMetrics[2], current: '$58.9M', variance: '+$6.4M' },
        { ...baseMetrics[3], current: '96%', variance: '+4%' },
        { ...baseMetrics[4], current: '$4.6M', variance: '+$0.4M' },
      ];
    case 'yearly':
      return [
        { ...baseMetrics[0], current: '$42.1M', variance: '+$5.3M' },
        { ...baseMetrics[1], current: '7.3%', variance: '+0.1%' },
        { ...baseMetrics[2], current: '$61.8M', variance: '+$9.3M' },
        { ...baseMetrics[3], current: '98%', variance: '+6%' },
        { ...baseMetrics[4], current: '$4.8M', variance: '+$0.6M' },
      ];
    default:
      return baseMetrics;
  }
};

// Generate period-specific insights
export const generateInvestmentInsights = (period: string): Insight[] => {
  // Base insights
  const baseInsights = [
    {
      title: "ROI Alert",
      content: "Current ROI is 0.3% below projection due to increased material costs",
      type: "warning" as const
    },
    {
      title: "Investment Impact",
      content: "Property value has increased by 9.3%, outperforming market average by 2.1%",
      type: "success" as const
    },
    {
      title: "Budget Variance",
      content: "Construction phase is currently under budget by $325,000",
      type: "info" as const
    },
    {
      title: "Market Analysis",
      content: "Similar properties in the area have appreciated 7.2% on average this year",
      type: "info" as const
    }
  ];

  // Variations by period
  switch (period) {
    case 'weekly':
      return [
        {
          title: "ROI Alert",
          content: "Weekly ROI is 0.4% below projection due to temporary labor cost increase",
          type: "warning" as const
        },
        {
          title: "Investment Impact",
          content: "Property value has increased by 0.7% this week, on track with expectations",
          type: "success" as const
        },
        {
          title: "Budget Variance",
          content: "This week's construction activities are under budget by $42,000",
          type: "info" as const
        },
        {
          title: "Market Analysis",
          content: "Local market has seen minimal fluctuation this week",
          type: "info" as const
        }
      ];
    case 'monthly':
      return baseInsights;
    case 'quarterly':
      return [
        {
          title: "ROI Alert",
          content: "Quarterly ROI is 0.2% below projection but trending upward",
          type: "warning" as const
        },
        {
          title: "Investment Impact",
          content: "Property value has increased by 3.5% this quarter, exceeding market average by 1.2%",
          type: "success" as const
        },
        {
          title: "Budget Variance",
          content: "Quarter to date construction is under budget by $520,000",
          type: "info" as const
        },
        {
          title: "Market Analysis",
          content: "Market valuation in target segments has increased 2.3% this quarter",
          type: "info" as const
        }
      ];
    case 'yearly':
      return [
        {
          title: "ROI Alert",
          content: "Yearly ROI has exceeded projection by 0.1% after recent market adjustments",
          type: "success" as const
        },
        {
          title: "Investment Impact",
          content: "Property value has increased by 17.8% this year, significantly outperforming market average",
          type: "success" as const
        },
        {
          title: "Budget Variance",
          content: "Annual construction budget variance is favorable by $1.2M",
          type: "info" as const
        },
        {
          title: "Market Analysis",
          content: "Annual market appreciation in our property segment is 9.5%, above the 5-year average",
          type: "info" as const
        }
      ];
    default:
      return baseInsights;
  }
};
