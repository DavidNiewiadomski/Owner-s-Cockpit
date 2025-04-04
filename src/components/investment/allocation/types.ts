
// Types for the investment allocation data
export interface AllocationDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface PortfolioAllocationData {
  name: string;
  residential: number;
  commercial: number;
  mixedUse: number;
  infrastructure: number;
  special: number;
}

export interface ProjectionDataPoint {
  name: string;
  value: number;
}

export interface ProjectAllocation {
  id: number;
  name: string;
  type: 'Commercial' | 'Residential' | 'Infrastructure' | 'Mixed-Use';
  allocation: string;
  status: 'Active' | 'Planning' | 'Completed';
  progress: number;
}

export interface InvestmentStat {
  title: string;
  value: string;
  change: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: React.ElementType;
}
