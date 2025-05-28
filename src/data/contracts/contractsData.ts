
// Re-export types and data from separate files
export * from './types';
export * from './contractData';
export * from './insuranceData';
export * from './milestoneData';
export * from './contractUtils';

// Direct re-exports for clarity
export { contracts } from './contractData';
export { insurances } from './insuranceData';
export { contractMilestones } from './milestoneData';
export { 
  getContractsByProject, 
  getInsurancesByProject, 
  getMilestonesByProject,
  getMilestonesByContract,
  getMilestonesByContracts,
  getContractById,
  getInsuranceById
} from './contractUtils';
