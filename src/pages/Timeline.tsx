
import React, { useState, useEffect } from 'react';
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
  milestoneData as baseMilestoneData, 
  timelineData, 
  timelineInsights 
} from '@/data/timelineData';

// Define a consistent type for realityCapture to fix type errors
interface RealityCaptureBase {
  available: boolean;
}

interface RealityCaptureAvailable extends RealityCaptureBase {
  available: true;
  date: string;
  url: string;
}

interface RealityCaptureUnavailable extends RealityCaptureBase {
  available: false;
  date?: never;
  url?: never;
}

type RealityCapture = RealityCaptureAvailable | RealityCaptureUnavailable;

// Define milestone type to ensure consistency
interface Milestone {
  name: string;
  plannedDate: string;
  actualDate: string;
  status: "completed" | "delayed" | "in-progress" | "upcoming";
  description: string;
  realityCapture?: RealityCapture;  // Make realityCapture optional to handle undefined cases
}

// Project-specific milestone data with consistent typing
const projectMilestoneData: Record<string, Milestone[]> = {
  '1': [
    {
      name: "Site Preparation",
      plannedDate: "Jan 15, 2024",
      actualDate: "Jan 20, 2024",
      status: "completed",
      description: "Clearing and grading of East Tower site",
      realityCapture: {
        available: true,
        date: "Jan 20, 2024",
        url: "https://example.com/reality-capture/east-tower-site-prep"
      }
    },
    {
      name: "Foundation Work",
      plannedDate: "Mar 1, 2024",
      actualDate: "Feb 25, 2024",
      status: "completed",
      description: "Foundation pouring and curing",
      realityCapture: {
        available: true,
        date: "Feb 28, 2024",
        url: "https://example.com/reality-capture/east-tower-foundation"
      }
    },
    {
      name: "Structural Framework",
      plannedDate: "Jun 15, 2024",
      actualDate: "Not Started",
      status: "in-progress",
      description: "Steel framework installation for all 32 floors",
      realityCapture: {
        available: false
      }
    },
    {
      name: "Facade Installation",
      plannedDate: "Sep 1, 2024",
      actualDate: "Not Started",
      status: "upcoming",
      description: "Glass panel installation on building exterior",
      realityCapture: {
        available: false
      }
    },
    {
      name: "Interior Finishing",
      plannedDate: "Dec 15, 2024",
      actualDate: "Not Started",
      status: "upcoming",
      description: "Interior walls, flooring, and fixtures",
      realityCapture: {
        available: false
      }
    }
  ],
  '2': [
    {
      name: "Land Clearing",
      plannedDate: "Feb 10, 2024",
      actualDate: "Feb 15, 2024",
      status: "completed",
      description: "Vegetation removal and initial grading",
      realityCapture: {
        available: true,
        date: "Feb 18, 2024",
        url: "https://example.com/reality-capture/westside-park-clearing"
      }
    },
    {
      name: "Drainage System",
      plannedDate: "Apr 5, 2024",
      actualDate: "Apr 15, 2024",
      status: "completed",
      description: "Storm water management and drainage installation",
      realityCapture: {
        available: true,
        date: "Apr 20, 2024",
        url: "https://example.com/reality-capture/westside-park-drainage"
      }
    },
    {
      name: "Main Pathways",
      plannedDate: "Jun 1, 2024",
      actualDate: "Not Started",
      status: "in-progress",
      description: "Primary walking and biking paths through park",
      realityCapture: {
        available: false
      }
    },
    {
      name: "Playground Construction",
      plannedDate: "Aug 10, 2024",
      actualDate: "Not Started",
      status: "upcoming",
      description: "Installation of playground equipment and safety surfaces",
      realityCapture: {
        available: false
      }
    },
    {
      name: "Landscaping & Planting",
      plannedDate: "Sep 25, 2024",
      actualDate: "Not Started",
      status: "upcoming",
      description: "Trees, shrubs, and lawn areas installation",
      realityCapture: {
        available: false
      }
    }
  ],
  '3': [
    {
      name: "Initial Assessment",
      plannedDate: "Mar 5, 2024",
      actualDate: "Mar 10, 2024",
      status: "completed",
      description: "Structural inspection and engineering assessment",
      realityCapture: {
        available: true,
        date: "Mar 12, 2024",
        url: "https://example.com/reality-capture/north-bridge-assessment"
      }
    },
    {
      name: "Traffic Management Plan",
      plannedDate: "Apr 1, 2024",
      actualDate: "Apr 10, 2024",
      status: "completed",
      description: "Detour routes and traffic flow planning",
      realityCapture: {
        available: false
      }
    },
    {
      name: "Support Column Reinforcement",
      plannedDate: "May 15, 2024",
      actualDate: "Not Started",
      status: "in-progress",
      description: "Strengthening existing support columns",
      realityCapture: {
        available: true,
        date: "Jun 5, 2024",
        url: "https://example.com/reality-capture/north-bridge-columns"
      }
    },
    {
      name: "Deck Replacement",
      plannedDate: "Aug 1, 2024",
      actualDate: "Not Started",
      status: "upcoming",
      description: "Bridge deck removal and installation of new surface",
      realityCapture: {
        available: false
      }
    },
    {
      name: "Final Inspections",
      plannedDate: "Oct 15, 2024",
      actualDate: "Not Started",
      status: "upcoming",
      description: "Engineering safety inspections and load testing",
      realityCapture: {
        available: false
      }
    }
  ],
  'all': baseMilestoneData.map(milestone => ({
    ...milestone,
    realityCapture: milestone.realityCapture ? 
      { ...milestone.realityCapture } : 
      { available: false }
  })) as Milestone[]
};

