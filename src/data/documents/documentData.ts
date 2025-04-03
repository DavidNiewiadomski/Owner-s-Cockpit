
export interface Document {
  id: string;
  name: string;
  type: "pdf" | "text" | "image" | "spreadsheet";
  date: string;
  size: string;
  status: string;
  author: string;
  updatedAt: string;
  project: string;
  folder: string;
}

export const documents: Document[] = [
  {
    id: "1",
    name: "Building Permit",
    type: "pdf",
    date: "Feb 10, 2024",
    size: "2.4 MB",
    status: "approved",
    author: "City Planning Dept.",
    updatedAt: "2024-02-10",
    project: "Riverfront Tower",
    folder: "Permits"
  },
  {
    id: "2",
    name: "Architectural Plans",
    type: "text",
    date: "Jan 25, 2024",
    size: "15.8 MB",
    status: "final",
    author: "Smith & Partners",
    updatedAt: "2024-01-25",
    project: "Riverfront Tower",
    folder: "Design"
  },
  {
    id: "3",
    name: "MEP Specifications",
    type: "pdf",
    date: "Mar 5, 2024",
    size: "8.2 MB",
    status: "review",
    author: "Engineering Solutions Inc.",
    updatedAt: "2024-03-05",
    project: "Riverfront Tower",
    folder: "Design"
  },
  {
    id: "4",
    name: "Landscape Design",
    type: "pdf",
    date: "Apr 2, 2024",
    size: "6.1 MB",
    status: "approved",
    author: "Green Spaces Design",
    updatedAt: "2024-04-02",
    project: "Westview Residences",
    folder: "Design"
  },
  {
    id: "5",
    name: "Structural Engineering Report",
    type: "pdf",
    date: "Mar 15, 2024",
    size: "12.3 MB",
    status: "review",
    author: "Structural Systems LLC",
    updatedAt: "2024-03-15",
    project: "Harbor Bridge",
    folder: "Reports"
  },
  {
    id: "6",
    name: "Safety Protocols",
    type: "text",
    date: "Feb 28, 2024",
    size: "1.7 MB",
    status: "approved",
    author: "Safety First Consultants",
    updatedAt: "2024-02-28",
    project: "Harbor Bridge",
    folder: "Safety"
  }
];

export const projectDocuments = documents;
