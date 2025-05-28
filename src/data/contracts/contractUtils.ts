
import { contracts } from './contractData';
import { insurances } from './insuranceData';
import { contractMilestones } from './milestoneData';
import { Contract, Insurance, ContractMilestone } from './types';

// Filter contracts by project
export const getContractsByProject = (projectId: string): Contract[] => {
  if (projectId === 'all') {
    return contracts;
  }
  
  // Handle project filtering by project name or ID
  return contracts.filter(contract => 
    contract.project === projectId || 
    contract.project.toLowerCase().includes(projectId.toLowerCase())
  );
};

// Filter insurance by project
export const getInsurancesByProject = (projectId: string): Insurance[] => {
  if (projectId === 'all') {
    return insurances;
  }
  
  // Handle project filtering by project name or ID
  return insurances.filter(insurance => 
    insurance.project === projectId || 
    insurance.project.toLowerCase().includes(projectId.toLowerCase()) ||
    insurance.project === 'All Projects'
  );
};

// Get milestones for specific contracts
export const getMilestonesByContract = (contractId: string): ContractMilestone[] => {
  return contractMilestones.filter(milestone => milestone.contractId === contractId);
};

// Get milestones for multiple contracts
export const getMilestonesByContracts = (contractIds: string[]): ContractMilestone[] => {
  return contractMilestones.filter(milestone => contractIds.includes(milestone.contractId));
};

// Get all milestones for contracts in a project
export const getMilestonesByProject = (projectId: string): ContractMilestone[] => {
  const projectContracts = getContractsByProject(projectId);
  const contractIds = projectContracts.map(contract => contract.id);
  return getMilestonesByContracts(contractIds);
};

// Get contract by ID
export const getContractById = (contractId: string): Contract | undefined => {
  return contracts.find(contract => contract.id === contractId);
};

// Get insurance by ID
export const getInsuranceById = (insuranceId: string): Insurance | undefined => {
  return insurances.find(insurance => insurance.id === insuranceId);
};
