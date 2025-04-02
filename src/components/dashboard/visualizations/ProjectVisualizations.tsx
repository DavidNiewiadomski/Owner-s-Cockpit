
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
          imageSrc="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1788&q=80"
          onFullScreen={onOpenBIMViewer}
          className="shadow-[0_0_20px_rgba(56,189,248,0.3)] border-cyan-900/40 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]"
        />
        <VisualizationCard 
          title="Reality Capture"
          imageSrc="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2531&q=80"
          onFullScreen={onOpenRealityCaptureViewer}
          className="shadow-[0_0_20px_rgba(168,85,247,0.3)] border-purple-900/40 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
        />
      </div>
    </>
  );
}
