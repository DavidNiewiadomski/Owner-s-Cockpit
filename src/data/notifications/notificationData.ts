
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
    title: "RFP Auto-Review Alert",
    content: "4 new RFPs received for East Tower project. AI analysis detected potential cost savings of 12% in electrical subcontracting bids. Review recommended within 48 hours.",
    type: "info" as const
  },
  {
    title: "Contract Approval Bottleneck",
    content: "18 contracts pending approval across portfolio. 6 are critical path items that may impact Q2 delivery timelines. Immediate action required.",
    type: "warning" as const
  },
  {
    title: "Financial Forecast Update",
    content: "Q2 portfolio projection shows $342M total value with 8% above projected returns. Harbor Bridge contributing highest margin at 15.2%.",
    type: "success" as const
  },
  {
    title: "Resource Optimization",
    content: "AI detected opportunity to reallocate 3 crane operators from completed phases to high-priority East Tower foundation work starting next week.",
    type: "info" as const
  }
];
