
export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: "on-track" | "at-risk" | "delayed" | "completed" | "upcoming";
  dueDate: string;
  startDate?: string;
  budget?: string;
  client?: string;
  location?: string;
  phase?: string;
  stage?: "site-selection" | "planning-design" | "construction" | "facility-management";
  teamMembers: { name: string; avatar?: string }[];
  priority: "High" | "Medium" | "Low";
}

export const projects = [
  {
    id: "1",
    title: "Downtown Office Complex",
    description: "Downtown Business District",
    progress: 65,
    status: "on-track" as const,
    dueDate: "2025-03-15",
    startDate: "2023-11-01",
    budget: "$15,000,000",
    client: "Downtown Development Corp",
    location: "Downtown Business District",
    phase: "Construction Phase",
    stage: "construction" as const,
    teamMembers: [
      { name: "Sarah Johnson" },
      { name: "Mike Chen" }
    ],
    priority: "High" as const
  },
  {
    id: "2",
    title: "Riverside Residential Tower",
    description: "Riverside District",
    progress: 42,
    status: "on-track" as const,
    dueDate: "2024-12-20",
    startDate: "2024-01-10",
    budget: "$28,000,000",
    client: "Riverside Properties LLC",
    location: "Riverside District",
    phase: "Foundation & Structure",
    stage: "construction" as const,
    teamMembers: [
      { name: "Alex Rivera" },
      { name: "Emily Davis" }
    ],
    priority: "High" as const
  }
];
