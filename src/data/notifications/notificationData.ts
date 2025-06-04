
export const notifications = [
  {
    id: 1,
    title: "Critical RFP Response",
    message: "Arsenal-1 hyperscale manufacturing RFP responses due in 24 hours - $15M impact",
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
    title: "Critical Contract Approval Bottleneck",
    content: "Quonset Point AUV plant construction contract ($8.5M) requires immediate approval. Delay could impact Q2 2024 production timeline and cascade to other facility launches.",
    type: "warning" as const
  },
  {
    title: "Arsenal-1 RFP Deadline Critical",
    content: "24 hours remaining for $15M hyperscale manufacturing facility RFP responses. Late submissions could delay groundbreaking by 6 weeks affecting production capacity targets.",
    type: "warning" as const
  },
  {
    title: "Facility Management Cost Optimization",
    content: "The Press HQ campus energy systems show 18% efficiency gains possible through HVAC upgrades. Estimated $120K annual savings across portfolio.",
    type: "info" as const
  },
  {
    title: "Site Selection Acceleration Opportunity",
    content: "South Coast Technology Center permitting fast-track option available. Additional $50K investment could reduce timeline by 8 weeks for Q3 construction start.",
    type: "success" as const
  }
];
