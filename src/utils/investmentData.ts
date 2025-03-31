
// Investment metrics data

export const investmentMetrics = [
  {
    label: 'Internal Rate of Return (IRR)',
    original: '15.2%',
    current: '14.1%',
    impact: 'negative',
    variance: '-1.1%'
  },
  {
    label: 'Net Present Value (NPV)',
    original: '$4.2M',
    current: '$3.8M',
    impact: 'negative',
    variance: '-$0.4M'
  },
  {
    label: 'Cash on Cash Return',
    original: '8.5%',
    current: '7.9%',
    impact: 'negative',
    variance: '-0.6%'
  },
  {
    label: 'Payback Period',
    original: '6.2 years',
    current: '7.1 years',
    impact: 'negative',
    variance: '+0.9 years'
  },
  {
    label: 'Equity Multiple',
    original: '2.4x',
    current: '2.2x',
    impact: 'negative',
    variance: '-0.2x'
  },
  {
    label: 'Debt Service Coverage Ratio',
    original: '1.75',
    current: '1.62',
    impact: 'negative',
    variance: '-0.13'
  }
];

export const projectOptions = [
  { value: 'all', label: 'All Projects' },
  { value: 'east-tower', label: 'East Tower Construction' },
  { value: 'westside', label: 'Westside Park Development' },
  { value: 'north-bridge', label: 'North Bridge Repair' }
];

export const roiData = [
  { name: 'Jan', projected: 7.2, actual: 7.1 },
  { name: 'Feb', projected: 7.3, actual: 7.0 },
  { name: 'Mar', projected: 7.4, actual: 6.8 },
  { name: 'Apr', projected: 7.5, actual: 6.5 },
  { name: 'May', projected: 7.6, actual: 6.3 },
  { name: 'Jun', projected: 7.7, actual: 6.4 },
  { name: 'Jul', projected: 7.8, actual: 6.6 },
  { name: 'Aug', projected: 7.9, actual: 6.9 },
  { name: 'Sep', projected: 8.0, actual: 7.2 },
  { name: 'Oct', projected: 8.1, actual: null },
  { name: 'Nov', projected: 8.2, actual: null },
  { name: 'Dec', projected: 8.3, actual: null },
];

export const schedulingImpactData = [
  { name: 'East Tower', original: 18, current: 22, variance: 4 },
  { name: 'Westside Park', original: 12, current: 15, variance: 3 },
  { name: 'North Bridge', original: 8, current: 14, variance: 6 },
];

export const costOverrunData = [
  { name: 'Materials', value: 35, color: '#38bdf8' },
  { name: 'Labor', value: 25, color: '#fb7185' },
  { name: 'Permits/Fees', value: 15, color: '#a78bfa' },
  { name: 'Equipment', value: 10, color: '#34d399' },
  { name: 'Design Changes', value: 15, color: '#fbbf24' },
];

export const valuationImpactData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 102 },
  { month: 'Mar', value: 105 },
  { month: 'Apr', value: 99 },
  { month: 'May', value: 101 },
  { month: 'Jun', value: 104 },
  { month: 'Jul', value: 108 },
  { month: 'Aug', value: 112 },
  { month: 'Sep', value: 110 },
];

export const impactEvents = [
  {
    id: 1,
    project: 'East Tower Construction',
    event: 'Foundation delay',
    financialImpact: '-$120,000',
    schedulingImpact: '+4 weeks',
    roiImpact: '-0.8%',
    date: '2024-03-10',
    status: 'high'
  },
  {
    id: 2,
    project: 'Westside Park Development',
    event: 'Material price increase',
    financialImpact: '-$85,000',
    schedulingImpact: '+0 weeks',
    roiImpact: '-0.5%',
    date: '2024-04-15',
    status: 'medium'
  },
  {
    id: 3,
    project: 'North Bridge Repair',
    event: 'Equipment failure',
    financialImpact: '-$45,000',
    schedulingImpact: '+2 weeks',
    roiImpact: '-0.3%',
    date: '2024-05-22',
    status: 'medium'
  },
  {
    id: 4,
    project: 'East Tower Construction',
    event: 'Design optimization',
    financialImpact: '+$75,000',
    schedulingImpact: '-2 weeks',
    roiImpact: '+0.4%',
    date: '2024-06-08',
    status: 'positive'
  },
  {
    id: 5,
    project: 'Westside Park Development',
    event: 'Permit delay',
    financialImpact: '-$35,000',
    schedulingImpact: '+3 weeks',
    roiImpact: '-0.2%',
    date: '2024-07-19',
    status: 'low'
  }
];

export const mitigationStrategies = [
  {
    id: 1,
    issue: 'Schedule Delays',
    strategy: 'Implement accelerated work schedule and parallel work streams',
    potentialSavings: '+3 weeks',
    costToImplement: '$45,000',
    netRoiImpact: '+0.3%',
    status: 'proposed'
  },
  {
    id: 2,
    issue: 'Material Cost Inflation',
    strategy: 'Pre-purchase critical materials and establish price lock agreements',
    potentialSavings: '$120,000',
    costToImplement: '$15,000',
    netRoiImpact: '+0.6%',
    status: 'in-progress'
  },
  {
    id: 3,
    issue: 'Labor Shortages',
    strategy: 'Revise subcontractor agreements with performance incentives',
    potentialSavings: '+2 weeks, $85,000',
    costToImplement: '$30,000',
    netRoiImpact: '+0.4%',
    status: 'in-progress'
  },
  {
    id: 4,
    issue: 'Design Inefficiencies',
    strategy: 'Value engineering review of remaining project components',
    potentialSavings: '$210,000',
    costToImplement: '$55,000',
    netRoiImpact: '+0.8%',
    status: 'proposed'
  }
];
