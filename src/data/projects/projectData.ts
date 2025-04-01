
export const projects = [
  {
    id: "1",
    title: "East Tower",
    description: "East wing of the Riverfront Tower complex",
    progress: 42,
    status: "on-track" as const,
    dueDate: "2024-08-15",
    teamMembers: [
      { name: "Sarah Johnson" },
      { name: "Michael Chen" }
    ],
    priority: "High"
  },
  {
    id: "2",
    title: "Westside Park",
    description: "Adjacent park and recreational area",
    progress: 28,
    status: "delayed" as const,
    dueDate: "2024-10-30",
    teamMembers: [
      { name: "Emily Parker" },
      { name: "David Wilson" }
    ],
    priority: "Medium"
  },
  {
    id: "3",
    title: "North Bridge",
    description: "Pedestrian bridge connecting to North District",
    progress: 65,
    status: "on-track" as const,
    dueDate: "2024-05-20",
    teamMembers: [
      { name: "Robert Lee" },
      { name: "Jennifer Smith" }
    ],
    priority: "High"
  }
];
