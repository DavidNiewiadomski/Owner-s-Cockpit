
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface ReportTabContentProps {
  onAddReport: () => void;
}

export function ReportTabContent({ onAddReport }: ReportTabContentProps) {
  return (
    <div className="space-y-4 mt-4">
      <div className="p-4 border border-cyan-900/30 rounded-md bg-gray-900/50">
        <p className="text-sm text-gray-400">
          Create a custom report with formatted text and data. In a full implementation,
          you would be able to format text and add data visualizations.
        </p>
      </div>
      
      <Button 
        className="w-full bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_15px_rgba(8,145,178,0.4)]"
        onClick={onAddReport}
      >
        <FileText className="h-4 w-4 mr-2" />
        Add Report
      </Button>
    </div>
  );
}
