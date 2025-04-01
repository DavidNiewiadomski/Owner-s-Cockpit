
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, LineChartIcon, PieChartIcon } from 'lucide-react';
import { ChartLegend } from './ChartLegend';
import { PerformanceTabContent } from './PerformanceTabContent';
import { TimelineTabContent } from './TimelineTabContent';
import { ResourcesTabContent } from './ResourcesTabContent';

// Types for chart data
interface ProjectData {
  name: string;
  complete: number;
  budget: number;
  issues: number;
  efficiency: number;
}

interface TimelineData {
  month: string;
  actual: number;
  projected: number;
  variance: number;
}

interface BudgetData {
  name: string;
  value: number;
  fill: string;
}

interface ResourceData {
  name: string;
  planned: number;
  actual: number;
  capacity: number;
}

interface PerformanceData {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

interface AnalyticsTabsProps {
  projectData: ProjectData[];
  timelineData: TimelineData[];
  budgetData: BudgetData[];
  resourceData: ResourceData[];
  performanceData: PerformanceData[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    warning: string;
    info: string;
    background: string;
    gridLine: string;
  };
}

export function AnalyticsTabs({
  projectData,
  timelineData,
  budgetData,
  resourceData,
  performanceData,
  colors
}: AnalyticsTabsProps) {
  return (
    <Tabs defaultValue="performance" className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <TabsList className="bg-black border border-gray-700">
          <TabsTrigger value="performance" className="data-[state=active]:bg-construction-600 data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-construction-600 data-[state=active]:text-white">
            <LineChartIcon className="h-4 w-4 mr-2" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-construction-600 data-[state=active]:text-white">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Resources
          </TabsTrigger>
        </TabsList>
        <ChartLegend items={[
          { label: 'Current', color: 'blue' },
          { label: 'Target', color: 'green' }
        ]} />
      </div>

      {/* Performance Tab */}
      <TabsContent value="performance">
        <PerformanceTabContent 
          projectData={projectData} 
          performanceData={performanceData}
          colors={colors}
        />
      </TabsContent>

      {/* Timeline Tab */}
      <TabsContent value="timeline">
        <TimelineTabContent 
          timelineData={timelineData} 
          colors={colors} 
        />
      </TabsContent>

      {/* Resources Tab */}
      <TabsContent value="resources">
        <ResourcesTabContent 
          budgetData={budgetData} 
          resourceData={resourceData} 
          colors={colors} 
        />
      </TabsContent>
    </Tabs>
  );
}
