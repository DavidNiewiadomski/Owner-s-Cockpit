
import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { RealityCaptureView } from '@/components/timeline/RealityCaptureView';
import { TimelineMainView } from '@/components/timeline/TimelineMainView';
import { useTimelineData } from '@/hooks/useTimelineData';
import { ScrollArea } from '@/components/ui/scroll-area';

const Timeline = () => {
  const {
    activeProject,
    setActiveProject,
    timelineView,
    setTimelineView,
    realityCapture,
    setRealityCapture,
    showRealityCaptures,
    setShowRealityCaptures,
    selectedProject,
    milestoneData,
    projectSpecificInsights,
    availableRealityCaptures,
    handleViewRealityCapture,
    ganttData,
    delayMetricsData
  } = useTimelineData();
  
  const timelineInsights = [
    {
      title: 'Schedule Status',
      content: 'Downtown High-Rise project is 3 days ahead of schedule for Q4 milestones',
      type: 'success' as const
    },
    {
      title: 'Critical Path Alert',
      content: 'Foundation work delay may impact subsequent phases - mitigation plan required',
      type: 'warning' as const
    },
    {
      title: 'Milestone Achievement',
      content: 'Structural completion milestone reached 2 weeks early with quality standards met',
      type: 'success' as const
    }
  ];
  
  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={() => {}} />
        
        <ScrollArea className="flex-1">
          <main className="container mx-auto py-6 px-4 md:px-6">
            <CollapsibleAIAssistant 
              projectName={selectedProject?.title || 'your project'} 
              insights={projectSpecificInsights}
              initialInsights={timelineInsights}
            />

            {showRealityCaptures ? (
              <RealityCaptureView 
                realityCapture={realityCapture}
                availableRealityCaptures={availableRealityCaptures}
                selectedProject={selectedProject}
                onClose={() => setShowRealityCaptures(false)}
                onSelectCapture={setRealityCapture}
              />
            ) : (
              <TimelineMainView 
                activeProject={activeProject}
                timelineView={timelineView}
                realityCapture={showRealityCaptures ? null : realityCapture}
                selectedProject={selectedProject}
                milestoneData={milestoneData}
                ganttData={ganttData}
                delayMetricsData={delayMetricsData}
                onShowRealityCaptures={() => setShowRealityCaptures(true)}
                onProjectChange={setActiveProject}
                onViewChange={setTimelineView}
                onViewRealityCapture={handleViewRealityCapture}
                onCloseRealityCapture={() => setRealityCapture(null)}
              />
            )}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Timeline;
