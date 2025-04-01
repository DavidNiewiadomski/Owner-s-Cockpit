
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface KPIItem {
  title: string;
  value: string;
  trend: string;
  color: string;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <Card key={index} className={`bg-black border-gray-700 overflow-hidden`}>
          <div className={`h-1 ${kpi.color}`}></div>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400">{kpi.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded ${
                kpi.trend.startsWith('+') ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
              }`}>
                {kpi.trend}
              </div>
            </div>
            {/* Animated pulse indicator */}
            <div className="mt-4 relative h-1 bg-gray-700 rounded">
              <div className={`absolute top-0 left-0 h-full rounded ${kpi.color} transition-all duration-1000 ease-in-out ${
                activeAnimation ? 'opacity-70' : 'opacity-100'
              }`} style={{ width: kpi.value }}></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