interface RealityCaptureEvent {
  name: string;
  date: string;
  url: string;
  location: string;
}

const Timeline = () => {
  const [activeProject, setActiveProject] = useState("downtown");
  const [timelineView, setTimelineView] = useState("gantt");
  const [realityCapture, setRealityCapture] = useState<RealityCaptureEvent | null>(null);
  const { selectedProject } = useProject();
  const [milestoneData, setMilestoneData] = useState<Milestone[]>(baseMilestoneData as Milestone[]);
  const [projectSpecificInsights, setProjectSpecificInsights] = useState<string[]>([]);
  
  // Update milestones and insights based on selected project
  useEffect(() => {
    if (selectedProject) {
      const projectId = selectedProject.id;
      // Set project-specific milestone data
      setMilestoneData(projectMilestoneData[projectId as keyof typeof projectMilestoneData] || projectMilestoneData['all']);
      
      // Set project-specific insights
      if (projectId === '1') {
        setProjectSpecificInsights([
          `East Tower is currently 1.5 days ahead of schedule`,
          `Facade material delivery is scheduled for next week`,
          `Weather forecast shows clear conditions for the next 10 days`,
          `Resource allocation is optimized at 93% efficiency for East Tower`
        ]);
      } else if (projectId === '2') {
        setProjectSpecificInsights([
          `Westside Park is currently 3.2 days behind schedule due to drainage issues`,
          `Excavation equipment needs to be relocated by Friday`,
          `Weather forecast shows potential rain impact to landscaping next week`,
          `Resource allocation is optimized at 85% efficiency for Westside Park`
        ]);
      } else if (projectId === '3') {
        setProjectSpecificInsights([
          `North Bridge repairs are on schedule with no current variance`,
          `Traffic diversion plan needs minor adjustments for weekend work`,
          `Weather forecast shows moderate impact to exterior work next week`,
          `Resource allocation is optimized at 89% efficiency for North Bridge`
        ]);
      } else {
        setProjectSpecificInsights([
          `Schedule variance is currently 2.5 days ahead across all projects`,
          `Critical path activities are 92% on schedule`,
          `Weather forecast shows potential impact to exterior work next week`,
          `Resource allocation is optimized at 87% efficiency across all projects`
        ]);
      }
    }
  }, [selectedProject]);
  
  const handleViewRealityCapture = (milestone: Milestone) => {
    // Check if milestone and realityCapture exist and realityCapture is available
    if (milestone.realityCapture && milestone.realityCapture.available) {
      setRealityCapture({
        name: milestone.name,
        date: milestone.realityCapture.date,
        url: milestone.realityCapture.url,
        location: `${selectedProject?.title || 'Project'} - ${milestone.name}`
      });
    }
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader 
          title="Timeline" 
          subtitle="Track your project schedules and milestones"
          onSearch={() => {}} 
        />
        
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
              <h2 className="text-xl font-semibold">{selectedProject?.title || 'Project'} Timeline</h2>
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
                    projectName={selectedProject?.title || 'Project'}
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
