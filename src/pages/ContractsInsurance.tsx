
import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ContractsHeader } from '@/components/contracts/ContractsHeader';
import { ContractsPageTabs } from '@/components/contracts/ContractsPageTabs';
// getContractsByProject removed, getInsurancesByProject and getMilestonesByContract kept for now
import { 
  getInsurancesByProject, 
  getMilestonesByContract 
} from '@/data/contracts/contractsData';
import { getContracts } from '@/services/dataService'; // Import from dataService
import type { Contract as SupabaseContract } from '@/lib/supabase'; // Import Supabase Contract type
import { useProject } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react'; // For loading state

export default function ContractsInsurance() {
  const [activeTab, setActiveTab] = useState('contracts');
  const [searchTerm, setSearchTerm] = useState(''); // Search term not used in this refactor but kept
  const { selectedProject } = useProject();
  const { toast } = useToast();
  
  const projectId = selectedProject?.id; // Can be undefined if "All Projects"
  const projectName = selectedProject?.title || 'All Projects';
  
  const [projectContracts, setProjectContracts] = useState<SupabaseContract[]>([]);
  const [projectInsurances, setProjectInsurances] = useState([]); // Keep using local data for now
  const [projectMilestones, setProjectMilestones] = useState([]); // Keep using local data for now
  const [loadingContracts, setLoadingContracts] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      setLoadingContracts(true);
      try {
        // Fetch Supabase contracts. Pass undefined if projectId is 'all' or not set.
        const contractsData = await getContracts(projectId === 'all' ? undefined : projectId);
        setProjectContracts(contractsData);
        
        // Keep existing logic for insurances and milestones using local data
        const safeProjectIdForLocalData = projectId || 'all'; // Use 'all' for local data if no project selected
        const insurances = getInsurancesByProject(safeProjectIdForLocalData);
        setProjectInsurances(insurances);
        
        // For milestones, we need to be careful if the old `contracts` object structure was different
        // For now, if contractsData is used for milestones, it might break.
        // The original logic was: contracts.flatMap(...)
        // We will use contractsData (SupabaseContract[]) if its structure is compatible enough,
        // otherwise, this part might need adjustment or use original local contracts for milestones.
        // For this subtask, we'll assume getMilestonesByContract can work with SupabaseContract's `id`.
        const milestones = contractsData.flatMap(contract => 
          getMilestonesByContract(contract.id) // Assumes contract.id is compatible
        );
        setProjectMilestones(milestones);

      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Error loading contracts data",
          description: "Failed to load contract data from the server.",
          variant: "destructive"
        });
        setProjectContracts([]); // Fallback to empty array
        // Keep existing fallback for insurances and milestones if needed
      } finally {
        setLoadingContracts(false);
      }
    };
    loadData();
  }, [projectId, toast]);
  
  if (loadingContracts && activeTab === 'contracts') { // Show loader only for contracts tab if it's active
    return (
       <DashboardLayout 
        projectContext="Contracts & Insurance" 
        projectName={projectName}
        initialInsights={[]}
      >
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      projectContext="Contracts & Insurance" 
      projectName={projectName}
      initialInsights={[]} 
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <ContractsHeader activeTab={activeTab} />
        </div>
        
        <div className="mt-8">
          <ContractsPageTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            contracts={projectContracts} // Pass Supabase contracts
            milestones={projectMilestones} // Keep local milestones
            insurances={projectInsurances} // Keep local insurances
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
