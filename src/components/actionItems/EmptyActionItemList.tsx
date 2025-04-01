
import React from 'react';
import { ListChecks } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyActionItemListProps {
  searchQuery: string;
}

export function EmptyActionItemList({ searchQuery }: EmptyActionItemListProps) {
  return (
    <Card className="bg-black border-gray-700">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <ListChecks className="h-12 w-12 text-gray-500 mb-4" />
        <h3 className="text-xl font-medium text-gray-200">No action items found</h3>
        <p className="text-gray-400 mt-2">
          {searchQuery ? 'Try a different search term' : 'All tasks are complete or filtered out'}
        </p>
      </CardContent>
    </Card>
  );
}
