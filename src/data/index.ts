
// Re-export all data from the separate files
import { propertyData } from './property/propertyData';
import { timelineEvents } from './timeline/timelineData';
import { documents, projectDocuments } from './documents/documentData';
import { projects } from './projects/projectData';
import { notifications, dashboardInsights } from './notifications/notificationData';
// import { integrationData, allIntegrations } from './integrations/integrationData'; // Removed import
import { progressChartData } from './charts/chartData';
// financialData import changed to changeOrders
import { changeOrders } from './financials/financialData'; 
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
import {
  designPlansData,
  siteAssessmentsData,
  permitsData,
  approvalsTimeline,
  budgetEstimatesData,
  budgetCategoryData,
  budgetRisksData
} from './preconstruction/preconstructionData';

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
  // integrationData, // Removed re-export
  // allIntegrations, // Removed re-export
  progressChartData,
  changeOrders, // financialData changed to changeOrders
  recentCommunications,
  scheduledEvents,
  communicationInsights,
  contracts,
  insurances,
  contractMilestones,
  getContractsByProject,
  getInsurancesByProject,
  getMilestonesByContract,
  // Preconstruction data
  designPlansData,
  siteAssessmentsData,
  permitsData,
  approvalsTimeline,
  budgetEstimatesData,
  // budgetCategoryData removed from re-export
  // budgetCategoryData removed from re-export
  budgetRisksData
};

// Export types
export type { Project, Communication, ScheduledEvent, Contract, Insurance, ContractMilestone };
