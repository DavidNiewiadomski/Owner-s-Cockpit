
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
