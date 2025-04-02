
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
          imageSrc="/lovable-uploads/84a355bb-2782-4715-9c27-a42a59fb9fce.png"
          onFullScreen={onOpenBIMViewer}
          className="shadow-[0_0_20px_rgba(56,189,248,0.3)] border-cyan-900/40 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]"
        />
        <VisualizationCard 
          title="Reality Capture"
          imageSrc="/lovable-uploads/e41b997b-4805-42a1-b7e3-f0d7a3ce04f9.png"
          onFullScreen={onOpenRealityCaptureViewer}
          className="shadow-[0_0_20px_rgba(168,85,247,0.3)] border-purple-900/40 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
        />
      </div>
    </>
  );
}
