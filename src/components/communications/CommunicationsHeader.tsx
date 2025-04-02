
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';

interface CommunicationsHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const CommunicationsHeader = ({ searchTerm, setSearchTerm }: CommunicationsHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-200">Communications Hub</h1>
          <p className="text-gray-400">Manage all your project communications in one place</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search communications..." 
              className="pl-8 bg-black border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button className="bg-cyan-700 hover:bg-cyan-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
        </div>
      </div>
    </div>
  );
};
