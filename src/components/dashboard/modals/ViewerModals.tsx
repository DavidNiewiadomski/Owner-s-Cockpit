
import React from 'react';
import { Button } from '@/components/ui/button';
import { BIMViewer } from '@/components/dashboard/BIMViewer';
import { RealityCaptureViewer } from '@/components/dashboard/RealityCaptureViewer';

interface ViewerModalsProps {
  isBIMViewerOpen: boolean;
  isRealityCaptureOpen: boolean;
  selectedProject?: any;
  closeBIMViewer: () => void;
  closeRealityCaptureViewer: () => void;
}

export function ViewerModals({ 
  isBIMViewerOpen, 
  isRealityCaptureOpen, 
  selectedProject,
  closeBIMViewer,
  closeRealityCaptureViewer
}: ViewerModalsProps) {
  return (
    <>
      {/* BIM Viewer Modal */}
      {isBIMViewerOpen && (
        <BIMViewer 
          projectName={selectedProject?.title || "Project"} 
          isOpen={isBIMViewerOpen} 
          onClose={closeBIMViewer} 
        />
      )}

      {/* Reality Capture Viewer Modal */}
      {isRealityCaptureOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80">
          <RealityCaptureViewer />
          <Button 
            className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white"
            onClick={closeRealityCaptureViewer}
          >
            Close Viewer
          </Button>
        </div>
      )}
    </>
  );
}
