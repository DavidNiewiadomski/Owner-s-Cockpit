
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Camera } from 'lucide-react';
import { RealityCaptureViewer } from '@/components/dashboard/RealityCaptureViewer';

interface RealityCaptureEvent {
  name: string;
  date: string;
  url: string;
  location: string;
  status?: string;
}

interface RealityCaptureViewProps {
  realityCapture: RealityCaptureEvent | null;
  availableRealityCaptures: RealityCaptureEvent[];
  selectedProject?: { title?: string } | null;
  onClose: () => void;
  onSelectCapture: (capture: RealityCaptureEvent) => void;
}

export function RealityCaptureView({
  realityCapture,
  availableRealityCaptures,
  selectedProject,
  onClose,
  onSelectCapture
}: RealityCaptureViewProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Reality Captures</h1>
        </div>
        <p className="text-muted-foreground">View 360° captures of your project's progress</p>
      </div>

      <div className="mb-6">
        {realityCapture ? (
          <RealityCaptureViewer
            captureUrl={realityCapture.url}
            captureDate={realityCapture.date}
            projectName={selectedProject?.title || 'Project'}
            location={realityCapture.location}
            onClose={() => onSelectCapture(null)}
            className="mb-6"
          />
        ) : (
          <div className="bg-black border border-gray-800 rounded-lg p-10 text-center">
            <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Select a Reality Capture</h3>
            <p className="text-muted-foreground mb-6">Choose a milestone from below to view its reality capture</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {availableRealityCaptures.map((capture, index) => (
          <div 
            key={index} 
            className={`bg-black border border-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all hover:border-blue-500 ${realityCapture?.name === capture.name ? 'border-blue-500 ring-2 ring-blue-500/20' : ''}`}
            onClick={() => onSelectCapture(capture)}
          >
            <div className="h-32 bg-gray-900 relative">
              <img 
                src={capture.url} 
                alt={capture.name} 
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">{capture.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  capture.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                  capture.status === 'in-progress' ? 'bg-blue-900/30 text-blue-400' :
                  capture.status === 'delayed' ? 'bg-red-900/30 text-red-400' :
                  'bg-gray-900/30 text-gray-400'
                }`}>
                  {capture.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{capture.date}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
