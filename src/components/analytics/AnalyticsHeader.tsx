
import React from 'react';
import { Button } from '@/components/ui/button';

interface Period {
  value: string;
  label: string;
}

interface AnalyticsHeaderProps {
  periods: Period[];
  currentPeriod: string;
  setCurrentPeriod: (period: string) => void;
}

export function AnalyticsHeader({ 
  periods, 
  currentPeriod, 
  setCurrentPeriod 
}: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-gray-400">Interactive project performance metrics and insights</p>
      </div>
      <div className="mt-3 md:mt-0">
        <div className="flex items-center bg-black rounded-md p-1 border border-gray-700">
          {periods.map(period => (
            <Button 
              key={period.value}
              variant="ghost" 
              size="sm"
              className={`px-3 py-1 text-xs rounded-sm ${
                currentPeriod === period.value 
                  ? 'bg-construction-900/40 text-construction-300' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setCurrentPeriod(period.value)}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
