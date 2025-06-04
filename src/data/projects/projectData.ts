
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
  // Site Selection
  {
    id: "1",
    title: "South Coast Technology Center",
    description: "3100-3120 W Lake Center Dr., Santa Ana CA 92704",
    progress: 25,
    status: "on-track" as const,
    dueDate: "2024-09-15",
    startDate: "2024-01-15",
    budget: "$2.8M",
    client: "Real Estate Development Corp",
    location: "Santa Ana, CA",
    phase: "Site Analysis",
    stage: "site-selection" as const,
    teamMembers: [
      { name: "Sarah Chen" },
      { name: "Michael Torres" }
    ],
    priority: "High" as const
  },
  {
    id: "2", 
    title: "Greater-Boston Expansion",
    description: "1050 Winter St., Waltham MA 02451",
    progress: 45,
    status: "on-track" as const,
    dueDate: "2024-08-30",
    startDate: "2024-02-01",
    budget: "$3.2M",
    client: "Real Estate Development Corp",
    location: "Waltham, MA",
    phase: "Due Diligence",
    stage: "site-selection" as const,
    teamMembers: [
      { name: "David Kim" },
      { name: "Jennifer Walsh" }
    ],
    priority: "Medium" as const
  },
  
  // Construction
  {
    id: "3",
    title: "Arsenal-1 Hyperscale Manufacturing",
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
      { name: "Lisa Thompson" }
    ],
    priority: "High" as const
  },
  {
    id: "4",
    title: "Atlanta UAV Allied Studios",
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
      { name: "Amanda Foster" }
    ],
    priority: "High" as const
  },
  {
    id: "5",
    title: "Quonset Point AUV Plant",
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
      { name: "Patricia Lee" }
    ],
    priority: "High" as const
  },
  
  // Facility Management
  {
    id: "6",
    title: "The Press HQ Campus",
    description: "1375 Sunflower Ave., Costa Mesa CA 92626",
    progress: 95,
    status: "on-track" as const,
    dueDate: "2024-07-15",
    startDate: "2021-08-15",
    budget: "$12.5M",
    client: "The Press Media Group",
    location: "Costa Mesa, CA",
    phase: "Operations & Maintenance",
    stage: "facility-management" as const,
    teamMembers: [
      { name: "Maria Garcia" },
      { name: "Steven Chang" }
    ],
    priority: "Medium" as const
  },
  {
    id: "7",
    title: "Shea Business Center, Bldg 8",
    description: "709 E Alton Ave., Santa Ana CA 92705",
    progress: 88,
    status: "on-track" as const,
    dueDate: "2024-08-01",
    startDate: "2022-01-20",
    budget: "$8.7M",
    client: "Shea Properties",
    location: "Santa Ana, CA",
    phase: "Tenant Services",
    stage: "facility-management" as const,
    teamMembers: [
      { name: "Nicole Davis" },
      { name: "Ryan Johnson" }
    ],
    priority: "Low" as const
  },
  {
    id: "8",
    title: "Prototype/Test Shop",
    description: "642 E Dyer Rd., Santa Ana CA 92705",
    progress: 75,
    status: "on-track" as const,
    dueDate: "2024-09-30",
    startDate: "2023-03-15",
    budget: "$4.2M",
    client: "R&D Technologies",
    location: "Santa Ana, CA",
    phase: "Equipment Optimization",
    stage: "facility-management" as const,
    teamMembers: [
      { name: "Kevin Liu" },
      { name: "Rachel Green" }
    ],
    priority: "Medium" as const
  }
];
