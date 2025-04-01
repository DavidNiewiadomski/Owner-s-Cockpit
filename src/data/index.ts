
// Re-export all data from the separate files
import { propertyData } from './property/propertyData';
import { timelineEvents } from './timeline/timelineEvents';
import { documents, projectDocuments } from './documents/documentData';
import { projects } from './projects/projectData';
import { notifications, dashboardInsights } from './notifications/notificationData';
import { integrationData } from './integrations/integrationData';
import { progressChartData } from './charts/chartData';
import { financialData } from './financials/financialData';

// Export everything
export {
  propertyData,
  timelineEvents,
  documents,
  projectDocuments,
  projects,
  notifications,
  dashboardInsights,
  integrationData,
  progressChartData,
  financialData
};
