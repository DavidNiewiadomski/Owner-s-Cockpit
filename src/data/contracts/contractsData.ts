
// Types for the contracts and insurance data
export interface Contract {
  id: string;
  title: string;
  type: "Construction" | "Service" | "Equipment" | "Maintenance" | "Design" | "Other";
  status: "Draft" | "In Review" | "Active" | "Expired" | "Terminated";
  value: number;
  startDate: string;
  endDate: string;
  parties: string[];
  project: string;
  owner: string;
  tags: string[];
}

export interface Insurance {
  id: string;
  title: string;
  type: "Liability" | "Property" | "Workers Comp" | "Professional Liability" | "Builder's Risk" | "Other";
  status: "Active" | "Pending" | "Expired" | "Renewed";
  premium: number;
  coverage: number;
  startDate: string;
  endDate: string;
  provider: string;
  policyNumber: string;
  project: string;
}

export interface ContractMilestone {
  id: string;
  contractId: string;
  title: string;
  dueDate: string;
  status: "Pending" | "Completed" | "Delayed";
  value: number;
}

export const contracts: Contract[] = [
  {
    id: "CON-001",
    title: "Main Construction Contract",
    type: "Construction",
    status: "Active",
    value: 12500000,
    startDate: "2024-01-15",
    endDate: "2025-08-30",
    parties: ["ABC Construction Co.", "Riverfront Development LLC"],
    project: "Riverfront Tower",
    owner: "Jane Smith",
    tags: ["Critical", "High-Value"]
  },
  {
    id: "CON-002",
    title: "Electrical Systems Installation",
    type: "Service",
    status: "Active",
    value: 2750000,
    startDate: "2024-02-10",
    endDate: "2024-11-15",
    parties: ["ElectraTech Inc.", "ABC Construction Co."],
    project: "Riverfront Tower",
    owner: "Tom Johnson",
    tags: ["Infrastructure", "Specialty"]
  },
  {
    id: "CON-003",
    title: "Architectural Design Services",
    type: "Design",
    status: "Active",
    value: 1250000,
    startDate: "2023-10-05",
    endDate: "2024-12-31",
    parties: ["Modern Designs Studio", "Westview Development Group"],
    project: "Westview Residences",
    owner: "Sarah Williams",
    tags: ["Design", "Core"]
  },
  {
    id: "CON-004",
    title: "HVAC Installation & Service",
    type: "Equipment",
    status: "In Review",
    value: 1850000,
    startDate: "2024-04-20",
    endDate: "2024-10-15",
    parties: ["Climate Control Systems", "ABC Construction Co."],
    project: "Riverfront Tower",
    owner: "Mark Davis",
    tags: ["Infrastructure", "Specialty"]
  },
  {
    id: "CON-005",
    title: "Structural Engineering Services",
    type: "Service",
    status: "Active",
    value: 980000,
    startDate: "2023-11-12",
    endDate: "2024-08-30",
    parties: ["SteelCore Engineering", "Harbor Bridge Partners"],
    project: "Harbor Bridge",
    owner: "Emily Chen",
    tags: ["Engineering", "Critical"]
  },
  {
    id: "CON-006",
    title: "Landscaping & Site Work",
    type: "Service",
    status: "Draft",
    value: 560000,
    startDate: "2024-05-01",
    endDate: "2024-12-15",
    parties: ["GreenScape Solutions", "Westview Development Group"],
    project: "Westview Residences",
    owner: "Robert Taylor",
    tags: ["External", "Aesthetics"]
  },
  {
    id: "CON-007",
    title: "Security Systems Installation",
    type: "Equipment",
    status: "In Review",
    value: 425000,
    startDate: "2024-06-10",
    endDate: "2024-09-30",
    parties: ["SecureTech Solutions", "Riverfront Development LLC"],
    project: "Riverfront Tower",
    owner: "Amanda Lewis",
    tags: ["Safety", "Technology"]
  }
];

