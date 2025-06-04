
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
    title: "Arsenal-1 hyperscale manufacturing complex – Pickaway County, OH",
    description: "Advanced manufacturing complex - Pickaway County, OH",
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
      { name: "Lisa Thompson" },
      { name: "David Chen" }
    ],
    priority: "High" as const
  },
  {
    id: "2",
    title: "Atlanta (UAV \"Allied Studios\") – 1435 Hills Pl. NW, Atlanta GA 30318",
    description: "1435 Hills Pl. NW, Atlanta GA 30318",
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
      { name: "Amanda Foster" },
      { name: "Michael Torres" }
    ],
    priority: "High" as const
  },
  {
    id: "3",
    title: "Quonset Point AUV plant – Flex Tech Park Bldg 11, Quonset Business Park, North Kingstown RI 02852",
    description: "Flex Tech Park Bldg 11, Quonset Business Park, North Kingstown RI 02852",
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
      { name: "Patricia Lee" },
      { name: "Sarah Chen" }
    ],
    priority: "High" as const
  }
];
