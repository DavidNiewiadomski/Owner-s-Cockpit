
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TimelineMainView } from '@/components/timeline/TimelineMainView';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { RealityCaptureView } from '@/components/timeline/RealityCaptureView';
import { useProject } from '@/contexts/ProjectContext';
import { useTimelineData } from '@/hooks/useTimelineData';

const Timeline = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || 'All Projects';

  const {
    activeProject,
    setActiveProject,
    timelineView,
    setTimelineView,
    realityCapture,
    setRealityCapture,
    showRealityCaptures,
    setShowRealityCaptures,
    milestoneData,
    projectSpecificInsights,
    availableRealityCaptures,
    handleViewRealityCapture,
    ganttData,
    delayMetricsData
  } = useTimelineData();

  // Timeline insights formatted as Insight objects
  const timelineInsights = [
    {
      title: "Critical Path Alert",
      content: "Steel delivery delay could impact foundation completion by 3 days - immediate action required",
      type: "warning" as const
    },
    {
      title: "Progress Update", 
      content: "Riverfront Tower is 2 days ahead of schedule with foundation work 85% complete",
      type: "success" as const
    },
    {
      title: "Weather Impact",
      content: "Heavy rain forecast for next week may affect outdoor concrete work scheduling",
      type: "info" as const
    },
    {
      title: "Resource Optimization",
      content: "Equipment utilization increased by 15% after implementing new scheduling system",
      type: "success" as const
    }
  ];

  const handleShowRealityCaptures = () => {
    setShowRealityCaptures(true);
  };

  const handleCloseRealityCapture = () => {
    setRealityCapture(null);
    setShowRealityCaptures(false);
  };

  const handleSelectCapture = (capture: any) => {
    setRealityCapture(capture);
  };

  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <ScrollArea className="flex-1">
          <main className="container mx-auto py-6 px-4 md:px-6">
            <CollapsibleAIAssistant 
              projectContext="Timeline & Schedule"
              projectName={projectName}
              initialInsights={timelineInsights}
            />
            
            {showRealityCaptures ? (
              <RealityCaptureView
                realityCapture={realityCapture}
                availableRealityCaptures={availableRealityCaptures}
                selectedProject={selectedProject}
                onClose={handleCloseRealityCapture}
                onSelectCapture={handleSelectCapture}
              />
            ) : (
              <TimelineMainView
                activeProject={activeProject}
                timelineView={timelineView}
                realityCapture={realityCapture}
                selectedProject={selectedProject}
                milestoneData={milestoneData}
                ganttData={ganttData}
                delayMetricsData={delayMetricsData}
                onShowRealityCaptures={handleShowRealityCaptures}
                onProjectChange={setActiveProject}
                onViewChange={setTimelineView}
                onViewRealityCapture={handleViewRealityCapture}
                onCloseRealityCapture={handleCloseRealityCapture}
              />
            )}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Timeline;
