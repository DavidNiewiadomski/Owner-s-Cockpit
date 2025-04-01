
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';

interface KPIItem {
  title: string;
  value: string;
  trend: string;
  color: string;
  description?: string;
}

interface KeyPerformanceIndicatorsProps {
  kpiData: KPIItem[];
  activeAnimation: boolean;
}

export function KeyPerformanceIndicators({ 
  kpiData, 
  activeAnimation 
}: KeyPerformanceIndicatorsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <Card key={index} className={`bg-black border-gray-700 overflow-hidden`}>
          <div className={`h-1 ${kpi.color}`}></div>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <p className="text-sm font-medium text-gray-400">{kpi.title}</p>
                {kpi.description && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-3.5 w-3.5 ml-1 text-gray-500 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-gray-800 text-gray-100 border-gray-700 text-xs max-w-[200px]">
                        {kpi.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded ${
                kpi.trend.startsWith('+') ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
              }`}>
                {kpi.trend}
              </div>
            </div>
            <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
            {/* Animated pulse indicator */}
            <div className="mt-4 relative h-1 bg-gray-700 rounded">
              <div className={`absolute top-0 left-0 h-full rounded ${kpi.color} transition-all duration-1000 ease-in-out ${
                activeAnimation ? 'opacity-70' : 'opacity-100'
              }`} style={{ width: '75%' }}></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
