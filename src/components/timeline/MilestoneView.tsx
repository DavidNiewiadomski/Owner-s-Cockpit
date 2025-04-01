
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface Milestone {
  name: string;
  plannedDate: string;
  actualDate: string;
  status: 'completed' | 'delayed' | 'in-progress' | 'upcoming';
  description?: string;
  realityCapture?: {
    available: boolean;
    date?: string;
    url?: string;
  };
}

interface MilestoneViewProps {
  milestones: Milestone[];
  onViewRealityCapture: (milestone: Milestone) => void;
}

export function MilestoneView({ milestones, onViewRealityCapture }: MilestoneViewProps) {
  return (
    <Card className="border-cyan-900/30 bg-gradient-to-br from-black to-zinc-900 shadow-[0_4px_30px_rgba(56,189,248,0.15)]">
      <CardHeader className="bg-gradient-to-r from-cyan-950/50 to-transparent border-b border-cyan-900/20">
        <CardTitle className="text-gradient text-xl">Project Milestones</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-1 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-blue-500/50 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.3)]"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative ml-8 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className={`absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 z-10 animate-pulse-glow ${
                    milestone.status === 'completed' ? 'bg-green-500/90 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
                    milestone.status === 'in-progress' ? 'bg-blue-500/90 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]' :
                    milestone.status === 'delayed' ? 'bg-red-500/90 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                    'bg-gray-500/90 border-gray-400 shadow-[0_0_10px_rgba(107,114,128,0.5)]'
                  }`}></div>
                  <div className="flex flex-col sm:flex-row">
                    <div className="mb-2 sm:mb-0 sm:w-36 font-medium text-cyan-300">
                      {milestone.actualDate !== 'Not Started' ? milestone.actualDate : milestone.plannedDate}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold text-lg ${
                        milestone.status === 'delayed' ? 'text-red-400' :
                        milestone.status === 'completed' ? 'text-green-400' :
                        milestone.status === 'in-progress' ? 'text-blue-400' : 'text-gray-300'
                      }`}>
                        {milestone.name}
                        
                        <Badge className={`ml-2 ${
                          milestone.status === 'completed' ? 'bg-green-900/30 text-green-400 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]' :
                          milestone.status === 'in-progress' ? 'bg-blue-900/30 text-blue-400 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]' :
                          milestone.status === 'delayed' ? 'bg-red-900/30 text-red-400 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]' :
                          'bg-gray-900/30 text-gray-300 border border-gray-500/50 shadow-[0_0_10px_rgba(107,114,128,0.3)]'
                        }`}>
                          {milestone.status === 'completed' ? 'Completed' :
                          milestone.status === 'in-progress' ? 'In Progress' :
                          milestone.status === 'delayed' ? 'Delayed' : 'Upcoming'}
                        </Badge>
                        
                        {milestone.realityCapture && milestone.realityCapture.available && (
                          <Badge variant="outline" className="ml-2 bg-blue-900/30 text-blue-300 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)] flex items-center gap-1 cursor-pointer hover:bg-blue-800/40 transition-all duration-300" onClick={() => onViewRealityCapture(milestone)}>
                            <Camera className="h-3 w-3" />
                            <span>Reality Capture</span>
                          </Badge>
                        )}
                      </h4>
                      <p className="mt-1 text-muted-foreground text-sm bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">{milestone.description}</p>
                      
                      {milestone.actualDate !== milestone.plannedDate && milestone.status !== 'upcoming' && (
                        <div className="mt-2 text-xs">
                          <span className="font-medium text-gray-400">Planned: </span>
                          <span className="text-gray-300">{milestone.plannedDate}</span>
                          {milestone.status === 'delayed' && (
                            <span className="ml-2 text-red-400 font-semibold">
                              (Delayed)
                            </span>
                          )}
                          {milestone.status === 'completed' && milestone.actualDate !== milestone.plannedDate && (
                            <span className="ml-2 text-green-400 font-semibold">
                              (Early completion)
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Financial impact indicators */}
                      {milestone.status === 'completed' && index === 0 && (
                        <div className="mt-2 text-sm font-medium text-green-400">
                          -$15,000
                        </div>
                      )}
                      
                      {milestone.realityCapture && milestone.realityCapture.available && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 h-7 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 p-0 flex items-center gap-1 border border-transparent hover:border-blue-500/40 transition-all duration-300"
                          onClick={() => onViewRealityCapture(milestone)}
                        >
                          <Camera className="h-3.5 w-3.5" />
                          <span>View Reality Capture</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
