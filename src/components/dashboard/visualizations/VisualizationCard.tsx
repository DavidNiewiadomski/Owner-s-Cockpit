
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize2, Orbit } from 'lucide-react';

interface VisualizationCardProps {
  title: string;
  imageSrc: string;
  onFullScreen: () => void;
}

export function VisualizationCard({ title, imageSrc, onFullScreen }: VisualizationCardProps) {
  return (
    <Card className="bg-black border-cyan-900/30 overflow-hidden p-4">
      <div className="flex flex-col h-80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Orbit className="h-5 w-5 mr-2 text-blue-400" />
            <h3 className="text-lg font-medium text-white">{title}</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 border-blue-700 bg-blue-900/30 hover:bg-blue-800 text-white"
            onClick={onFullScreen}
          >
            <Maximize2 className="h-4 w-4 mr-1" />
            View Full Screen
          </Button>
        </div>
        <div className="flex-1 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <img 
            src={imageSrc} 
            alt={`${title} visualization`} 
            className="h-64 object-cover opacity-60 cursor-pointer"
            onClick={onFullScreen}
          />
        </div>
      </div>
    </Card>
  );
}
