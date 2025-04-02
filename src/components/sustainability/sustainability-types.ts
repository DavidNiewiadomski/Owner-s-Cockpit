
export interface SustainabilityMetrics {
  energyEfficiency: number;
  waterConservation: number;
  wasteReduction: number;
  renewableEnergy: number;
  carbonFootprint: number;
}

export interface SustainabilityCertification {
  id: number;
  name: string;
  status: string;
  target: string;
}

export interface SustainabilityInsight {
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning';
}
