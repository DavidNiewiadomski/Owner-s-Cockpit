
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  ShieldCheck 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProject } from '@/contexts/ProjectContext';

interface ContractsHeaderProps {
  activeTab: string;
}

export function ContractsHeader({ activeTab }: ContractsHeaderProps) {
  const { selectedProject } = useProject();
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {activeTab === 'contracts' ? 'Contracts' : 'Insurance'} & Risk Management
          </h1>
          <p className="text-gray-400">
            Manage and monitor {activeTab === 'contracts' ? 'contracts' : 'insurance policies'} for {selectedProject.title}
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button className="bg-cyan-700 hover:bg-cyan-600 text-white shadow-md">
            <Plus className="mr-2 h-4 w-4" />
            {activeTab === 'contracts' ? 'New Contract' : 'New Policy'}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-800">
              <DropdownMenuItem className="cursor-pointer text-gray-400 hover:text-white">
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-gray-400 hover:text-white">
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-gray-400 hover:text-white">
                Print Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder={`Search ${activeTab === 'contracts' ? 'contracts' : 'insurance policies'}...`} 
            className="w-full pl-9 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-cyan-600"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          
          <Button variant="outline" className="border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </div>
    </div>
  );
}
