
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize2, Orbit } from 'lucide-react';

interface VisualizationCardProps {
  title: string;
  imageSrc: string;
  onFullScreen: () => void;
  className?: string;
}

export function VisualizationCard({ title, imageSrc, onFullScreen, className }: VisualizationCardProps) {
  return (
    <Card className={`bg-black border-cyan-900/30 overflow-hidden p-4 shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 visualization-card ${className || ''}`}>
      <div className="flex flex-col h-80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Orbit className="h-5 w-5 mr-2 text-cyan-400" />
            <h3 className="text-lg font-bold text-cyan-300">{title}</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 border-cyan-700 bg-cyan-900/30 hover:bg-cyan-800/50 text-white font-medium shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            onClick={onFullScreen}
          >
            <Maximize2 className="h-4 w-4 mr-1 text-cyan-300" />
            View Full Screen
          </Button>
        </div>
        <div className="flex-1 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center border border-cyan-900/20 rounded-md overflow-hidden">
          <img 
            src={imageSrc} 
            alt={`${title} visualization`} 
            className="h-full w-full object-cover opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={onFullScreen}
          />
        </div>
      </div>
    </Card>
  );
}
