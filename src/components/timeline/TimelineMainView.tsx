
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Camera } from 'lucide-react';
import { RealityCaptureViewer } from '@/components/dashboard/RealityCaptureViewer';
import { GanttChart } from '@/components/timeline/GanttChart';
import { DelayAnalysisChart } from '@/components/timeline/DelayAnalysisChart';
import { MilestoneView } from '@/components/timeline/MilestoneView';
import { EmptyActivitiesList } from '@/components/timeline/EmptyActivitiesList';
import { ProjectSummary } from '@/components/timeline/ProjectSummary';
import { ProjectFilterBar } from '@/components/timeline/ProjectFilterBar';
import { TimelineViewSelector } from '@/components/timeline/TimelineViewSelector';

interface RealityCaptureEvent {
  name: string;
  date: string;
  url: string;
  location: string;
}

interface Milestone {
  name: string;
  plannedDate: string;
  actualDate: string;
  status: "completed" | "delayed" | "in-progress" | "upcoming";
  description: string;
  realityCapture?: {
    available: boolean;
    date?: string;
    url?: string;
  };
}

interface TimelineMainViewProps {
  activeProject: string;
  timelineView: string;
  realityCapture: RealityCaptureEvent | null;
  selectedProject: { id: string; title?: string } | null;
  milestoneData: Milestone[];
  ganttData: any[];
  delayMetricsData: any[];
  onShowRealityCaptures: () => void;
  onProjectChange: (project: string) => void;
  onViewChange: (view: string) => void;
  onViewRealityCapture: (milestone: Milestone) => void;
  onCloseRealityCapture: () => void;
}

export function TimelineMainView({
  activeProject,
  timelineView,
  realityCapture,
  selectedProject,
  milestoneData,
  ganttData,
  delayMetricsData,
  onShowRealityCaptures,
  onProjectChange,
  onViewChange,
  onViewRealityCapture,
  onCloseRealityCapture
}: TimelineMainViewProps) {
  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Project Timeline</h1>
          <p className="text-muted-foreground">Monitor schedules, milestones, and progress across your projects</p>
        </div>
        <Button 
          className="gap-2 bg-blue-600 hover:bg-blue-700" 
          onClick={onShowRealityCaptures}
        >
          <Camera className="h-4 w-4" />
          <span>View Reality Captures</span>
        </Button>
      </div>
      
      <Tabs defaultValue={activeProject} onValueChange={onProjectChange} className="mb-6">
        <ProjectFilterBar 
          activeProject={activeProject} 
          onProjectChange={onProjectChange} 
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{selectedProject?.title || 'Project'} Timeline</h2>
          <TimelineViewSelector 
            activeView={timelineView} 
            onViewChange={onViewChange} 
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            {realityCapture ? (
              <RealityCaptureViewer
                captureUrl={realityCapture.url}
                captureDate={realityCapture.date}
                projectName={selectedProject?.title || 'Project'}
                location={realityCapture.location}
                onClose={onCloseRealityCapture}
                className="mb-6"
              />
            ) : null}
            
            {timelineView === "gantt" && <GanttChart data={ganttData} />}
            {timelineView === "delays" && <DelayAnalysisChart data={delayMetricsData} />}
            {timelineView === "milestone" && (
              <MilestoneView 
                milestones={milestoneData} 
                onViewRealityCapture={onViewRealityCapture} 
              />
            )}
            {timelineView === "activities" && <EmptyActivitiesList />}
          </div>
          
          <div>
            <ProjectSummary />
          </div>
        </div>
      </Tabs>
    </>
  );
}
