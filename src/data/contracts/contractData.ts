
import { Contract } from './types';

export const contracts: Contract[] = [
  {
    id: "CON-001",
    title: "Main Construction Contract - Tower Foundation",
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
    title: "Electrical Systems Installation Package",
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
    title: "Architectural Design Services - Phase 1",
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
    title: "HVAC Installation & Maintenance Service",
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
    title: "Landscaping & Site Work Package",
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
  },
  {
    id: "CON-008",
    title: "Plumbing & Water Systems Installation",
    type: "Service",
    status: "Active",
    value: 1680000,
    startDate: "2024-03-15",
    endDate: "2024-09-30",
    parties: ["AquaFlow Plumbing", "ABC Construction Co."],
    project: "Riverfront Tower",
    owner: "David Rodriguez",
    tags: ["Infrastructure", "Essential"]
  },
  {
    id: "CON-009",
    title: "Interior Design & Finishing Services",
    type: "Design",
    status: "Draft",
    value: 2100000,
    startDate: "2024-07-01",
    endDate: "2025-02-28",
    parties: ["Elite Interiors Group", "Westview Development Group"],
    project: "Westview Residences",
    owner: "Lisa Martinez",
    tags: ["Design", "Premium"]
  },
  {
    id: "CON-010",
    title: "Fire Safety & Suppression Systems",
    type: "Equipment",
    status: "Active",
    value: 890000,
    startDate: "2024-04-01",
    endDate: "2024-10-31",
    parties: ["FireGuard Technologies", "Harbor Bridge Partners"],
    project: "Harbor Bridge",
    owner: "Michael Chang",
    tags: ["Safety", "Compliance"]
  },
  {
    id: "CON-011",
    title: "Concrete Supply & Pouring Services",
    type: "Construction",
    status: "Active",
    value: 3200000,
    startDate: "2024-01-20",
    endDate: "2024-08-15",
    parties: ["Metropolitan Concrete Corp", "ABC Construction Co."],
    project: "Riverfront Tower",
    owner: "Kevin Brown",
    tags: ["Materials", "Critical"]
  },
  {
    id: "CON-012",
    title: "Steel Structure Fabrication & Installation",
    type: "Construction",
    status: "Active",
    value: 4750000,
    startDate: "2024-02-01",
    endDate: "2024-09-30",
    parties: ["SteelWorks Industries", "Harbor Bridge Partners"],
    project: "Harbor Bridge",
    owner: "Angela Foster",
    tags: ["Structure", "Critical"]
  },
  // Add contracts for Downtown Office Complex
  {
    id: "CON-013",
    title: "General Construction Contract - Office Tower",
    type: "Construction",
    status: "Active",
    value: 18500000,
    startDate: "2024-02-01",
    endDate: "2025-12-31",
    parties: ["Premier Construction Group", "Downtown Development Corp"],
    project: "Downtown Office Complex",
    owner: "Jennifer Adams",
    tags: ["Critical", "High-Value", "Core"]
  },
  {
    id: "CON-014",
    title: "MEP Systems Installation - Downtown Office",
    type: "Service",
    status: "Active",
    value: 4200000,
    startDate: "2024-04-15",
    endDate: "2025-06-30",
    parties: ["Advanced Building Systems", "Premier Construction Group"],
    project: "Downtown Office Complex",
    owner: "Robert Kim",
    tags: ["Infrastructure", "MEP", "Essential"]
  },
  {
    id: "CON-015",
    title: "Facade & Curtain Wall Installation",
    type: "Construction",
    status: "In Review",
    value: 3800000,
    startDate: "2024-06-01",
    endDate: "2025-03-15",
    parties: ["Glass & Steel Specialists", "Downtown Development Corp"],
    project: "Downtown Office Complex",
    owner: "Maria Gonzalez",
    tags: ["Exterior", "Specialty", "High-Tech"]
  },
  {
    id: "CON-016",
    title: "Smart Building Technology Integration",
    type: "Equipment",
    status: "Draft",
    value: 2100000,
    startDate: "2024-08-01",
    endDate: "2025-04-30",
    parties: ["TechBuild Solutions", "Downtown Development Corp"],
    project: "Downtown Office Complex",
    owner: "Alex Thompson",
    tags: ["Technology", "Smart Systems", "Innovation"]
  }
];
