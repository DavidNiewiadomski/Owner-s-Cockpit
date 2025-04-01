
export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed' | 'upcoming';
  dueDate: string;
  startDate: string;
  teamMembers: { name: string; avatar?: string }[];
  priority: 'High' | 'Medium' | 'Low';
  budget: string;
  location: string;
  client: string;
  category: 'residential' | 'commercial' | 'infrastructure' | 'mixed-use';
  phase: 'planning' | 'design' | 'foundation' | 'structural' | 'finishing' | 'handover';
}

export const projects: Project[] = [
  {
    id: "1",
    title: "East Tower",
    description: "East wing of the Riverfront Tower complex featuring luxury apartments with riverside views.",
    progress: 42,
    status: "on-track",
    startDate: "2023-12-05",
    dueDate: "2024-08-15",
    teamMembers: [
      { name: "Sarah Johnson", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      { name: "Michael Chen", avatar: "https://randomuser.me/api/portraits/men/42.jpg" }
    ],
    priority: "High",
    budget: "$15.4M",
    location: "Chicago, IL",
    client: "Riverfront Developments LLC",
    category: "residential",
    phase: "structural"
  },
  {
    id: "2",
    title: "Westside Park",
    description: "Adjacent park and recreational area with walking paths, playgrounds, and outdoor fitness zones.",
    progress: 28,
    status: "delayed",
    startDate: "2023-08-15",
    dueDate: "2024-10-30",
    teamMembers: [
      { name: "Emily Parker", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
      { name: "David Wilson", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }
    ],
    priority: "Medium",
    budget: "$4.2M",
    location: "Chicago, IL",
    client: "City Parks Department",
    category: "infrastructure",
    phase: "foundation"
  },
  {
    id: "3",
    title: "North Bridge",
    description: "Pedestrian bridge connecting to North District with innovative suspension design and LED lighting.",
    progress: 65,
    status: "on-track",
    startDate: "2023-05-10",
    dueDate: "2024-05-20",
    teamMembers: [
      { name: "Robert Lee", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
      { name: "Jennifer Smith", avatar: "https://randomuser.me/api/portraits/women/22.jpg" }
    ],
    priority: "High",
    budget: "$8.7M",
    location: "Chicago, IL",
    client: "Transit Authority",
    category: "infrastructure",
    phase: "structural"
  },
  {
    id: "4",
    title: "Downtown Office Complex",
    description: "Modern office space with flexible workspace design, smart building systems, and rooftop garden.",
    progress: 88,
    status: "on-track",
    startDate: "2022-09-12",
    dueDate: "2024-02-28",
    teamMembers: [
      { name: "Thomas Wright", avatar: "https://randomuser.me/api/portraits/men/18.jpg" },
      { name: "Amanda Lopez", avatar: "https://randomuser.me/api/portraits/women/19.jpg" },
      { name: "Kevin Patel", avatar: "https://randomuser.me/api/portraits/men/16.jpg" }
    ],
    priority: "Medium",
    budget: "$22.8M",
    location: "Boston, MA",
    client: "Horizon Workspaces Inc.",
    category: "commercial",
    phase: "finishing"
  },
  {
    id: "5",
    title: "Lakefront Residences",
    description: "Luxury condominium development with private marina access, spa amenities, and panoramic lake views.",
    progress: 95,
    status: "completed",
    startDate: "2022-03-15",
    dueDate: "2023-12-10",
    teamMembers: [
      { name: "Patricia Chang", avatar: "https://randomuser.me/api/portraits/women/14.jpg" },
      { name: "Richard Torres", avatar: "https://randomuser.me/api/portraits/men/15.jpg" }
    ],
    priority: "High",
    budget: "$35.2M",
    location: "Seattle, WA",
    client: "Lakeside Properties LLC",
    category: "residential",
    phase: "handover"
  },
  {
    id: "6",
    title: "Central Medical Center",
    description: "State-of-the-art hospital facility with emergency department, specialized treatment wings, and healing gardens.",
    progress: 0,
    status: "upcoming",
    startDate: "2024-04-01",
    dueDate: "2026-08-30",
    teamMembers: [
      { name: "Elizabeth Morgan", avatar: "https://randomuser.me/api/portraits/women/11.jpg" },
      { name: "William Chen", avatar: "https://randomuser.me/api/portraits/men/13.jpg" }
    ],
    priority: "High",
    budget: "$78.5M",
    location: "Denver, CO",
    client: "Regional Healthcare Network",
    category: "mixed-use",
    phase: "planning"
  },
  {
    id: "7",
    title: "Harbor Point Marina",
    description: "Coastal marina with boat slips, maintenance facility, restaurant, and retail spaces.",
    progress: 20,
    status: "at-risk",
    startDate: "2023-11-05",
    dueDate: "2025-06-15",
    teamMembers: [
      { name: "James Rodriguez", avatar: "https://randomuser.me/api/portraits/men/9.jpg" },
      { name: "Susan Taylor", avatar: "https://randomuser.me/api/portraits/women/9.jpg" },
      { name: "Daniel Kim", avatar: "https://randomuser.me/api/portraits/men/8.jpg" }
    ],
    priority: "Medium",
    budget: "$18.3M",
    location: "Miami, FL",
    client: "Coastal Developments Inc.",
    category: "mixed-use",
    phase: "foundation"
  },
  {
    id: "8",
    title: "Uptown Transit Hub",
    description: "Integrated transit facility connecting bus, light rail, and regional train services with commercial spaces.",
    progress: 0,
    status: "upcoming",
    startDate: "2024-05-20",
    dueDate: "2026-11-30",
    teamMembers: [
      { name: "Nancy Wilson", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
      { name: "Mark Brown", avatar: "https://randomuser.me/api/portraits/men/7.jpg" }
    ],
    priority: "High",
    budget: "$42.7M",
    location: "Portland, OR",
    client: "Metropolitan Transit Authority",
    category: "infrastructure",
    phase: "planning"
  },
  {
    id: "9",
    title: "Sunset Heights Apartments",
    description: "Affordable housing development with 120 units, community spaces, and sustainable design features.",
    progress: 72,
    status: "on-track",
    startDate: "2023-02-10",
    dueDate: "2024-07-15",
    teamMembers: [
      { name: "Lisa Johnson", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
      { name: "Robert Martin", avatar: "https://randomuser.me/api/portraits/men/5.jpg" }
    ],
    priority: "Medium",
    budget: "$16.9M",
    location: "Phoenix, AZ",
    client: "Community Housing Partners",
    category: "residential",
    phase: "finishing"
  },
  {
    id: "10",
    title: "Tech Innovation Campus",
    description: "Corporate campus with research facilities, collaborative workspaces, and sustainable landscape design.",
    progress: 100,
    status: "completed",
    startDate: "2022-01-05",
    dueDate: "2023-11-10",
    teamMembers: [
      { name: "Christopher Park", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
      { name: "Michelle Lee", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
      { name: "Andrew Thompson", avatar: "https://randomuser.me/api/portraits/men/2.jpg" }
    ],
    priority: "High",
    budget: "$52.4M",
    location: "Austin, TX",
    client: "TechInnovate Global",
    category: "commercial",
    phase: "handover"
  }
];
