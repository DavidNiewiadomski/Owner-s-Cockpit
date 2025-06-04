
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
    title: "Arsenal-1 Budget Alert - Critical Action Required",
    content: "Project is $2.4M over budget with 88% completion. Change orders CO-085 and CO-086 totaling $210K require immediate design team review to prevent further cost overruns.",
    type: "warning" as const
  },
  {
    title: "Quonset Point Schedule Recovery Opportunity",
    content: "Despite 22% progress vs. planned timeline, accelerated foundation work could recover 3 weeks. Generator testing and crane capacity upgrades are on critical path.",
    type: "info" as const
  },
  {
    title: "Facility Management Optimization Insight",
    content: "BMS data shows HVAC Zone 3 temperature faults correlating with Occuspace high-usage periods. Predictive maintenance on AHU-9 filters could prevent 18% of facility tickets.",
    type: "success" as const
  },
  {
    title: "Space Usage Analytics Drive Cost Savings",
    content: "Kadence planning data indicates 23% food service increase Q1 2025. Early restroom restocking contract negotiations could save $45K annually across all properties.",
    type: "success" as const
  }
];
