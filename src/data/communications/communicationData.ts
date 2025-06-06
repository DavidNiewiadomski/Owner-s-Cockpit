
export interface Communication {
  id: string;
  title: string;
  date: string;
  sender: string;
  recipient: string;
  type: "email" | "message" | "call" | "meeting" | "video" | "document";
  status: string;
  content: string;
  contact?: string;
  time?: string;
  project?: string;
}

export interface ScheduledEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "call" | "video" | "presentation" | "inspection" | "recurring";
  participants: string[];
  location: string;
  description: string;
  duration?: string;
  project?: string;
}

export const recentCommunications: Communication[] = [
  {
    id: "com-1",
    title: "Weekly Progress Update",
    date: "2024-03-15",
    sender: "Project Manager",
    recipient: "All Stakeholders",
    type: "email",
    status: "sent",
    content: "The project is progressing according to schedule. Foundation work is complete and structural steel is going up.",
    contact: "Project Manager",
    time: "10:30 AM",
    project: "East Tower"
  },
  {
    id: "com-2",
    title: "Budget Approval Request",
    date: "2024-03-12",
    sender: "Financial Director",
    recipient: "Owner",
    type: "document",
    status: "pending",
    content: "Requesting approval for additional $50K for unexpected soil remediation.",
    contact: "Financial Director",
    time: "2:15 PM",
    project: "Westside Park"
  },
  {
    id: "com-3",
    title: "Design Change Meeting",
    date: "2024-03-10",
    sender: "Lead Architect",
    recipient: "Design Team",
    type: "meeting",
    status: "completed",
    content: "Meeting to discuss facade material changes required due to supply chain issues.",
    contact: "Lead Architect",
    time: "3:00 PM",
    project: "East Tower"
  }
];

export const scheduledEvents: ScheduledEvent[] = [
  {
    id: "evt-1",
    title: "Weekly Progress Meeting",
    date: "2024-03-22",
    time: "10:00 AM",
    type: "recurring",
    participants: ["Project Manager", "Construction Lead", "Owner Rep"],
    location: "Construction Office",
    description: "Weekly update on project progress, issues, and upcoming work.",
    duration: "1 hour",
    project: "East Tower"
  },
  {
    id: "evt-2",
    title: "Stakeholder Presentation",
    date: "2024-04-05",
    time: "2:00 PM",
    type: "presentation",
    participants: ["Executive Team", "Investors", "Project Team"],
    location: "Virtual",
    description: "Quarterly presentation on project status, financials, and timeline.",
    duration: "2 hours",
    project: "All Projects"
  },
  {
    id: "evt-3",
    title: "Site Inspection",
    date: "2024-03-28",
    time: "9:00 AM",
    type: "inspection",
    participants: ["Building Inspector", "Project Manager", "Contractor"],
    location: "Construction Site",
    description: "Formal inspection of structural components before proceeding to next phase.",
    duration: "3 hours",
    project: "North Bridge"
  }
];

export const communicationInsights = [
  {
    title: "Response Times",
    content: "Average response time to critical issues has improved by 15% this month.",
    type: "success" as const
  },
  {
    title: "Stakeholder Engagement",
    content: "Owner involvement has increased by 23% compared to previous projects.",
    type: "info" as const
  },
  {
    title: "Communication Channels",
    content: "Email remains the most effective channel with 87% open rate for project updates.",
    type: "info" as const
  },
  {
    title: "Meeting Efficiency",
    content: "Progress meetings now average 30 minutes, down from 45 minutes last quarter.",
    type: "success" as const
  }
];
