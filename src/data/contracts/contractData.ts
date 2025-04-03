
import { Contract } from './types';

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
