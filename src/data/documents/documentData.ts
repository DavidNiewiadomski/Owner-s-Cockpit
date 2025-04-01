
export const documents = [
  {
    id: "1",
    name: "Building Permit",
    type: "pdf" as const,
    date: "Feb 10, 2024",
    size: "2.4 MB",
    status: "approved",
    author: "City Planning Dept.",
    updatedAt: "2024-02-10",
    project: "Riverfront Tower"
  },
  {
    id: "2",
    name: "Architectural Plans",
    type: "text" as const,
    date: "Jan 25, 2024",
    size: "15.8 MB",
    status: "final",
    author: "Smith & Partners",
    updatedAt: "2024-01-25",
    project: "Riverfront Tower"
  },
  {
    id: "3",
    name: "MEP Specifications",
    type: "pdf" as const,
    date: "Mar 5, 2024",
    size: "8.2 MB",
    status: "review",
    author: "Engineering Solutions Inc.",
    updatedAt: "2024-03-05",
    project: "Riverfront Tower"
  }
];

export const projectDocuments = {
  "all": [
    {
      id: "1",
      name: "Building Permit",
      type: "pdf" as const,
      date: "Feb 10, 2024",
      size: "2.4 MB",
      status: "approved",
      author: "City Planning Dept.",
      updatedAt: "2024-02-10",
      project: "Riverfront Tower"
    },
    {
      id: "2",
      name: "Architectural Plans",
      type: "text" as const,
      date: "Jan 25, 2024",
      size: "15.8 MB",
      status: "final",
      author: "Smith & Partners",
      updatedAt: "2024-01-25",
      project: "Riverfront Tower"
    },
    {
      id: "3",
      name: "MEP Specifications",
      type: "pdf" as const,
      date: "Mar 5, 2024",
      size: "8.2 MB",
      status: "review",
      author: "Engineering Solutions Inc.",
      updatedAt: "2024-03-05",
      project: "Riverfront Tower"
    }
  ],
  "1": [
    {
      id: "4",
      name: "East Tower Blueprint",
      type: "pdf" as const,
      date: "Mar 12, 2024",
      size: "12.1 MB",
      status: "final",
      author: "Smith & Partners",
      updatedAt: "2024-03-12",
      project: "East Tower"
    },
    {
      id: "5",
      name: "East Tower Schedule",
      type: "spreadsheet" as const,
      date: "Mar 15, 2024",
      size: "1.8 MB",
      status: "review",
      author: "Project Management",
      updatedAt: "2024-03-15",
      project: "East Tower"
    }
  ],
  "2": [
    {
      id: "6",
      name: "Westside Park Landscaping",
      type: "pdf" as const,
      date: "Mar 18, 2024",
      size: "8.4 MB",
      status: "review",
      author: "Landscape Design Inc.",
      updatedAt: "2024-03-18",
      project: "Westside Park"
    }
  ],
  "3": [
    {
      id: "7",
      name: "North Bridge Engineering",
      type: "pdf" as const,
      date: "Mar 10, 2024",
      size: "15.2 MB",
      status: "final",
      author: "Engineering Solutions Inc.",
      updatedAt: "2024-03-10",
      project: "North Bridge"
    }
  ]
};
