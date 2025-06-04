
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
    phase: "Design Development",
    stage: "planning-design" as const,
    teamMembers: [
      { name: "James Wilson" },
      { name: "Patricia Lee" }
    ],
    priority: "High" as const
  },
  {
    id: "4",
    title: "Phoenix Distribution Center",
    description: "Phoenix, AZ",
    progress: 5,
    status: "upcoming" as const,
    dueDate: "2025-09-15",
    startDate: "2025-01-15",
    budget: "$12.3M",
    client: "Logistics Solutions Inc",
    location: "Phoenix, AZ",
    phase: "Site Evaluation",
    stage: "site-selection" as const,
    teamMembers: [
      { name: "Michael Chen" },
      { name: "Sarah Johnson" }
    ],
    priority: "Medium" as const
  },
  {
    id: "5",
    title: "Downtown Office Complex",
    description: "Downtown Business District",
    progress: 65,
    status: "on-track" as const,
    dueDate: "2024-08-15",
    startDate: "2024-01-15",
    budget: "$15.0M",
    client: "Urban Development Corp",
    location: "Downtown Business District",
    phase: "Interior Build-out",
    stage: "construction" as const,
    teamMembers: [
      { name: "David Kim" },
      { name: "Jennifer Adams" }
    ],
    priority: "High" as const
  },
  {
    id: "6",
    title: "Riverside Residential Tower",
    description: "Riverside District",
    progress: 42,
    status: "on-track" as const,
    dueDate: "2025-01-30",
    startDate: "2024-05-01",
    budget: "$28.0M",
    client: "Riverside Developments",
    location: "Riverside District",
    phase: "Structural Framework",
    stage: "construction" as const,
    teamMembers: [
      { name: "Maria Rodriguez" },
      { name: "Alex Chen" }
    ],
    priority: "Medium" as const
  },
  {
    id: "7",
    title: "Tech Campus Site Analysis",
    description: "Preliminary site evaluation for tech headquarters",
    progress: 15,
    status: "on-track" as const,
    dueDate: "2025-02-28",
    startDate: "2024-12-01",
    budget: "$2.5M",
    client: "TechCorp Inc",
    location: "Austin, TX",
    phase: "Site Assessment",
    stage: "site-selection" as const,
    teamMembers: [
      { name: "Sarah Mitchell" },
      { name: "Kevin Park" }
    ],
    priority: "High" as const
  },
  {
    id: "8", 
    title: "Medical Center Design Phase",
    description: "Architectural planning and design development",
    progress: 55,
    status: "on-track" as const,
    dueDate: "2025-05-15",
    startDate: "2024-09-01",
    budget: "$8.2M",
    client: "Regional Healthcare",
    location: "Denver, CO",
    phase: "Schematic Design",
    stage: "planning-design" as const,
    teamMembers: [
      { name: "Dr. Amanda Foster" },
      { name: "Mark Thompson" }
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
console.log('PROJECT DATA LOADED:', projects.map(p => ({ id: p.id, title: p.title, stage: p.stage })));
console.log('FINANCIAL DATA LOADED:', mockFinancialData);
console.log('TIMELINE EVENTS LOADED:', mockTimelineEvents);
