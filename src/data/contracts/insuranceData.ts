
import { Insurance } from './types';

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
