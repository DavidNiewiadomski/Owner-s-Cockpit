
export const notifications = [
  {
    id: 1,
    title: "Critical RFP Response",
    message: "Arsenal-1 hyperscale manufacturing RFP responses due in 24 hours - $900M impact",
    time: "1 hour ago",
    read: false,
    priority: "high"
  },
  {
    id: 2,
    title: "Contract Approval Needed",
    message: "Quonset Point AUV plant construction contract pending - critical path item",
    time: "3 hours ago",
    read: false,
    priority: "high"
  },
  {
    id: 3,
    title: "Site Selection Update",
    message: "Greater-Boston expansion site assessment completed for Waltham location",
    time: "1 day ago",
    read: true,
    priority: "medium"
  }
];

export const dashboardInsights = [
  {
    title: "Critical Action Required: Arsenal-1 AHU-9 Filter System",
    content: "HVAC Zone 3 temperature sensor fault detected 2 minutes ago correlates with overdue AHU-9 filter replacement ($2,500). Manufacturing environment requires immediate attention - 94% probability of system failure within 72 hours. Approve maintenance now to prevent $15K emergency repair costs.",
    type: "warning" as const
  },
  {
    title: "BMS Alert Optimization: Fire Safety System Offline",
    content: "Atlanta Studio smoke detector offline on Floor 2 East Wing (15 min ago) requires immediate response. Cross-referencing with scheduled generator testing ($1,200) - coordinate repairs during planned maintenance window to minimize disruption and reduce contractor mobilization costs.",
    type: "warning" as const
  },
  {
    title: "Predictive Maintenance Success: Cost Bundling Opportunity",
    content: "Quonset Point elevator inspection ($3,200) and Arsenal-1 chiller cleaning ($1,800) can be scheduled simultaneously December 15-20. This bundling reduces contractor mobilization costs by 22% ($1,100 savings) while maintaining compliance schedules.",
    type: "success" as const
  },
  {
    title: "Space Analytics Drive Facility Optimization",
    content: "Occuspace data shows 23% food service increase trend correlating with Kadence Q1 2025 planning. Current facility ticket volume (8 critical, 15 high priority) suggests proactive restroom restocking contract negotiations could prevent 67% of supply-related tickets and save $45K annually.",
    type: "info" as const
  }
];
