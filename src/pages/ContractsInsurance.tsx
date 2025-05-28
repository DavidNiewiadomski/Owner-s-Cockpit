
import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContractsHeader } from '@/components/contracts/ContractsHeader';
import { ContractsPageTabs } from '@/components/contracts/ContractsPageTabs';
import { 
  getContractsByProject, 
  getInsurancesByProject, 
  getMilestonesByProject 
} from '@/data/contracts/contractUtils';
import { useProject } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';

export default function ContractsInsurance() {
  const [activeTab, setActiveTab] = useState('contracts');
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  const { toast } = useToast();
  
  // Use 'all' as default to show all data when no project is selected
  const projectFilter = selectedProject?.title || 'all';
  const projectName = selectedProject?.title || 'All Projects';
  
  // Get data based on active project with error handling
  const [projectContracts, setProjectContracts] = useState([]);
  const [projectInsurances, setProjectInsurances] = useState([]);
  const [projectMilestones, setProjectMilestones] = useState([]);
  
  useEffect(() => {
    try {
      console.log('Loading contracts data for project:', projectFilter);
      
      // Get contracts
      const contracts = getContractsByProject(projectFilter);
      console.log('Loaded contracts:', contracts.length);
      setProjectContracts(contracts);
      
      // Get insurances
      const insurances = getInsurancesByProject(projectFilter);
      console.log('Loaded insurances:', insurances.length);
      setProjectInsurances(insurances);
      
      // Get milestones for the project
      const milestones = getMilestonesByProject(projectFilter);
      console.log('Loaded milestones:', milestones.length);
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
  }, [projectFilter, toast]);
  
  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <ScrollArea className="flex-1">
          <main className="container mx-auto py-6 px-4 md:px-6">
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
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
