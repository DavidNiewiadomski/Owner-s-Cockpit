
// Analytics data organized by time period

// Chart colors with all required properties (same across periods)
export const chartColors = {
  primary: "#38bdf8",
  secondary: "#f87171",
  accent: "#4ade80",
  warning: "#fbbf24",
  info: "#60a5fa",
  background: "#262626",
  gridLine: "#1e293b"
};

// Generate period-specific KPI data
export const generateKpiData = (period: string) => {
  // Base values that will be modified based on period
  const baseData = [
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

  // Modify data based on period
  switch (period) {
    case 'weekly':
      return [
        { ...baseData[0], value: "89%", trend: "+2%" },
        { ...baseData[1], value: "-1%", trend: "+0.5%" },
        { ...baseData[2], value: "0", trend: "0" },
        { ...baseData[3], value: "83%", trend: "+3%" },
      ];
    case 'monthly':
      return baseData; // Keep the original data for monthly
    case 'quarterly':
      return [
        { ...baseData[0], value: "94%", trend: "+6%" },
        { ...baseData[1], value: "-4%", trend: "+2%" },
        { ...baseData[2], value: "1", trend: "-1" },
        { ...baseData[3], value: "90%", trend: "+7%" },
      ];
    case 'yearly':
      return [
        { ...baseData[0], value: "96%", trend: "+8%" },
        { ...baseData[1], value: "-5%", trend: "+3%" },
        { ...baseData[2], value: "3", trend: "-5" },
        { ...baseData[3], value: "92%", trend: "+9%" },
      ];
    default:
      return baseData;
  }
};

// Generate period-specific project data
export const generateProjectData = (period: string) => {
  // Base project data
  const baseData = [
    { name: "Project A", complete: 65, budget: 70, issues: 3, efficiency: 88 },
    { name: "Project B", complete: 48, budget: 52, issues: 5, efficiency: 76 },
    { name: "Project C", complete: 72, budget: 68, issues: 2, efficiency: 92 },
    { name: "Project D", complete: 35, budget: 40, issues: 7, efficiency: 65 }
  ];

  // Modify data based on period
  switch (period) {
    case 'weekly':
      return [
        { ...baseData[0], complete: 62, budget: 68, issues: 2, efficiency: 85 },
        { ...baseData[1], complete: 45, budget: 50, issues: 4, efficiency: 74 },
        { ...baseData[2], complete: 70, budget: 67, issues: 1, efficiency: 90 },
        { ...baseData[3], complete: 32, budget: 38, issues: 6, efficiency: 62 }
      ];
    case 'monthly':
      return baseData; // Keep the original data for monthly
    case 'quarterly':
      return [
        { ...baseData[0], complete: 75, budget: 72, issues: 5, efficiency: 91 },
        { ...baseData[1], complete: 58, budget: 54, issues: 7, efficiency: 79 },
        { ...baseData[2], complete: 82, budget: 70, issues: 3, efficiency: 94 },
        { ...baseData[3], complete: 45, budget: 42, issues: 9, efficiency: 70 }
      ];
    case 'yearly':
      return [
        { ...baseData[0], complete: 90, budget: 85, issues: 7, efficiency: 95 },
        { ...baseData[1], complete: 85, budget: 80, issues: 10, efficiency: 88 },
        { ...baseData[2], complete: 95, budget: 90, issues: 5, efficiency: 98 },
        { ...baseData[3], complete: 75, budget: 70, issues: 12, efficiency: 85 }
      ];
    default:
      return baseData;
  }
};

// Generate period-specific timeline data
export const generateTimelineData = (period: string) => {
  // Base timeline data
  const baseData = [
    { month: 'Jan', actual: 8, projected: 10, variance: -2 },
    { month: 'Feb', actual: 22, projected: 20, variance: 2 },
    { month: 'Mar', actual: 35, projected: 30, variance: 5 },
    { month: 'Apr', actual: 48, projected: 45, variance: 3 },
    { month: 'May', actual: 57, projected: 60, variance: -3 },
    { month: 'Jun', actual: 78, projected: 75, variance: 3 },
    { month: 'Jul', actual: 87, projected: 90, variance: -3 }
  ];

  // Weekly data with day labels
  const weeklyData = [
    { month: 'Mon', actual: 12, projected: 15, variance: -3 },
    { month: 'Tue', actual: 28, projected: 25, variance: 3 },
    { month: 'Wed', actual: 45, projected: 40, variance: 5 },
    { month: 'Thu', actual: 62, projected: 65, variance: -3 },
    { month: 'Fri', actual: 80, projected: 75, variance: 5 },
    { month: 'Sat', actual: 88, projected: 85, variance: 3 },
    { month: 'Sun', actual: 90, projected: 95, variance: -5 }
  ];

  // Quarterly data
  const quarterlyData = [
    { month: 'Q1 2023', actual: 25, projected: 30, variance: -5 },
    { month: 'Q2 2023', actual: 55, projected: 50, variance: 5 },
    { month: 'Q3 2023', actual: 78, projected: 75, variance: 3 },
    { month: 'Q4 2023', actual: 92, projected: 95, variance: -3 },
    { month: 'Q1 2024', actual: 30, projected: 35, variance: -5 }
  ];

  // Yearly data
  const yearlyData = [
    { month: '2020', actual: 60, projected: 65, variance: -5 },
    { month: '2021', actual: 72, projected: 70, variance: 2 },
    { month: '2022', actual: 85, projected: 80, variance: 5 },
    { month: '2023', actual: 92, projected: 95, variance: -3 },
    { month: '2024', actual: 35, projected: 40, variance: -5 },
  ];

  switch (period) {
    case 'weekly':
      return weeklyData;
    case 'monthly':
      return baseData;
    case 'quarterly':
      return quarterlyData;
    case 'yearly':
      return yearlyData;
    default:
      return baseData;
  }
};

// Generate period-specific budget data
export const generateBudgetData = (period: string) => {
  // Base budget data (mostly consistent across periods)
  const baseData = [
    { name: 'Labor', value: 35, fill: '#38bdf8' },
    { name: 'Materials', value: 25, fill: '#f87171' },
    { name: 'Equipment', value: 15, fill: '#4ade80' },
    { name: 'Subcontractors', value: 20, fill: '#a855f7' },
    { name: 'Other', value: 5, fill: '#fbbf24' }
  ];

  // Minor variations by period
  switch (period) {
    case 'weekly':
      return [
        { ...baseData[0], value: 32 },
        { ...baseData[1], value: 28 },
        { ...baseData[2], value: 16 },
        { ...baseData[3], value: 18 },
        { ...baseData[4], value: 6 },
      ];
    case 'monthly':
      return baseData;
    case 'quarterly':
      return [
        { ...baseData[0], value: 36 },
        { ...baseData[1], value: 24 },
        { ...baseData[2], value: 14 },
        { ...baseData[3], value: 21 },
        { ...baseData[4], value: 5 },
      ];
    case 'yearly':
      return [
        { ...baseData[0], value: 38 },
        { ...baseData[1], value: 22 },
        { ...baseData[2], value: 15 },
        { ...baseData[3], value: 20 },
        { ...baseData[4], value: 5 },
      ];
    default:
      return baseData;
  }
};

// Generate period-specific resource data
export const generateResourceData = (period: string) => {
  // Base resource data
  const baseData = [
    { name: 'Crew A', planned: 45, actual: 42, capacity: 50 },
    { name: 'Crew B', planned: 35, actual: 38, capacity: 40 },
    { name: 'Crew C', planned: 25, actual: 22, capacity: 30 },
    { name: 'Equipment', planned: 60, actual: 55, capacity: 65 },
    { name: 'Materials', planned: 85, actual: 82, capacity: 90 }
  ];

  // Variations by period
  switch (period) {
    case 'weekly':
      return [
        { ...baseData[0], planned: 42, actual: 40 },
        { ...baseData[1], planned: 32, actual: 35 },
        { ...baseData[2], planned: 22, actual: 20 },
        { ...baseData[3], planned: 58, actual: 52 },
        { ...baseData[4], planned: 82, actual: 80 }
      ];
    case 'monthly':
      return baseData;
    case 'quarterly':
      return [
        { ...baseData[0], planned: 47, actual: 45 },
        { ...baseData[1], planned: 37, actual: 40 },
        { ...baseData[2], planned: 27, actual: 24 },
        { ...baseData[3], planned: 62, actual: 58 },
        { ...baseData[4], planned: 87, actual: 85 }
      ];
    case 'yearly':
      return [
        { ...baseData[0], planned: 48, actual: 47 },
        { ...baseData[1], planned: 38, actual: 42 },
        { ...baseData[2], planned: 28, actual: 26 },
        { ...baseData[3], planned: 63, actual: 60 },
        { ...baseData[4], planned: 88, actual: 87 }
      ];
    default:
      return baseData;
  }
};

// Generate period-specific performance data
export const generatePerformanceData = (period: string) => {
  // Base performance data
  const baseData = [
    { subject: 'Quality', A: 92, B: 85, fullMark: 100 },
    { subject: 'Schedule', A: 88, B: 80, fullMark: 100 },
    { subject: 'Budget', A: 78, B: 85, fullMark: 100 },
    { subject: 'Safety', A: 95, B: 90, fullMark: 100 },
    { subject: 'Client Satisfaction', A: 89, B: 85, fullMark: 100 }
  ];

  // Variations by period
  switch (period) {
    case 'weekly':
      return [
        { ...baseData[0], A: 90, B: 83 },
        { ...baseData[1], A: 85, B: 78 },
        { ...baseData[2], A: 75, B: 82 },
        { ...baseData[3], A: 93, B: 88 },
        { ...baseData[4], A: 87, B: 83 }
      ];
    case 'monthly':
      return baseData;
    case 'quarterly':
      return [
        { ...baseData[0], A: 94, B: 87 },
        { ...baseData[1], A: 90, B: 82 },
        { ...baseData[2], A: 80, B: 87 },
        { ...baseData[3], A: 97, B: 92 },
        { ...baseData[4], A: 91, B: 87 }
      ];
    case 'yearly':
      return [
        { ...baseData[0], A: 96, B: 90 },
        { ...baseData[1], A: 92, B: 85 },
        { ...baseData[2], A: 82, B: 88 },
        { ...baseData[3], A: 98, B: 95 },
        { ...baseData[4], A: 93, B: 90 }
      ];
    default:
      return baseData;
  }
};

// Generate period-specific insights
export const generateInsights = (period: string) => {
  // Base insights
  const baseInsights = [
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

  // Variations by period
  switch (period) {
    case 'weekly':
      return [
        {
          title: "Schedule Progress",
          content: "Project timeline is ahead of schedule by 1 day for critical path tasks.",
          type: "success" as const
        },
        {
          title: "Budget Alert",
          content: "Material costs are 5% above projections for this week.",
          type: "warning" as const
        },
        {
          title: "Resource Usage",
          content: "Heavy equipment utilization is at 80%, up 5% from previous week.",
          type: "info" as const
        }
      ];
    case 'monthly':
      return baseInsights;
    case 'quarterly':
      return [
        {
          title: "Schedule Progress",
          content: "Project timeline is ahead of schedule by 8 days for critical path tasks.",
          type: "success" as const
        },
        {
          title: "Budget Alert",
          content: "Material costs are 9% above projections for the quarter.",
          type: "warning" as const
        },
        {
          title: "Resource Usage",
          content: "Heavy equipment utilization is at 87%, up 15% from previous quarter.",
          type: "info" as const
        }
      ];
    case 'yearly':
      return [
        {
          title: "Schedule Progress",
          content: "Project timeline is ahead of schedule by 14 days for critical path tasks.",
          type: "success" as const
        },
        {
          title: "Budget Alert",
          content: "Material costs are 12% above projections for the year.",
          type: "warning" as const
        },
        {
          title: "Resource Usage",
          content: "Heavy equipment utilization is at 90%, up 18% from previous year.",
          type: "info" as const
        }
      ];
    default:
      return baseInsights;
  }
};
