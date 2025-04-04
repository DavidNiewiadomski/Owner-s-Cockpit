
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
    <Card className={`bg-gradient-to-br from-gray-900/95 to-black border-gray-800/50 overflow-hidden p-4 transition-all duration-300 hover:translate-y-[-4px] ${className || ''}`}>
      <div className="flex flex-col h-80">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700/50 mr-3">
              <Orbit className="h-4 w-4 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 border-gray-700 bg-gray-800/50 hover:bg-gray-700/70 text-white"
            onClick={onFullScreen}
          >
            <Maximize2 className="h-4 w-4 mr-1.5 text-cyan-400" />
            View Full Screen
          </Button>
        </div>
        <div className="flex-1 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center border border-gray-800/50 rounded-md overflow-hidden">
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
