
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ContractsHeader } from '@/components/contracts/ContractsHeader';
import { ContractsPageTabs } from '@/components/contracts/ContractsPageTabs';
import { 
  getContractsByProject, 
  getInsurancesByProject, 
  getMilestonesByContract 
} from '@/data/contracts/contractsData';
import { useProject } from '@/contexts/ProjectContext';

export default function ContractsInsurance() {
  const [activeTab, setActiveTab] = useState('contracts');
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  
  // Handle case when selectedProject is null by defaulting to 'all'
  const projectId = selectedProject?.id || 'all';
  const projectName = selectedProject?.title || 'All Projects';
  
  // Get data based on active project, using the safe project ID
  const projectContracts = getContractsByProject(projectId);
  const projectInsurances = getInsurancesByProject(projectId);
  
  // Get all milestones for the current project's contracts
  const projectMilestones = projectContracts.flatMap(contract => 
    getMilestonesByContract(contract.id)
  );
  
  return (
    <DashboardLayout projectContext="Contracts & Insurance" projectName={projectName}>
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
