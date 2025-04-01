
// Safety & Sustainability Data

export interface SafetyMetrics {
  incidentRate: number;
  safetyScore: number;
  inspectionsPassed: number;
  openSafetyIssues: number;
  daysWithoutIncident: number;
}

export interface SustainabilityMetrics {
  energyEfficiency: number;
  waterConservation: number;
  wasteReduction: number;
  renewableEnergy: number;
  carbonFootprint: number;
}

export interface SafetyCertification {
  id: number;
  name: string;
  status: string;
  date: string;
  expires: string;
}

export interface SafetyIncident {
  id: number;
  title: string;
  severity: string;
  date: string;
  resolved: boolean;
  area: string;
}

export interface SustainabilityCertification {
  id: number;
  name: string;
  status: string;
  target: string;
}

// Get safety metrics based on project ID
export const getSafetyMetrics = (projectId?: string): SafetyMetrics => {
  return {
    incidentRate: projectId === '1' ? 0.5 : projectId === '2' ? 0.2 : 0.3,
    safetyScore: projectId === '1' ? 92 : projectId === '2' ? 97 : 95,
    inspectionsPassed: projectId === '1' ? 42 : projectId === '2' ? 28 : 35,
    openSafetyIssues: projectId === '1' ? 3 : projectId === '2' ? 1 : 2,
    daysWithoutIncident: projectId === '1' ? 78 : projectId === '2' ? 145 : 112,
  };
};

// Get sustainability metrics based on project ID
export const getSustainabilityMetrics = (projectId?: string): SustainabilityMetrics => {
  return {
    energyEfficiency: projectId === '1' ? 85 : projectId === '2' ? 92 : 88,
    waterConservation: projectId === '1' ? 78 : projectId === '2' ? 90 : 82,
    wasteReduction: projectId === '1' ? 82 : projectId === '2' ? 88 : 85,
    renewableEnergy: projectId === '1' ? 45 : projectId === '2' ? 65 : 55,
    carbonFootprint: projectId === '1' ? 70 : projectId === '2' ? 85 : 75,
  };
};

// Safety certifications (same for all projects in this mock)
export const safetyCertifications: SafetyCertification[] = [
  { id: 1, name: 'OSHA Compliance', status: 'Verified', date: '2023-11-15', expires: '2024-11-15' },
  { id: 2, name: 'Fire Safety Inspection', status: 'Passed', date: '2023-12-02', expires: '2024-12-02' },
  { id: 3, name: 'Structural Safety Assessment', status: 'Passed', date: '2023-10-28', expires: '2024-10-28' },
  { id: 4, name: 'Emergency Systems Check', status: 'In Progress', date: '2024-02-10', expires: 'Pending' },
];

// Safety incidents (same for all projects in this mock)
export const safetyIncidents: SafetyIncident[] = [
  { id: 1, title: 'Minor slip and fall', severity: 'Low', date: '2024-01-15', resolved: true, area: 'North entrance' },
  { id: 2, title: 'Equipment malfunction', severity: 'Medium', date: '2023-12-05', resolved: true, area: 'Utility room' },
  { id: 3, title: 'Exposed electrical wiring', severity: 'High', date: '2024-02-01', resolved: false, area: 'East wing, 3rd floor' },
];

// Sustainability certifications (same for all projects in this mock)
export const sustainabilityCertifications: SustainabilityCertification[] = [
  { id: 1, name: 'LEED Gold Certification', status: 'In Progress', target: 'Jun 2024' },
  { id: 2, name: 'Energy Star Rating', status: 'Achieved', target: '85 points' },
  { id: 3, name: 'Net Zero Carbon Commitment', status: 'Planned', target: '2025' },
  { id: 4, name: 'Sustainable Materials Sourcing', status: 'Verified', target: '90% achieved' },
];
