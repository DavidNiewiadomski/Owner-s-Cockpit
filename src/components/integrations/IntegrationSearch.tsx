
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface IntegrationSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function IntegrationSearch({ 
  searchTerm, 
  setSearchTerm 
}: IntegrationSearchProps) {
  return (
    <div className="relative w-full md:w-64">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        placeholder="Search integrations..."
        className="pl-8 bg-black border-gray-700"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
