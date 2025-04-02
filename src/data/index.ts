
// Re-export all data from the separate files
import { propertyData } from './property/propertyData';
import { timelineEvents } from './timeline/timelineData';
import { documents, projectDocuments } from './documents/documentData';
import { projects, Project } from './projects/projectData';
import { notifications, dashboardInsights } from './notifications/notificationData';
import { integrationData, allIntegrations } from './integrations/integrationData';
import { progressChartData } from './charts/chartData';
import { financialData } from './financials/financialData';
import { 
  recentCommunications, 
  scheduledEvents, 
  communicationInsights,
  Communication,
  ScheduledEvent
} from './communications/communicationData';

// Export everything
export {
  propertyData,
  timelineEvents,
  documents,
  projectDocuments,
  projects,
  Project,
  notifications,
  dashboardInsights,
  integrationData,
  allIntegrations,
  progressChartData,
  financialData,
  recentCommunications,
  scheduledEvents,
  communicationInsights,
  Communication,
  ScheduledEvent
};
