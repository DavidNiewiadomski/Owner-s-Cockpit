
import React from 'react';

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

export const timelineEvents = [
  {
    id: "1",
    title: "Foundation Complete",
    date: "March 12, 2024",
    description: "Foundation work completed ahead of schedule",
    status: "completed" as const,
    impact: "high" as const,
    financial: {
      amount: 15000,
      type: "under" as const
    },
    realityCapture: {
      available: true,
      date: "March 12, 2024",
      url: "https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-08/construction%20scan%20nav.jpg"
    }
  },
  {
    id: "2",
    title: "Structural Framework",
    date: "April 15, 2024",
    description: "Steel framework installation in progress",
    status: "in-progress" as const,
    realityCapture: {
      available: true,
      date: "April 10, 2024",
      url: "https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-11/scan-gallery/scn-construction-site-nav_0.jpg"
    }
  },
  {
    id: "3",
    title: "Equipment Delivery",
    date: "April 25, 2024",
    description: "Elevator equipment delivery scheduled",
    status: "upcoming" as const
  },
  {
    id: "4",
    title: "Window Installation",
    date: "May 1, 2024",
    description: "Custom window delivery delayed by supplier",
    status: "delayed" as const,
    impact: "medium" as const,
    financial: {
      amount: 12000,
      type: "over" as const
    }
  }
];

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

export const notifications = [
  {
    id: 1,
    title: "Budget Adjustment",
    message: "Budget increase of $250K approved for electrical work",
    time: "1 hour ago",
    read: false,
    priority: "high"
  },
  {
    id: 2,
    title: "New Document",
    message: "Updated floor plans uploaded by Smith Architects",
    time: "3 hours ago",
    read: true,
    priority: "medium"
  },
  {
    id: 3,
    title: "Schedule Change",
    message: "Roofing work rescheduled to next week due to weather",
    time: "1 day ago",
    read: false,
    priority: "high"
  }
];

export const integrationData = {
  name: "Procore",
  logo: "https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiQXUP0vpS-5-_2MW5XLBCraizY5UVA8RWm6sD6I8IAzpiAMFcBkQI",
  description: "Construction management platform",
  connected: true,
  category: "Project Management",
  onToggle: () => console.log("Toggled Procore integration")
};

export const progressChartData = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 28 },
  { name: 'Mar', value: 35 },
  { name: 'Apr', value: 42 },
  { name: 'May', value: 50 },
  { name: 'Jun', value: 58 },
  { name: 'Jul', value: 65 },
];

export const dashboardInsights = [
  {
    title: "Schedule Update",
    content: "Foundation work is ahead of schedule by 3 days.",
    type: "success" as const
  },
  {
    title: "Budget Alert",
    content: "Electrical subcontractor costs are 5% over projections.",
    type: "warning" as const
  },
  {
    title: "Weather Impact",
    content: "Incoming storm system may affect exterior work next week.",
    type: "info" as const
  },
  {
    title: "Material Delay",
    content: "Custom glass panels shipment delayed by 2 weeks.",
    type: "warning" as const
  }
];

export const financialData = {
  projectName: "All Projects",
  totalBudget: 85000000,
  spending: [
    { category: "Labor", amount: 15000000, color: "#38bdf8", status: "normal" as const },
    { category: "Materials", amount: 12000000, color: "#4ade80", status: "normal" as const },
    { category: "Equipment", amount: 8700000, color: "#f87171", status: "normal" as const }
  ],
  changeOrders: [
    { id: "CO-001", description: "Foundation expansion", amount: 450000, status: "approved" as const, date: "2024-02-15" },
    { id: "CO-002", description: "Electrical upgrades", amount: 800000, status: "approved" as const, date: "2024-03-22" }
  ]
};
