
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
  },
  {
    id: 'R006',
    name: 'Subcontractor Default',
    severity: 'High',
    likelihood: 'Low',
    impact: 'Major schedule delays and increased costs',
    status: 'Active',
    category: 'Financial',
    mitigation: 'Thorough subcontractor prequalification process and bonding requirements.',
    owner: 'Contracts Manager',
    lastUpdated: '2023-04-15'
  },
  {
    id: 'R007',
    name: 'Supply Chain Disruption',
    severity: 'High',
    likelihood: 'Medium',
    impact: 'Material delays and potential cost increases',
    status: 'Active',
    category: 'Logistics',
    mitigation: 'Multiple supplier agreements and early material procurement strategy.',
    owner: 'Supply Chain Manager',
    lastUpdated: '2023-04-08'
  },
  {
    id: 'R008',
    name: 'Quality Control Issues',
    severity: 'Medium',
    likelihood: 'Medium',
    impact: 'Rework and potential schedule delays',
    status: 'Monitoring',
    category: 'Technical',
    mitigation: 'Enhanced quality control protocols and regular third-party inspections.',
    owner: 'Quality Manager',
    lastUpdated: '2023-03-30'
  },
  {
    id: 'R009',
    name: 'Unforeseen Site Conditions',
    severity: 'High',
    likelihood: 'Low',
    impact: 'Scope changes and additional costs',
    status: 'Mitigated',
    category: 'Technical',
    mitigation: 'Comprehensive geotechnical investigation and site survey prior to construction.',
    owner: 'Project Engineer',
    lastUpdated: '2023-04-02'
  },
  {
    id: 'R010',
    name: 'Regulatory Changes',
    severity: 'Medium',
    likelihood: 'Low',
    impact: 'Design modifications and compliance costs',
    status: 'Monitoring',
    category: 'Regulatory',
    mitigation: 'Regular monitoring of regulatory updates and building code compliance reviews.',
    owner: 'Compliance Manager',
    lastUpdated: '2023-03-25'
  },
  {
    id: 'R011',
    name: 'Stakeholder Resistance',
    severity: 'Medium',
    likelihood: 'Medium',
    impact: 'Project delays and potential scope changes',
    status: 'Active',
    category: 'Stakeholder',
    mitigation: 'Regular stakeholder engagement sessions and proactive communication strategy.',
    owner: 'Community Relations Manager',
    lastUpdated: '2023-04-07'
  },
  {
    id: 'R012',
    name: 'Worker Safety Incidents',
    severity: 'High',
    likelihood: 'Low',
    impact: 'Project stoppage and potential litigation',
    status: 'Mitigated',
    category: 'Safety',
    mitigation: 'Comprehensive safety program implementation and regular safety audits.',
    owner: 'Safety Manager',
    lastUpdated: '2023-04-03'
  }
];

export const riskByCategory: CategoryData[] = [
  { name: 'Financial', value: 4 },
  { name: 'Regulatory', value: 2 },
  { name: 'Resource', value: 3 },
  { name: 'Design', value: 2 },
  { name: 'Environmental', value: 2 },
  { name: 'Technical', value: 3 },
  { name: 'Logistics', value: 2 },
  { name: 'Stakeholder', value: 1 },
  { name: 'Safety', value: 1 },
];

