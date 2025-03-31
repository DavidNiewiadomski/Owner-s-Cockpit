
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ProjectOption {
  value: string;
  label: string;
}

interface InvestmentHeaderProps {
  selectedProject: string;
  projectOptions: ProjectOption[];
  onProjectChange: (value: string) => void;
  onDownloadReport: () => void;
}

export const InvestmentHeader: React.FC<InvestmentHeaderProps> = ({
  selectedProject,
  projectOptions,
  onProjectChange,
  onDownloadReport
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Investment Impact Analysis</h1>
        <p className="text-gray-400">Monitor how construction events affect your investment metrics</p>
      </div>
      <div className="mt-3 md:mt-0 flex flex-col sm:flex-row gap-3">
        <Select
          value={selectedProject}
          onValueChange={onProjectChange}
        >
          <SelectTrigger className="w-[180px] glass-input">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            {projectOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1 border-gray-700 hover:border-gray-600 text-gray-300 hover-scale"
          onClick={onDownloadReport}
        >
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </Button>
      </div>
    </div>
  );
};
