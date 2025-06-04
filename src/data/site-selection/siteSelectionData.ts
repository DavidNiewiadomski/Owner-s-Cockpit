// Site Analysis Data
export const siteAnalysisData = [
  {
    id: 1,
    name: 'Site A',
    address: '1250 Commerce St, Dallas, TX',
    size: '2.5 acres',
    price: '$850,000',
    score: 87,
    status: 'Under Review',
    zoning: 'Commercial',
    transportation: 90,
    utilities: 88,
    environmental: 85,
    demographics: 92,
    marketAccess: 89,
    lastUpdated: '2 hours ago',
    coordinates: { lat: 32.7767, lng: -96.7970 },
    change: '+2%'
  },
  {
    id: 2,
    name: 'Site B',
    address: '5678 Industrial Blvd, Dallas, TX',
    size: '4.2 acres',
    price: '$650,000',
    score: 78,
    status: 'Pending Review',
    zoning: 'Industrial',
    transportation: 75,
    utilities: 82,
    environmental: 70,
    demographics: 76,
    marketAccess: 80,
    lastUpdated: '1 day ago',
    coordinates: { lat: 32.7505, lng: -96.8353 },
    change: '-1%'
  },
  {
    id: 3,
    name: 'Site C',
    address: '3456 Main St, Plano, TX',
    size: '1.8 acres',
    price: '$720,000',
    score: 95,
    status: 'High Priority',
    zoning: 'Mixed Use',
    transportation: 95,
    utilities: 98,
    environmental: 92,
    demographics: 96,
    marketAccess: 94,
    lastUpdated: '3 hours ago',
    coordinates: { lat: 33.0198, lng: -96.6989 },
    change: '+5%'
  },
  {
    id: 4,
    name: 'Waterfront Development',
    address: '789 Lake View Dr, Irving, TX',
    size: '3.1 acres',
    price: '$1,200,000',
    score: 91,
    status: 'Under Negotiation',
    zoning: 'Commercial',
    transportation: 88,
    utilities: 87,
    environmental: 95,
    demographics: 94,
    marketAccess: 93,
    lastUpdated: '5 hours ago',
    coordinates: { lat: 32.8143, lng: -96.9489 },
    change: '+3%'
  }
];

// Feasibility Studies Data
export const feasibilityStudiesData = [
  {
    id: 1,
    siteName: 'Downtown Metro Area',
    studyType: 'Environmental Impact',
    consultant: 'Environmental Solutions Inc',
    status: 'In Progress',
    startDate: '2025-06-15',
    expectedCompletion: '2025-07-15',
    cost: '$45,000',
    findings: 'No major environmental concerns identified. Minor remediation needed for parking area.',
    riskLevel: 'Low'
  },
  {
    id: 2,
    siteName: 'Downtown Metro Area',
    studyType: 'Traffic Impact Analysis',
    consultant: 'Metro Traffic Consultants',
    status: 'Completed',
    startDate: '2025-06-01',
    expectedCompletion: '2025-06-30',
    cost: '$38,000',
    findings: 'Excellent accessibility. May require minor signal timing adjustments.',
    riskLevel: 'Low'
  },
  {
    id: 3,
    siteName: 'Industrial District East',
    studyType: 'Soil Contamination Assessment',
    consultant: 'GeoTech Environmental',
    status: 'Completed',
    startDate: '2025-05-20',
    expectedCompletion: '2025-06-20',
    cost: '$52,000',
    findings: 'Moderate contamination detected. Remediation cost estimated at $150,000.',
    riskLevel: 'Medium'
  },
  {
    id: 4,
    siteName: 'Waterfront Development',
    studyType: 'Flood Zone Analysis',
    consultant: 'Hydro Engineering Group',
    status: 'Pending',
    startDate: '2025-07-01',
    expectedCompletion: '2025-07-30',
    cost: '$41,000',
    findings: 'Preliminary review indicates minimal flood risk.',
    riskLevel: 'Low'
  }
];

