
// Analytics data

// Chart colors with all required properties
export const chartColors = {
  primary: "#38bdf8",
  secondary: "#f87171",
  accent: "#4ade80",
  warning: "#fbbf24",
  info: "#60a5fa",
  background: "#262626",
  gridLine: "#1e293b"
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

// Project data for analytics charts formatted as an array
export const projectData = [
  { name: "Project A", complete: 65, budget: 70, issues: 3, efficiency: 88 },
  { name: "Project B", complete: 48, budget: 52, issues: 5, efficiency: 76 },
  { name: "Project C", complete: 72, budget: 68, issues: 2, efficiency: 92 },
  { name: "Project D", complete: 35, budget: 40, issues: 7, efficiency: 65 }
];

// Timeline data with required properties
export const timelineData = [
  { month: 'Jan', actual: 8, projected: 10, variance: -2 },
  { month: 'Feb', actual: 22, projected: 20, variance: 2 },
  { month: 'Mar', actual: 35, projected: 30, variance: 5 },
  { month: 'Apr', actual: 48, projected: 45, variance: 3 },
  { month: 'May', actual: 57, projected: 60, variance: -3 },
  { month: 'Jun', actual: 78, projected: 75, variance: 3 },
  { month: 'Jul', actual: 87, projected: 90, variance: -3 }
];

// Budget data with value and fill properties
export const budgetData = [
  { name: 'Labor', value: 35, fill: '#38bdf8' },
  { name: 'Materials', value: 25, fill: '#f87171' },
  { name: 'Equipment', value: 15, fill: '#4ade80' },
  { name: 'Subcontractors', value: 20, fill: '#a855f7' },
  { name: 'Other', value: 5, fill: '#fbbf24' }
];

// Resource data with capacity
export const resourceData = [
  { name: 'Crew A', planned: 45, actual: 42, capacity: 50 },
  { name: 'Crew B', planned: 35, actual: 38, capacity: 40 },
  { name: 'Crew C', planned: 25, actual: 22, capacity: 30 },
  { name: 'Equipment', planned: 60, actual: 55, capacity: 65 },
  { name: 'Materials', planned: 85, actual: 82, capacity: 90 }
];

// Performance data with required properties
export const performanceData = [
  { subject: 'Quality', A: 92, B: 85, fullMark: 100 },
  { subject: 'Schedule', A: 88, B: 80, fullMark: 100 },
  { subject: 'Budget', A: 78, B: 85, fullMark: 100 },
  { subject: 'Safety', A: 95, B: 90, fullMark: 100 },
  { subject: 'Client Satisfaction', A: 89, B: 85, fullMark: 100 }
];
