
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, ShieldCheck } from 'lucide-react';
import { useProject } from '@/contexts/ProjectContext';

interface ContractsHeaderProps {
  activeTab: string;
}

export function ContractsHeader({ activeTab }: ContractsHeaderProps) {
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || 'All Projects';

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
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
      
      <div className="flex space-x-3">
        <Button 
          variant="outline" 
          className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          {activeTab === 'contracts' ? 'New Contract' : 'New Policy'}
        </Button>
      </div>
    </div>
  );
}
