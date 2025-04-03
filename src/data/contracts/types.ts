
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
