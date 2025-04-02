
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table } from 'lucide-react';

interface TableTabContentProps {
  onAddTable: () => void;
}

export function TableTabContent({ onAddTable }: TableTabContentProps) {
  return (
    <div className="space-y-4 mt-4">
      <div className="p-4 border border-cyan-900/30 rounded-md bg-gray-900/50">
        <p className="text-sm text-gray-400">
          Create a custom table with sample data. In a full implementation, 
          you would define columns and connect to data sources.
        </p>
      </div>
      
      <Button 
        className="w-full bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_15px_rgba(8,145,178,0.4)]"
        onClick={onAddTable}
      >
        <Table className="h-4 w-4 mr-2" />
        Add Table
      </Button>
    </div>
  );
}
