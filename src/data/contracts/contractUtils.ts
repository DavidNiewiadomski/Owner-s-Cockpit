
import { contracts } from './contractData';
import { insurances } from './insuranceData';
import { contractMilestones } from './milestoneData';

// Get contracts by project ID
export const getContractsByProject = (projectId: string) => {
  if (projectId === 'all') {
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
export const getInsurancesByProject = (projectId: string) => {
  if (projectId === 'all') {
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
