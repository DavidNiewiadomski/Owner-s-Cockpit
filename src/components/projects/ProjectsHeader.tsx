
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Columns, List } from 'lucide-react';

interface ProjectsHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: 'card' | 'list';
  setViewMode: (mode: 'card' | 'list') => void;
}

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="relative w-full md:w-auto max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search projects..." 
          className="pl-8 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
        <div className="flex items-center">
          <Button variant="outline" size="sm" onClick={() => setViewMode('card')} className={viewMode === 'card' ? 'bg-accent' : ''}>
            <Columns className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-accent' : ''}>
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        <Button variant="outline" size="sm" className="gap-1">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
        
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </Button>
      </div>
    </div>
  );
};
