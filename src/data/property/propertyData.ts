
export const propertyData = {
  propertyName: "Riverfront Tower",
  propertyType: "Mixed-Use Development",
  location: "123 Skyline Avenue, Downtown, CA",
  squareFootage: 450000,
  floors: 32,
  constructionStartDate: "March 15, 2022",
  estimatedCompletionDate: "June 30, 2024",
  currentPhase: "Construction",
  completionPercentage: 42,
  keyContacts: [
    {
      role: "Project Manager",
      name: "Sarah Johnson",
      contact: "sarah.j@example.com"
    },
    {
      role: "Lead Architect",
      name: "David Chen",
      contact: "david.c@example.com"
    },
    {
      role: "General Contractor",
      name: "BuildRight Inc.",
      contact: "info@buildright.com"
    }
  ],
  permits: [
    { 
      type: "Building Permit", 
      status: "approved" as const,
      date: "Jan 10, 2022" 
    },
    { 
      type: "Electrical Permit", 
      status: "approved" as const,
      date: "Feb 15, 2022" 
    },
    { 
      type: "Plumbing Permit", 
      status: "pending" as const,
      date: "Mar 20, 2022" 
    }
  ],
  inspections: [
    {
      type: "Foundation Inspection",
      status: "passed" as const,
      date: "Apr 5, 2022",
      notes: "Passed with no issues"
    },
    {
      type: "Framing Inspection",
      status: "scheduled" as const,
      date: "Apr 28, 2022"
    },
    {
      type: "Electrical Inspection",
      status: "not-scheduled" as const
    }
  ]
};
