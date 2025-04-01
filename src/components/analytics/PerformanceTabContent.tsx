
import React from 'react';
import { ProjectCompletionChart } from './charts/ProjectCompletionChart';
import { PerformanceRadarChart } from './charts/PerformanceRadarChart';
import { IssuesBarChart } from './charts/IssuesBarChart';

interface ProjectData {
  name: string;
  complete: number;
  budget: number;
  issues: number;
  efficiency: number;
}

interface PerformanceData {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

interface PerformanceTabContentProps {
  projectData: ProjectData[];
  performanceData: PerformanceData[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gridLine: string;
  };
}

export function PerformanceTabContent({ 
  projectData, 
  performanceData, 
  colors 
}: PerformanceTabContentProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Completion Chart */}
        <ProjectCompletionChart projectData={projectData} colors={colors} />
        
        {/* Project Performance Radar Chart */}
        <PerformanceRadarChart performanceData={performanceData} colors={colors} />
      </div>
      
      {/* Issues by Project - Horizontal Bar Chart */}
      <IssuesBarChart projectData={projectData} colors={colors} />
    </div>
  );
}
