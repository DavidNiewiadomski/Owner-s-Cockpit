
export interface Risk {
  id: string;
  name: string;
  severity: 'Low' | 'Medium' | 'High';
  likelihood: 'Low' | 'Medium' | 'High';
  impact: string;
  status: 'Active' | 'Mitigated' | 'Monitoring';
  category: string;
  mitigation: string;
  owner: string;
  lastUpdated: string;
}

export interface CategoryData {
  name: string;
  value: number;
}

export const riskData: Risk[] = [
  {
    id: 'R001',
    name: 'Material Cost Escalation',
    severity: 'High',
    likelihood: 'Medium',
    impact: 'Budget overrun of 5-8%',
    status: 'Active',
    category: 'Financial',
    mitigation: 'Pre-purchase of critical materials and implementation of fixed-price contracts with key suppliers.',
    owner: 'Procurement Manager',
    lastUpdated: '2023-04-12'
  },
  {
    id: 'R002',
    name: 'Permit Delays',
    severity: 'Medium',
    likelihood: 'High',
    impact: 'Schedule delay of 1-3 months',
    status: 'Mitigated',
    category: 'Regulatory',
    mitigation: 'Early engagement with regulatory bodies and retention of permit expediter.',
    owner: 'Project Manager',
    lastUpdated: '2023-04-05'
  },
  {
    id: 'R003',
    name: 'Labor Shortage',
    severity: 'High',
    likelihood: 'Medium',
    impact: 'Schedule delay and increased labor costs',
    status: 'Active',
    category: 'Resource',
    mitigation: 'Multiple subcontractor agreements and flexible scheduling arrangements.',
    owner: 'Construction Manager',
    lastUpdated: '2023-04-10'
  },
  {
    id: 'R004',
    name: 'Design Changes',
    severity: 'Medium',
    likelihood: 'Medium',
    impact: 'Budget and schedule impact',
    status: 'Monitoring',
    category: 'Design',
    mitigation: 'Detailed design review process and change management protocol implementation.',
    owner: 'Design Manager',
    lastUpdated: '2023-03-28'
  },
  {
    id: 'R005',
    name: 'Weather Delays',
    severity: 'Medium',
    likelihood: 'Low',
    impact: 'Schedule delay of 2-4 weeks',
    status: 'Monitoring',
    category: 'Environmental',
    mitigation: 'Contingency in schedule and weather protection measures for critical activities.',
    owner: 'Site Superintendent',
    lastUpdated: '2023-04-01'
  }
];

export const riskByCategory: CategoryData[] = [
  { name: 'Financial', value: 4 },
  { name: 'Regulatory', value: 2 },
  { name: 'Resource', value: 3 },
  { name: 'Design', value: 2 },
  { name: 'Environmental', value: 2 },
  { name: 'Technical', value: 1 },
];
