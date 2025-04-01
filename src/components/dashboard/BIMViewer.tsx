
import React, { useState } from 'react';
import { X, Orbit, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BIMViewerProps {
  projectName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function BIMViewer({ projectName = 'Project', isOpen, onClose }: BIMViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  React.useEffect(() => {
    // Simulate loading of the BIM model
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [isOpen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn(
        "max-w-6xl border-gray-800 bg-black p-0",
        isFullscreen ? "fixed inset-0 w-screen h-screen max-h-screen rounded-none" : "w-full max-h-[80vh]"
      )}>
        <DialogHeader className="px-4 py-3 flex flex-row items-center justify-between bg-black border-b border-gray-800">
          <div className="flex items-center">
            <Orbit className="h-5 w-5 mr-2 text-blue-400" />
            <DialogTitle className="text-base font-medium text-white">{projectName} BIM Model</DialogTitle>
            <Badge variant="outline" className="ml-3 bg-blue-900/30 text-blue-400 border-blue-800">
              3D View
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className={cn(
          "relative bg-black",
          isFullscreen ? "h-[calc(100vh-115px)]" : "h-[500px]"
        )}>
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-400">Loading BIM model...</p>
            </div>
          ) : (
            <div className="h-full w-full relative overflow-hidden">
              {/* Placeholder for 3D BIM model - in a real app, this would be a Three.js canvas */}
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
                <div className="relative w-full h-full">
                  <img 
                    src="https://www.constructible.trimble.com/hs-fs/hubfs/BIM%20in%20Construction.jpg" 
                    alt="BIM model placeholder" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <Orbit className="h-12 w-12 text-blue-500 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Interactive BIM Model</h3>
                    <p className="text-gray-300 max-w-md">
                      This is a placeholder for an interactive 3D BIM model. In a production environment, 
                      this would be rendered using Three.js or a specialized BIM viewer library.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="h-8 w-8 bg-black text-white border border-gray-700"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="h-8 w-8 bg-black text-white border border-gray-700"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="h-8 w-8 bg-black text-white border border-gray-700"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="px-4 py-3 flex justify-between items-center bg-black border-t border-gray-800">
          <div className="text-sm text-gray-400">
            <span className="font-medium text-white">Latest Version</span>
            <span className="mx-2">•</span>
            <span className="text-xs">Updated 3 days ago</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs border-blue-700 bg-blue-900/50 hover:bg-blue-800 text-white">
              Download BIM
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
