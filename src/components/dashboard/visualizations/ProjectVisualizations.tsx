
import React from 'react';
import { VisualizationCard } from './VisualizationCard';

interface ProjectVisualizationsProps {
  onOpenBIMViewer: () => void;
  onOpenRealityCaptureViewer: () => void;
}

export function ProjectVisualizations({ onOpenBIMViewer, onOpenRealityCaptureViewer }: ProjectVisualizationsProps) {
  return (
    <>
      <h2 className="text-xl font-semibold mt-10 mb-4 text-gradient animate-fade-in">Project Visualizations</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12 w-full">
        <VisualizationCard 
          title="BIM Model"
          imageSrc="/lovable-uploads/c70400be-777a-4fcb-ac1d-96541af42708.png"
          onFullScreen={onOpenBIMViewer}
          className="shadow-[0_0_20px_rgba(56,189,248,0.3)] border-cyan-900/40 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]"
        />
        <VisualizationCard 
          title="Reality Capture"
          imageSrc="/lovable-uploads/de2db6d7-0554-484f-b5b2-3287bbd7415e.png"
          onFullScreen={onOpenRealityCaptureViewer}
          className="shadow-[0_0_20px_rgba(168,85,247,0.3)] border-purple-900/40 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
        />
      </div>
    </>
  );
}
