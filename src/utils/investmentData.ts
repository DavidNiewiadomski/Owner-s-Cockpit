
// Metrics data
export const investmentMetricsData = [
  {
    label: 'Internal Rate of Return (IRR)',
    original: '12.4%',
    current: '10.8%',
    impact: 'negative' as const,
    variance: '-1.6%'
  },
  {
    label: 'Return on Investment (ROI)',
    original: '14.5%',
    current: '11.9%',
    impact: 'negative' as const,
    variance: '-2.6%'
  },
  {
    label: 'Net Present Value (NPV)',
    original: '$2.45M',
    current: '$2.12M',
    impact: 'negative' as const,
    variance: '-$330K'
  },
  {
    label: 'Debt Service Coverage Ratio',
    original: '1.45',
    current: '1.28',
    impact: 'negative' as const,
    variance: '-0.17'
  }
];

// Impact events data
export const impactEventsData = [
  {
    id: 1,
    project: 'East Tower',
    event: 'Foundation Issue',
    financialImpact: '-$450,000',
    schedulingImpact: '+45 days',
    roiImpact: '-1.2%',
    date: '2023-03-15',
    status: 'high'
  },
  {
    id: 2,
    project: 'West Wing',
    event: 'Material Price Increase',
    financialImpact: '-$320,000',
    schedulingImpact: '+0 days',
    roiImpact: '-0.8%',
    date: '2023-04-22',
    status: 'medium'
  },
  {
    id: 3,
    project: 'North Bridge',
    event: 'Permit Delay',
    financialImpact: '-$175,000',
    schedulingImpact: '+30 days',
    roiImpact: '-0.5%',
    date: '2023-02-18',
    status: 'medium'
  },
  {
    id: 4,
    project: 'South Avenue',
    event: 'Design Change',
    financialImpact: '-$280,000',
    schedulingImpact: '+15 days',
    roiImpact: '-0.7%',
    date: '2023-05-09',
    status: 'low'
  },
  {
    id: 5,
    project: 'Downtown Heights',
    event: 'Labor Shortage',
    financialImpact: '-$210,000',
    schedulingImpact: '+25 days',
    roiImpact: '-0.6%',
    date: '2023-06-14',
    status: 'medium'
  }
];

// Budget overruns data
export const budgetOverrunsData = [
  {
    name: 'Materials',
    value: 35,
    color: '#FF6384'
  },
  {
    name: 'Labor',
    value: 28,
    color: '#36A2EB'
  },
  {
    name: 'Design Changes',
    value: 22,
    color: '#FFCE56'
  },
  {
    name: 'Permits & Approvals',
    value: 10,
    color: '#4BC0C0'
  },
  {
    name: 'Other',
    value: 5,
    color: '#9966FF'
  }
];

// Mitigation strategies data
export const mitigationStrategiesData = [
  {
    id: 1,
    issue: 'Foundation Issue',
    strategy: 'Value Engineer Foundation Design',
    potentialSavings: '+$320,000',
    costToImplement: '-$75,000',
    netRoiImpact: '+0.7%',
    status: 'proposed'
  },
  {
    id: 2,
    issue: 'Material Price Surge',
    strategy: 'Bulk Material Purchase & Storage',
    potentialSavings: '+$260,000',
    costToImplement: '-$110,000',
    netRoiImpact: '+0.4%',
    status: 'in-progress'
  },
  {
    id: 3,
    issue: 'Schedule Delays',
    strategy: 'Accelerated Overnight Work Schedule',
    potentialSavings: '+$180,000',
    costToImplement: '-$140,000',
    netRoiImpact: '+0.1%',
    status: 'completed'
  },
  {
    id: 4,
    issue: 'Labor Shortage',
    strategy: 'Cross-Train Existing Teams',
    potentialSavings: '+$210,000',
    costToImplement: '-$90,000',
    netRoiImpact: '+0.3%',
    status: 'proposed'
  }
];

// Project options for the dropdown
export const projectOptions = [
  { value: 'all', label: 'All Projects' },
  { value: 'east-tower', label: 'East Tower' },
  { value: 'west-wing', label: 'West Wing' },
  { value: 'north-bridge', label: 'North Bridge' },
  { value: 'south-avenue', label: 'South Avenue' },
  { value: 'downtown-heights', label: 'Downtown Heights' }
];
