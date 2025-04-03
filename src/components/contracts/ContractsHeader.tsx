
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useProject } from '@/contexts/ProjectContext';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';

interface ContractsHeaderProps {
  activeTab: string;
}

export function ContractsHeader({ activeTab }: ContractsHeaderProps) {
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || 'All Projects';

  // AI insights for contracts and insurance
  const contractInsightsStrings = [
    "2 contracts are expiring in the next 30 days",
    "Builder's Risk insurance policy is due for renewal",
    "4 unresolved payment milestones require attention",
    "Westview Residences has 3 active change orders pending approval"
  ];
  
  // Convert string array to the expected Insight[] format
  const contractInsights = contractInsightsStrings.map((content, index) => ({
    title: `Insight ${index + 1}`,
    content,
    type: (index % 3 === 0 ? "warning" : index % 3 === 1 ? "info" : "success") as "warning" | "success" | "info"
  }));

  return (
    <>
      {/* Add AI Insights component at the top */}
      <CollapsibleAIAssistant 
        projectContext="Contracts & Insurance"
        projectName={projectName}
        initialInsights={contractInsights}
      />
      
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mt-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {activeTab === 'contracts' ? 'Contracts' : 'Insurance'} 
            {projectName !== 'All Projects' && ` - ${projectName}`}
          </h1>
          <p className="text-gray-400 mt-1">
            {activeTab === 'contracts'
              ? 'Manage and track all project contracts and milestones'
              : 'Monitor insurance policies and coverage for your projects'
            }
          </p>
        </div>
        
        <div>
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            {activeTab === 'contracts' ? 'New Contract' : 'New Policy'}
          </Button>
        </div>
      </div>
    </>
  );
}
