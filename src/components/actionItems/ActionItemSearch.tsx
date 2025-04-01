
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ActionItemSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function ActionItemSearch({ searchQuery, setSearchQuery }: ActionItemSearchProps) {
  return (
    <div className="relative w-full md:w-64">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        placeholder="Search action items..."
        className="pl-8 bg-black border-gray-700"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
