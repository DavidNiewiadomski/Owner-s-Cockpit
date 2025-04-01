
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Camera, X, Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RealityCaptureViewerProps {
  captureUrl?: string;
  captureDate?: string;
  projectName?: string;
  location?: string;
  onClose?: () => void;
  className?: string;
}

export function RealityCaptureViewer({
  captureUrl = 'https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-08/construction%20scan%20nav.jpg',
  captureDate = 'April 15, 2024',
  projectName = 'Downtown High-Rise',
  location = 'Floor 3 - East Wing',
  onClose,
  className
}: RealityCaptureViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [captureUrl]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 150) setZoomLevel(zoomLevel + 10);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) setZoomLevel(zoomLevel - 10);
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 border-gray-800 bg-black",
      isFullscreen ? "fixed inset-0 z-50 m-0 rounded-none" : "h-[500px]",
      className
    )}>
      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between bg-black border-b border-gray-800">
        <div className="flex items-center">
          <Camera className="h-5 w-5 mr-2 text-blue-400" />
          <CardTitle className="text-base font-medium text-white">{projectName} Reality Capture</CardTitle>
          <Badge variant="outline" className="ml-3 bg-blue-900/30 text-blue-400 border-blue-800">
            {captureDate}
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
          {onClose && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className={cn(
        "p-0 relative overflow-hidden flex items-center justify-center bg-black",
        isFullscreen ? "h-[calc(100vh-115px)]" : "h-[380px]"
      )}>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-400">Loading 360° view...</p>
            </div>
          </div>
        ) : (
          <>
            <img 
              src={captureUrl} 
              alt="Reality capture" 
              className="transition-all duration-300 hover:scale-105"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8 bg-black text-white border border-gray-700"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8 bg-black text-white border border-gray-700"
                onClick={handleZoomOut}
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
          </>
        )}
      </CardContent>
      <CardFooter className="px-4 py-3 flex justify-between items-center bg-black border-t border-gray-800">
        <div className="text-sm text-gray-400">
          <span className="font-medium text-white">{location}</span>
          <span className="mx-2">•</span>
          <span className="text-xs">Captured on {captureDate}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs border-gray-700 bg-black hover:bg-gray-900 text-white">
            Previous Capture
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs border-blue-700 bg-blue-900/50 hover:bg-blue-800 text-white">
            Next Capture
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