export const insurances: Insurance[] = [
  {
    id: "INS-001",
    title: "General Liability Insurance",
    type: "Liability",
    status: "Active",
    premium: 250000,
    coverage: 10000000,
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    provider: "Guardian Insurance Group",
    policyNumber: "GL-2024-78952",
    project: "Riverfront Tower"
  },
  {
    id: "INS-002",
    title: "Builder's Risk Policy",
    type: "Builder's Risk",
    status: "Active",
    premium: 175000,
    coverage: 15000000,
    startDate: "2024-01-15",
    endDate: "2025-08-30",
    provider: "Construction Specialty Insurance",
    policyNumber: "BR-2024-34567",
    project: "Riverfront Tower"
  },
  {
    id: "INS-003",
    title: "Professional Liability Insurance",
    type: "Professional Liability",
    status: "Active",
    premium: 85000,
    coverage: 5000000,
    startDate: "2023-10-01",
    endDate: "2024-10-01",
    provider: "DesignPro Insurance",
    policyNumber: "PL-2023-12456",
    project: "Westview Residences"
  },
  {
    id: "INS-004",
    title: "Workers Compensation",
    type: "Workers Comp",
    status: "Active",
    premium: 325000,
    coverage: 7500000,
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    provider: "SafeWork Insurance Co.",
    policyNumber: "WC-2024-87325",
    project: "All Projects"
  },
  {
    id: "INS-005",
    title: "Structural Defects Insurance",
    type: "Property",
    status: "Active",
    premium: 110000,
    coverage: 8000000,
    startDate: "2023-11-15",
    endDate: "2028-11-15",
    provider: "Guarantee Build Insurance",
    policyNumber: "SD-2023-45632",
    project: "Harbor Bridge"
  },
  {
    id: "INS-006",
    title: "Environmental Liability Insurance",
    type: "Liability",
    status: "Pending",
    premium: 95000,
    coverage: 6000000,
    startDate: "2024-05-01",
    endDate: "2025-05-01",
    provider: "GreenCover Insurance",
    policyNumber: "EL-2024-57892",
    project: "Westview Residences"
  }
];

export const contractMilestones: ContractMilestone[] = [
  {
    id: "MIL-001",
    contractId: "CON-001",
    title: "Foundation Completion",
    dueDate: "2024-04-30",
    status: "Completed",
    value: 2500000
  },
  {
    id: "MIL-002",
    contractId: "CON-001",
    title: "Steel Structure Completion",
    dueDate: "2024-07-15",
    status: "Pending",
    value: 3750000
  },
  {
    id: "MIL-003",
    contractId: "CON-001",
    title: "Building Envelope Completion",
    dueDate: "2024-10-30",
    status: "Pending",
    value: 2250000
  },
  {
    id: "MIL-004",
    contractId: "CON-002",
    title: "Electrical Rough-In",
    dueDate: "2024-06-15",
    status: "Pending",
    value: 1100000
  },
  {
    id: "MIL-005",
    contractId: "CON-003",
    title: "Design Development Completion",
    dueDate: "2024-01-20",
    status: "Completed",
    value: 500000
  },
  {
    id: "MIL-006",
    contractId: "CON-003",
    title: "Construction Documentation",
    dueDate: "2024-05-10",
    status: "Pending",
    value: 450000
  },
  {
    id: "MIL-007",
    contractId: "CON-005",
    title: "Structural Analysis Completion",
    dueDate: "2024-02-28",
    status: "Completed",
    value: 350000
  }
];

// Get contracts by project ID
export const getContractsByProject = (projectId: string) => {
  if (projectId === 'all') {
    return contracts;
  }
  return contracts.filter(contract => {
    const projectMap: Record<string, string> = {
      '1': 'Riverfront Tower',
      '2': 'Westview Residences',
      '3': 'Harbor Bridge'
    };
    return contract.project === projectMap[projectId];
  });
};

// Get insurances by project ID
export const getInsurancesByProject = (projectId: string) => {
  if (projectId === 'all') {
    return insurances;
  }
  return insurances.filter(insurance => {
    const projectMap: Record<string, string> = {
      '1': 'Riverfront Tower',
      '2': 'Westview Residences',
      '3': 'Harbor Bridge'
    };
    return insurance.project === projectMap[projectId] || insurance.project === 'All Projects';
  });
};

// Get milestones by contract ID
export const getMilestonesByContract = (contractId: string) => {
  return contractMilestones.filter(milestone => milestone.contractId === contractId);
};
