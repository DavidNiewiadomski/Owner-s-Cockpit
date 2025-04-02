
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
  // Get the project name based on activeProject value
  const getProjectName = () => {
    switch(activeProject) {
      case 'downtown': return 'Downtown High-Rise';
      case 'riverside': return 'Riverside Complex';
      case 'corporate': return 'Corporate Offices';
      case 'all': return 'All Projects';
      default: return selectedProject?.title || 'Project';
    }
  };

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
          <h2 className="text-xl font-semibold">{getProjectName()} Timeline</h2>
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
                projectName={getProjectName()}
                location={realityCapture.location}
                onClose={onCloseRealityCapture}
                className="mb-6"
              />
            ) : null}
            
            <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-black p-1">
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
          </div>
          
          <div>
            <ProjectSummary 
              projectName={getProjectName()}
              startDate={activeProject === 'downtown' ? "Jan 15, 2023" : "Mar 10, 2023"}
              endDate={activeProject === 'downtown' ? "Aug 30, 2024" : "Dec 15, 2024"}
              budget={activeProject === 'downtown' ? "$32.5M" : "$28.7M"}
              completion={activeProject === 'downtown' ? 65 : 42}
              lastUpdated="2 hours ago"
            />
          </div>
        </div>
      </Tabs>
    </>
  );
}
