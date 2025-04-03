
// Re-export all data from the separate files
import { propertyData } from './property/propertyData';
import { timelineEvents } from './timeline/timelineData';
import { documents, projectDocuments } from './documents/documentData';
import { projects } from './projects/projectData';
import { notifications, dashboardInsights } from './notifications/notificationData';
import { integrationData, allIntegrations } from './integrations/integrationData';
import { progressChartData } from './charts/chartData';
import { financialData } from './financials/financialData';
import { 
  recentCommunications, 
  scheduledEvents, 
  communicationInsights
} from './communications/communicationData';
import {
  contracts,
  insurances,
  contractMilestones,
  getContractsByProject,
  getInsurancesByProject,
  getMilestonesByContract
} from './contracts/contractsData';

// Import types
import type { Project } from './projects/projectData';
import type { 
  Communication,
  ScheduledEvent
} from './communications/communicationData';
import type {
  Contract,
  Insurance,
  ContractMilestone
} from './contracts/types';

// Export data
export {
  propertyData,
  timelineEvents,
  documents,
  projectDocuments,
  projects,
  notifications,
  dashboardInsights,
  integrationData,
  allIntegrations,
  progressChartData,
  financialData,
  recentCommunications,
  scheduledEvents,
  communicationInsights,
  contracts,
  insurances,
  contractMilestones,
  getContractsByProject,
  getInsurancesByProject,
  getMilestonesByContract
};

// Export types
export type { Project, Communication, ScheduledEvent, Contract, Insurance, ContractMilestone };
