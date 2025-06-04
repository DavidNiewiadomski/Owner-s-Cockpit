
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
    stage: "facility-management" as const,
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
    stage: "site-selection" as const,
    teamMembers: [
      { name: "James Wilson" },
      { name: "Patricia Lee" }
    ],
    priority: "High" as const
  }
];

// Mock financial data to fix FinancialOverview errors
export const mockFinancialData = {
  spending: [
    { month: "Jan", actual: 450000, budget: 500000 },
    { month: "Feb", actual: 380000, budget: 450000 },
    { month: "Mar", actual: 520000, budget: 600000 }
  ],
  totalBudget: 15000000,
  totalSpent: 9750000,
  remainingBudget: 5250000
};

// Mock timeline events to fix ProjectTimeline errors
export const mockTimelineEvents = [
  {
    id: "1",
    title: "Foundation Pour Complete",
    date: "2024-02-15",
    type: "milestone",
    status: "completed",
    description: "Foundation concrete pour completed successfully"
  },
  {
    id: "2", 
    title: "Structural Steel Installation",
    date: "2024-03-01",
    type: "task",
    status: "in-progress",
    description: "Begin structural steel framework installation"
  },
  {
    id: "3",
    title: "Electrical Rough-in",
    date: "2024-04-15", 
    type: "milestone",
    status: "upcoming",
    description: "Complete electrical rough-in work"
  }
];

// Debug logging to track what data is being exported
console.log('PROJECT DATA LOADED:', projects.map(p => ({ id: p.id, title: p.title })));
console.log('FINANCIAL DATA LOADED:', mockFinancialData);
console.log('TIMELINE EVENTS LOADED:', mockTimelineEvents);
