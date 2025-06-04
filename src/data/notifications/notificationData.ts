

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
    title: "Critical Construction Risk: Arsenal-1 Schedule Impact",
    content: "Arsenal-1 project showing red budget health with 8 change orders valued at $210K total. Current 88% completion with final systems installation phase at risk. BMS HVAC Zone 3 temperature sensor fault directly impacts manufacturing environment certification. Immediate action required to prevent $2.3M delay penalty and maintain March 2025 delivery.",
    type: "warning" as const
  },
  {
    title: "Facilities Alert Correlation: Fire Safety & Generator Testing",
    content: "Atlanta Studio smoke detector offline (Floor 2 East Wing) correlates with scheduled generator testing ($1,200). Cross-facility analysis shows 15 high-priority tickets could be reduced by 40% through coordinated maintenance scheduling. Recommend bundling fire safety repairs with planned power system maintenance window.",
    type: "warning" as const
  },
  {
    title: "Construction Cost Optimization: Multi-Site Procurement",
    content: "Quonset Point elevator inspection ($3,200) and Arsenal-1 chiller maintenance ($1,800) present 22% cost reduction opportunity through vendor consolidation. Construction schedule analysis shows December 15-20 optimal window aligns with both project timelines. Potential $1,100 savings in mobilization costs.",
    type: "success" as const
  },
  {
    title: "Integrated Analytics: Space Planning Drives Construction Decisions",
    content: "Occuspace data shows 23% food service increase trend at Atlanta Studio influencing Quonset Point cafeteria design specifications. Current construction change order CO-087 ($45K soundproofing) validated by space utilization patterns. Kadence planning data suggests 67% reduction in future facility tickets through proactive design integration.",
    type: "info" as const
  }
];

