
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ContractsHeader } from '@/components/contracts/ContractsHeader';
import { ContractsPageTabs } from '@/components/contracts/ContractsPageTabs';
import { 
  getContractsByProject, 
  getInsurancesByProject, 
  getMilestonesByContract 
} from '@/data/contracts/contractsData';
import { useProject } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';

export default function ContractsInsurance() {
  const [activeTab, setActiveTab] = useState('contracts');
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  const { toast } = useToast();
  
  // Safe default values
  const projectId = selectedProject?.id || 'all';
  const projectName = selectedProject?.title || 'All Projects';
  
  // Get data based on active project with error handling
  const [projectContracts, setProjectContracts] = useState([]);
  const [projectInsurances, setProjectInsurances] = useState([]);
  const [projectMilestones, setProjectMilestones] = useState([]);
  
  useEffect(() => {
    try {
      // Use a safe projectId
      const safeProjectId = projectId || 'all';
      
      // Get contracts
      const contracts = getContractsByProject(safeProjectId);
      setProjectContracts(contracts);
      
      // Get insurances
      const insurances = getInsurancesByProject(safeProjectId);
      setProjectInsurances(insurances);
      
      // Get milestones for all contracts
      const milestones = contracts.flatMap(contract => 
        getMilestonesByContract(contract.id)
      );
      setProjectMilestones(milestones);
    } catch (error) {
      console.error("Error loading contracts data:", error);
      toast({
        title: "Error loading data",
        description: "There was a problem loading the contracts and insurance data. Please try again.",
        variant: "destructive"
      });
      
      // Set empty arrays as fallback
      setProjectContracts([]);
      setProjectInsurances([]);
      setProjectMilestones([]);
    }
  }, [projectId, toast]);
  
  return (
    <DashboardLayout 
      projectContext="Contracts & Insurance" 
      projectName={projectName}
      initialInsights={[]} // Passing empty array to prevent DashboardLayout from showing its own CollapsibleAIAssistant
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <ContractsHeader activeTab={activeTab} />
        </div>
        
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
