
import { Insight } from '@/data/investment/investmentData';

// Sample project data
export const projectData = [
  { name: 'East Tower', complete: 75, budget: 62, issues: 5, efficiency: 85 },
  { name: 'Westside Park', complete: 45, budget: 48, issues: 3, efficiency: 72 },
  { name: 'North Bridge', complete: 90, budget: 95, issues: 1, efficiency: 94 },
  { name: 'South Plaza', complete: 30, budget: 25, issues: 8, efficiency: 65 },
  { name: 'City Center', complete: 60, budget: 58, issues: 4, efficiency: 79 },
  { name: 'Harbor View', complete: 40, budget: 42, issues: 6, efficiency: 68 }
];

// Sample timeline data
export const timelineData = [
  { month: 'Jan', actual: 30, projected: 35, variance: -5 },
  { month: 'Feb', actual: 45, projected: 40, variance: 5 },
  { month: 'Mar', actual: 55, projected: 50, variance: 5 },
  { month: 'Apr', actual: 60, projected: 65, variance: -5 },
  { month: 'May', actual: 75, projected: 80, variance: -5 },
  { month: 'Jun', actual: 85, projected: 90, variance: -5 },
  { month: 'Jul', actual: 95, projected: 95, variance: 0 },
  { month: 'Aug', actual: 100, projected: 100, variance: 0 },
];

// Budget allocation data
export const budgetData = [
  { name: 'Materials', value: 45, fill: '#38bdf8' },
  { name: 'Labor', value: 30, fill: '#4ade80' },
  { name: 'Equipment', value: 15, fill: '#f43f5e' },
  { name: 'Permits', value: 5, fill: '#fb923c' },
  { name: 'Other', value: 5, fill: '#a855f7' },
];

// Project performance metrics
export const performanceData = [
  { subject: 'Efficiency', A: 85, B: 70, fullMark: 100 },
  { subject: 'Quality', A: 92, B: 85, fullMark: 100 },
  { subject: 'Timeline', A: 78, B: 65, fullMark: 100 },
  { subject: 'Budget', A: 80, B: 88, fullMark: 100 },
  { subject: 'Safety', A: 95, B: 90, fullMark: 100 },
  { subject: 'Sustainability', A: 75, B: 60, fullMark: 100 },
];

// Resource utilization data
export const resourceData = [
  { name: 'Week 1', planned: 40, actual: 38, capacity: 45 },
  { name: 'Week 2', planned: 35, actual: 32, capacity: 45 },
  { name: 'Week 3', planned: 42, actual: 43, capacity: 45 },
  { name: 'Week 4', planned: 38, actual: 40, capacity: 45 },
  { name: 'Week 5', planned: 40, actual: 39, capacity: 45 },
  { name: 'Week 6', planned: 35, actual: 37, capacity: 45 },
];

// Analysis periods
export const periods = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
];

// Analytics insights data
export const analyticsInsights: Insight[] = [
  { 
    type: "warning", 
    title: "Budget Alert", 
    content: "City Center project is 8% over budget allocation for Q3." 
  },
  { 
    type: "success", 
    title: "Efficiency Improved", 
    content: "North Bridge timeline efficiency increased by 15% this month." 
  },
  { 
    type: "info", 
    title: "Resource Trend", 
    content: "Equipment utilization is increasing - consider reallocation." 
  },
  { 
    type: "info", 
    title: "Pattern Detected", 
    content: "Material costs show consistent monthly increase of 3.2%." 
  }
];

// Chart colors
export const chartColors = {
  primary: '#38bdf8',
  secondary: '#4ade80',
  accent: '#f43f5e',
  warning: '#fb923c',
  info: '#a855f7',
  background: 'rgba(255, 255, 255, 0.05)',
  gridLine: 'rgba(255, 255, 255, 0.1)'
};

// Enhanced KPI Data to include all construction performance metrics
export const kpiData = [
  { title: 'Schedule Performance (SPI)', value: '1.05', trend: '+0.02', color: 'bg-blue-500', description: 'Planned vs earned value' },
  { title: 'Cost Performance (CPI)', value: '0.98', trend: '-0.01', color: 'bg-green-500', description: 'Earned value vs actual cost' },
  { title: 'On-Time Delivery', value: '87%', trend: '+3%', color: 'bg-purple-500', description: 'Milestones completed on time' },
  { title: 'Budget Variance', value: '-2.4%', trend: '+0.5%', color: 'bg-amber-500', description: 'Planned vs actual costs' },
  { title: 'Quality Defect Rate', value: '0.8%', trend: '-0.3%', color: 'bg-teal-500', description: 'Defects per unit of work' },
  { title: 'Safety Incident Rate', value: '0.27', trend: '-0.05', color: 'bg-red-500', description: 'Incidents per 10,000 hours' },
  { title: 'Customer Satisfaction', value: '4.6/5', trend: '+0.2', color: 'bg-indigo-500', description: 'From client feedback' },
  { title: 'Resource Utilization', value: '92%', trend: '+4%', color: 'bg-orange-500', description: 'Labor & equipment efficiency' }
];