// Zoning and Compliance Data
export const zoningComplianceData = [
  {
    id: 1,
    siteName: 'Downtown Metro Area',
    currentZoning: 'C-2 Commercial',
    requiredZoning: 'C-2 Commercial',
    status: 'Compliant',
    heightLimit: '150 ft',
    proposedHeight: '120 ft',
    setbacks: 'Front: 10ft, Side: 5ft, Rear: 10ft',
    parkingRequirement: '1 space per 300 sq ft',
    specialRequirements: 'Historic district overlay - facade restrictions',
    approvalNeeded: false,
    estimatedTime: 'N/A',
    estimatedCost: '$0'
  },
  {
    id: 2,
    siteName: 'Suburban North Plaza',
    currentZoning: 'R-3 Residential',
    requiredZoning: 'C-1 Commercial',
    status: 'Requires Rezoning',
    heightLimit: '35 ft',
    proposedHeight: '65 ft',
    setbacks: 'Front: 25ft, Side: 15ft, Rear: 20ft',
    parkingRequirement: '1 space per 250 sq ft',
    specialRequirements: 'Variance needed for height and use',
    approvalNeeded: true,
    estimatedTime: '6-8 months',
    estimatedCost: '$15,000'
  },
  {
    id: 3,
    siteName: 'Industrial District East',
    currentZoning: 'I-1 Light Industrial',
    requiredZoning: 'I-2 Heavy Industrial',
    status: 'Conditional Use Permit Required',
    heightLimit: '45 ft',
    proposedHeight: '40 ft',
    setbacks: 'Front: 50ft, Side: 25ft, Rear: 30ft',
    parkingRequirement: '1 space per 500 sq ft',
    specialRequirements: 'Environmental compliance certification',
    approvalNeeded: true,
    estimatedTime: '3-4 months',
    estimatedCost: '$8,500'
  }
];

// Market Analysis Data
export const marketAnalysisData = {
  demographics: [
    { category: 'Population Density', value: '2,847 per sq mi', trend: 'up', change: '+5.2%' },
    { category: 'Median Household Income', value: '$67,500', trend: 'up', change: '+3.1%' },
    { category: 'Age 25-54 (Target)', value: '42%', trend: 'up', change: '+1.8%' },
    { category: 'College Educated', value: '58%', trend: 'up', change: '+2.4%' }
  ],
  competition: [
    { name: 'Metro Central Plaza', distance: '0.8 miles', size: '125,000 sq ft', occupancy: '89%' },
    { name: 'Commerce Square', distance: '1.2 miles', size: '95,000 sq ft', occupancy: '94%' },
    { name: 'Downtown Business Center', distance: '0.5 miles', size: '180,000 sq ft', occupancy: '76%' },
    { name: 'City Center Complex', distance: '1.5 miles', size: '220,000 sq ft', occupancy: '91%' }
  ],
  marketTrends: [
    { year: '2021', demand: 82, supply: 89, vacancy: 8.5 },
    { year: '2022', demand: 87, supply: 91, vacancy: 7.2 },
    { year: '2023', demand: 93, supply: 94, vacancy: 6.1 },
    { year: '2024', demand: 96, supply: 97, vacancy: 5.8 },
    { year: '2025', demand: 98, supply: 99, vacancy: 5.2 }
  ]
};

// Site Comparison Matrix
export const siteComparisonData = [
  {
    criteria: 'Transportation Access',
    weight: 20,
    downtown: 95,
    industrial: 85,
    suburban: 78,
    waterfront: 88
  },
  {
    criteria: 'Utilities Infrastructure',
    weight: 15,
    downtown: 92,
    industrial: 90,
    suburban: 95,
    waterfront: 87
  },
  {
    criteria: 'Environmental Factors',
    weight: 18,
    downtown: 88,
    industrial: 65,
    suburban: 92,
    waterfront: 95
  },
  {
    criteria: 'Market Demographics',
    weight: 25,
    downtown: 96,
    industrial: 72,
    suburban: 89,
    waterfront: 94
  },
  {
    criteria: 'Development Cost',
    weight: 12,
    downtown: 75,
    industrial: 90,
    suburban: 85,
    waterfront: 70
  },
  {
    criteria: 'Regulatory Compliance',
    weight: 10,
    downtown: 95,
    industrial: 80,
    suburban: 70,
    waterfront: 88
  }
];
