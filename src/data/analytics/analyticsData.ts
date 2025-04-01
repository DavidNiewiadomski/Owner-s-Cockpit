
// Analytics data

// Chart colors
export const chartColors = {
  primary: "#38bdf8",
  secondary: "#f87171",
  tertiary: "#4ade80",
  background: "#262626"
};

// Insights for analytics
export const analyticsInsights = [
  {
    title: "Schedule Progress",
    content: "Project timeline is ahead of schedule by 3 days for critical path tasks.",
    type: "success" as const
  },
  {
    title: "Budget Alert",
    content: "Material costs are 7% above projections for the quarter.",
    type: "warning" as const
  },
  {
    title: "Resource Usage",
    content: "Heavy equipment utilization is at 83%, up 12% from previous period.",
    type: "info" as const
  }
];

// KPI data
export const kpiData = [
  {
    title: "On-Time Completion",
    value: "92%",
    trend: "+4%",
    color: "bg-green-500",
    description: "Percentage of tasks completed on schedule"
  },
  {
    title: "Budget Variance",
    value: "-3%",
    trend: "+1%",
    color: "bg-green-500",
    description: "Current budget variance from projection"
  },
  {
    title: "Safety Incidents",
    value: "0",
    trend: "-2",
    color: "bg-green-500",
    description: "Reportable safety incidents this period"
  },
  {
    title: "Resource Efficiency",
    value: "87%",
    trend: "+5%",
    color: "bg-green-500",
    description: "Utilization of allocated resources"
  }
];

// Project data for analytics charts
export const projectData = {
  completed: 65,
  inProgress: 23,
  upcoming: 12,
  delayed: 8
};

// Timeline data
export const timelineData = [
  { name: 'Jan', planned: 10, actual: 8 },
  { name: 'Feb', planned: 20, actual: 22 },
  { name: 'Mar', planned: 30, actual: 35 },
  { name: 'Apr', planned: 45, actual: 48 },
  { name: 'May', planned: 60, actual: 57 },
  { name: 'Jun', planned: 75, actual: 78 },
  { name: 'Jul', planned: 90, actual: 87 }
];

// Budget data
export const budgetData = [
  { name: 'Labor', planned: 350000, actual: 340000 },
  { name: 'Materials', planned: 250000, actual: 280000 },
  { name: 'Equipment', planned: 150000, actual: 145000 },
  { name: 'Subcontractors', planned: 200000, actual: 210000 },
  { name: 'Other', planned: 50000, actual: 47000 }
];

// Resource data
export const resourceData = [
  { name: 'Crew A', allocated: 45, utilized: 42 },
  { name: 'Crew B', allocated: 35, utilized: 38 },
  { name: 'Crew C', allocated: 25, utilized: 22 },
  { name: 'Equipment', allocated: 60, utilized: 55 },
  { name: 'Materials', allocated: 85, utilized: 82 }
];

// Performance data
export const performanceData = [
  { name: 'Quality', score: 92, baseline: 85 },
  { name: 'Schedule', score: 88, baseline: 80 },
  { name: 'Budget', score: 78, baseline: 85 },
  { name: 'Safety', score: 95, baseline: 90 },
  { name: 'Client Satisfaction', score: 89, baseline: 85 }
];
