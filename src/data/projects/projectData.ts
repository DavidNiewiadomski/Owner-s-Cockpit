
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
  teamMembers: { name: string; avatar?: string }[];
  priority: "High" | "Medium" | "Low";
}

export const projects = [
  {
    id: "1",
    title: "East Tower",
    description: "East wing of the Riverfront Tower complex",
    progress: 42,
    status: "on-track" as const,
    dueDate: "2024-08-15",
    startDate: "2023-11-10",
    budget: "$24.5M",
    client: "Riverfront Development Corp",
    location: "Downtown",
    phase: "Structural",
    teamMembers: [
      { name: "Sarah Johnson" },
      { name: "Michael Chen" }
    ],
    priority: "High" as const
  },
  {
    id: "2",
    title: "Westside Park",
    description: "Adjacent park and recreational area",
    progress: 28,
    status: "delayed" as const,
    dueDate: "2024-10-30",
    startDate: "2023-12-05",
    budget: "$8.2M",
    client: "City Parks Department",
    location: "West District",
    phase: "Foundation",
    teamMembers: [
      { name: "Emily Parker" },
      { name: "David Wilson" }
    ],
    priority: "Medium" as const
  },
  {
    id: "3",
    title: "North Bridge",
    description: "Pedestrian bridge connecting to North District",
    progress: 65,
    status: "on-track" as const,
    dueDate: "2024-05-20",
    startDate: "2023-09-15",
    budget: "$12.7M",
    client: "City Transport Authority",
    location: "North District",
    phase: "Finishing",
    teamMembers: [
      { name: "Robert Lee" },
      { name: "Jennifer Smith" }
    ],
    priority: "High" as const
  }
];
