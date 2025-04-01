
import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { RealityCaptureView } from '@/components/timeline/RealityCaptureView';
import { TimelineMainView } from '@/components/timeline/TimelineMainView';
import { useTimelineData } from '@/hooks/useTimelineData';

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
    delayMetricsData,
    timelineInsights
  } = useTimelineData();
  
  return (
    <div className="flex min-h-screen bg-black">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader onSearch={() => {}} />
        
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
      </div>
    </div>
  );
};

export default Timeline;
