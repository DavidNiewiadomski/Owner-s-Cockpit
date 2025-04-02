
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
  },
  {
    id: "4",
    name: "Landscape Design",
    type: "pdf" as const,
    date: "Apr 2, 2024",
    size: "6.1 MB",
    status: "approved",
    author: "Green Spaces Design",
    updatedAt: "2024-04-02",
    project: "Westview Residences"
  },
  {
    id: "5",
    name: "Structural Engineering Report",
    type: "pdf" as const,
    date: "Mar 15, 2024",
    size: "12.3 MB",
    status: "review",
    author: "Structural Systems LLC",
    updatedAt: "2024-03-15",
    project: "Harbor Bridge"
  },
  {
    id: "6",
    name: "Safety Protocols",
    type: "text" as const,
    date: "Feb 28, 2024",
    size: "1.7 MB",
    status: "approved",
    author: "Safety First Consultants",
    updatedAt: "2024-02-28",
    project: "Harbor Bridge"
  }
];

export const projectDocuments = documents;
