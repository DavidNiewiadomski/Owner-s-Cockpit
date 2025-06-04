
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
    title: "Arsenal-1 hyperscale manufacturing complex",
    description: "Pickaway County, OH",
    progress: 35,
    status: "at-risk" as const,
    dueDate: "2025-03-15",
    startDate: "2023-11-01",
    budget: "$45.7M",
    client: "Industrial Partners LLC",
    location: "Pickaway County, OH",
    phase: "Foundation & Structure",
    stage: "construction" as const,
    teamMembers: [
      { name: "Robert Martinez" },
      { name: "Lisa Thompson" }
    ],
    priority: "High" as const
  },
  {
    id: "2",
    title: "Atlanta (UAV \"Allied Studios\")",
    description: "Atlanta, GA",
    progress: 68,
    status: "on-track" as const,
    dueDate: "2024-12-20",
    startDate: "2024-01-10",
    budget: "$18.9M",
    client: "Allied Studios Corp",
    location: "Atlanta, GA",
    phase: "Interior & Systems",
    stage: "construction" as const,
    teamMembers: [
      { name: "Carlos Rivera" },
      { name: "Amanda Foster" }
    ],
    priority: "High" as const
  },
  {
    id: "3",
    title: "Quonset Point AUV plant",
    description: "North Kingstown, RI",
    progress: 22,
    status: "delayed" as const,
    dueDate: "2025-06-30",
    startDate: "2024-03-01",
    budget: "$28.4M",
    client: "Maritime Technologies Inc",
    location: "North Kingstown, RI", 
    phase: "Site Preparation",
    stage: "construction" as const,
    teamMembers: [
      { name: "James Wilson" },
      { name: "Patricia Lee" }
    ],
    priority: "High" as const
  }
];

// Debug logging to track what data is being exported
console.log('PROJECT DATA LOADED:', projects.map(p => ({ id: p.id, title: p.title })));
