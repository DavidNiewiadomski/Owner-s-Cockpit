
import React from 'react';
import { VisualizationCard } from './VisualizationCard';

interface ProjectVisualizationsProps {
  onOpenBIMViewer: () => void;
  onOpenRealityCaptureViewer: () => void;
}

export function ProjectVisualizations({ onOpenBIMViewer, onOpenRealityCaptureViewer }: ProjectVisualizationsProps) {
  return (
    <>
      <h2 className="text-xl font-semibold mt-10 mb-4 text-cyan-300 animate-fade-in">Project Visualizations</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
        <VisualizationCard 
          title="BIM Model"
          imageSrc="https://www.constructible.trimble.com/hs-fs/hubfs/BIM%20in%20Construction.jpg"
          onFullScreen={onOpenBIMViewer}
        />
        <VisualizationCard 
          title="Reality Capture"
          imageSrc="public/lovable-uploads/e41b997b-4805-42a1-b7e3-f0d7a3ce04f9.png"
          onFullScreen={onOpenRealityCaptureViewer}
        />
      </div>
    </>
  );
}
