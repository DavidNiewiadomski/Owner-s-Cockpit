
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

export const projectDocuments = documents;
