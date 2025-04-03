
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ContractsHeader } from '@/components/contracts/ContractsHeader';
import { ContractsPageTabs } from '@/components/contracts/ContractsPageTabs';
import { 
  contracts, 
  contractMilestones, 
  insurances, 
  getContractsByProject, 
  getInsurancesByProject, 
  getMilestonesByContract 
} from '@/data/contracts/contractsData';
import { useProject } from '@/contexts/ProjectContext';

export default function ContractsInsurance() {
  const [activeTab, setActiveTab] = useState('contracts');
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  
  // Get data based on active project
  const projectContracts = getContractsByProject(selectedProject.id);
  const projectInsurances = getInsurancesByProject(selectedProject.id);
  
  // Get all milestones for the current project's contracts
  const projectMilestones = projectContracts.flatMap(contract => 
    getMilestonesByContract(contract.id)
  );
  
  return (
    <DashboardLayout projectContext="Contracts & Insurance" projectName={selectedProject.title}>
      <div className="max-w-7xl mx-auto">
        <ContractsHeader activeTab={activeTab} />
        
        <div className="mt-8">
          <ContractsPageTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            contracts={projectContracts}
            milestones={projectMilestones}
            insurances={projectInsurances}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
