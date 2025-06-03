
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
    content: "4 new RFPs received for East Tower project. AI analysis detected potential cost savings of 12% in electrical subcontracting bids.",
    type: "info" as const
  },
  {
    title: "Contract Approval Bottleneck",
    content: "18 contracts pending approval across portfolio. 6 are critical path items that may impact Q2 delivery timelines.",
    type: "warning" as const
  },
  {
    title: "Financial Forecast Update",
    content: "Q2 portfolio projection shows $342M total value with 8% above projected returns. Harbor Bridge contributing highest margin.",
    type: "success" as const
  },
  {
    title: "Project Pipeline Status",
    content: "2 projects moving from site selection to preconstruction phase. Resource allocation optimization recommended for Q3 starts.",
    type: "info" as const
  }
];
