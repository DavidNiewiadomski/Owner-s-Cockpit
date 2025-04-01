
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FolderOpen } from 'lucide-react';

interface ProjectEmptyStateProps {
  searchTerm?: string;
}

export function ProjectEmptyState({ searchTerm }: ProjectEmptyStateProps) {
  return (
    <Card className="bg-black border-gray-800">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <FolderOpen className="h-16 w-16 text-gray-600 mb-4" />
        {searchTerm ? (
          <>
            <h3 className="text-lg font-medium mb-2">No matching projects found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              We couldn't find any projects matching "{searchTerm}". Try adjusting your search terms or filters.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-medium mb-2">No projects available</h3>
            <p className="text-muted-foreground text-center max-w-md">
              There are no projects in this category. Projects will appear here once they are added.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
