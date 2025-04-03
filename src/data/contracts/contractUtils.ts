
import { contracts } from './contractData';
import { insurances } from './insuranceData';
import { contractMilestones } from './milestoneData';

// Get contracts by project ID
export const getContractsByProject = (projectId: string | undefined | null) => {
  // Default to 'all' if projectId is undefined or null
  if (!projectId || projectId === 'all') {
    return contracts;
  }
  return contracts.filter(contract => {
    const projectMap: Record<string, string> = {
      '1': 'Riverfront Tower',
      '2': 'Westview Residences',
      '3': 'Harbor Bridge'
    };
    return contract.project === projectMap[projectId];
  });
};

// Get insurances by project ID
export const getInsurancesByProject = (projectId: string | undefined | null) => {
  // Default to 'all' if projectId is undefined or null
  if (!projectId || projectId === 'all') {
    return insurances;
  }
  return insurances.filter(insurance => {
    const projectMap: Record<string, string> = {
      '1': 'Riverfront Tower',
      '2': 'Westview Residences',
      '3': 'Harbor Bridge'
    };
    return insurance.project === projectMap[projectId] || insurance.project === 'All Projects';
  });
};

// Get milestones by contract ID
export const getMilestonesByContract = (contractId: string) => {
  return contractMilestones.filter(milestone => milestone.contractId === contractId);
};
