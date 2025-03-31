
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { useProject } from '@/contexts/ProjectContext';
import { RealityCaptureViewer } from '@/components/dashboard/RealityCaptureViewer';
import { ProgressChart } from '@/components/dashboard/ProgressChart';

// Import the refactored components
import { GanttChart } from '@/components/timeline/GanttChart';
import { DelayAnalysisChart } from '@/components/timeline/DelayAnalysisChart';
import { MilestoneView } from '@/components/timeline/MilestoneView';
import { EmptyActivitiesList } from '@/components/timeline/EmptyActivitiesList';
import { ProjectSummary } from '@/components/timeline/ProjectSummary';
import { TimelineViewSelector } from '@/components/timeline/TimelineViewSelector';
import { ProjectFilterBar } from '@/components/timeline/ProjectFilterBar';

// Import the timeline data from separate file
import { 
  ganttData, 
  delayMetricsData, 
  milestoneData, 
  timelineData, 
  timelineInsights 
} from '@/data/timelineData';

interface RealityCaptureEvent {
  name: string;
  date: string;
  url: string;
  location: string;
}

const progressChartData = [
  { name: 'Week 1', value: 5 },
  { name: 'Week 5', value: 15 },
  { name: 'Week 10', value: 25 },
  { name: 'Week 15', value: 35 },
  { name: 'Week 20', value: 45 },
  { name: 'Week 25', value: 55 }
];

const Timeline = () => {
  const [activeProject, setActiveProject] = useState("downtown");
  const [timelineView, setTimelineView] = useState("gantt");
  const [realityCapture, setRealityCapture] = useState<RealityCaptureEvent | null>(null);
  const { selectedProject } = useProject();
  
  const handleViewRealityCapture = (milestone: any) => {
    if (milestone.realityCapture?.available) {
      setRealityCapture({
        name: milestone.name,
        date: milestone.realityCapture.date,
        url: milestone.realityCapture.url,
        location: `${activeProject === 'downtown' ? 'Downtown High-Rise' : 
                    activeProject === 'riverside' ? 'Riverside Complex' : 
                    'Corporate Offices'} - ${milestone.name}`
      });
    }
  };

  const projectSpecificInsights = [
    `Schedule variance is currently 2.5 days ahead for ${selectedProject?.title || 'this project'}`,
    `Critical path activities are 92% on schedule for ${selectedProject?.title || 'this project'}`,
    `Weather forecast shows potential impact to exterior work next week for ${selectedProject?.title || 'this project'}`,
    `Resource allocation is optimized at 87% efficiency for ${selectedProject?.title || 'this project'}`
  ];
  
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader onSearch={() => {}} />
        
        <main className="container mx-auto py-6 px-4 md:px-6">
          <CollapsibleAIAssistant 
            projectName={selectedProject?.title || 'your project'} 
            insights={projectSpecificInsights}
            initialInsights={timelineInsights}
          />

          <div className="mb-6">
            <h1 className="text-2xl font-bold">Project Timeline</h1>
            <p className="text-muted-foreground">Monitor schedules, milestones, and progress across your projects</p>
          </div>
          
          <Tabs defaultValue={activeProject} onValueChange={setActiveProject} className="mb-6">
            <ProjectFilterBar 
              activeProject={activeProject} 
              onProjectChange={setActiveProject} 
            />

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Downtown High-Rise Timeline</h2>
              <TimelineViewSelector 
                activeView={timelineView} 
                onViewChange={setTimelineView} 
              />
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                {realityCapture ? (
                  <RealityCaptureViewer
                    captureUrl={realityCapture.url}
                    captureDate={realityCapture.date}
                    projectName={activeProject === 'downtown' ? 'Downtown High-Rise' : 
                                activeProject === 'riverside' ? 'Riverside Complex' : 
                                'Corporate Offices'}
                    location={realityCapture.location}
                    onClose={() => setRealityCapture(null)}
                    className="mb-6"
                  />
                ) : null}
                
                {timelineView === "gantt" && <GanttChart data={ganttData} />}
                {timelineView === "delays" && <DelayAnalysisChart data={delayMetricsData} />}
                {timelineView === "milestone" && (
                  <MilestoneView 
                    milestones={milestoneData} 
                    onViewRealityCapture={handleViewRealityCapture} 
                  />
                )}
                {timelineView === "activities" && <EmptyActivitiesList />}
              </div>
              
              <div>
                <ProjectSummary />
              </div>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Timeline;
