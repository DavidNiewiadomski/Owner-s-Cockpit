
import React from 'react';
import { Button } from '@/components/ui/button';
import { FilterIcon, RefreshCw } from 'lucide-react';

interface AnalyticsHeaderProps {
  projectName: string;
  currentPeriod: string;
  setCurrentPeriod: (period: string) => void;
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  projectName,
  currentPeriod,
  setCurrentPeriod
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-gray-400">Analyzing data from {projectName}</p>
      </div>
      
      <div className="flex gap-2 items-center">
        <div className="bg-gray-800 rounded-md p-1 flex">
          <Button 
            variant={currentPeriod === '1M' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentPeriod('1M')}
            className="text-xs"
          >
            1M
          </Button>
          <Button 
            variant={currentPeriod === '3M' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentPeriod('3M')}
            className="text-xs"
          >
            3M
          </Button>
          <Button 
            variant={currentPeriod === '6M' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentPeriod('6M')}
            className="text-xs"
          >
            6M
          </Button>
          <Button 
            variant={currentPeriod === '1Y' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentPeriod('1Y')}
            className="text-xs"
          >
            1Y
          </Button>
          <Button 
            variant={currentPeriod === 'ALL' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentPeriod('ALL')}
            className="text-xs"
          >
            ALL
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <FilterIcon className="h-4 w-4 mr-1" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </div>
    </div>
  );
};
