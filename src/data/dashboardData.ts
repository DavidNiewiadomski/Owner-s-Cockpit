
import { ReactNode } from 'react';

export interface Insight {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface ProgressItem {
  value: number;
  target: number;
  title: string;
  description: string;
}

export interface IntegrationItem {
  name: string;
  logo: string;
  description: string;
  connected: boolean;
  lastSync: string;
  items: number;
}

export const dashboardInsights: Insight[] = [
  {
    title: "Construction Progress",
    content: "Structural phase is 2 days ahead of schedule. Weather forecast shows clear conditions for the next 7 days.",
    type: "success"
  },
  {
    title: "Budget Alert",
    content: "Materials cost for electrical has exceeded estimates by 7%. Review procurement options.",
    type: "warning"
  },
  {
    title: "Permit Status",
    content: "Environmental clearance pending city approval. Expected by June 24.",
    type: "info"
  },
  {
    title: "Safety Incident",
    content: "Minor incident reported on level 3. Safety review scheduled for tomorrow.",
    type: "error"
  }
];

export const progressChartData: ProgressItem[] = [
  {
    value: 72,
    target: 100,
    title: "Construction Progress",
    description: "Overall completion percentage"
  }
];

export const integrationData: IntegrationItem = {
  name: "Procore",
  logo: "/procore-logo.svg",
  description: "Construction management platform",
  connected: true,
  lastSync: "2 hours ago",
  items: 147
};
