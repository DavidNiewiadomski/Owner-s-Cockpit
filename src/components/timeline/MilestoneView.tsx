
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
    <Card>
      <CardHeader>
        <CardTitle>Project Milestones</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-border"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative ml-8">
                  <div className={`absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border ${
                    milestone.status === 'completed' ? 'bg-green-500 border-green-500' :
                    milestone.status === 'in-progress' ? 'bg-blue-500 border-blue-500' :
                    milestone.status === 'delayed' ? 'bg-red-500 border-red-500' :
                    'bg-gray-200 border-gray-400 dark:bg-gray-700 dark:border-gray-600'
                  }`}></div>
                  <div className="flex flex-col sm:flex-row">
                    <div className="mb-2 sm:mb-0 sm:w-36 font-medium">
                      {milestone.actualDate !== 'Not Started' ? milestone.actualDate : milestone.plannedDate}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        milestone.status === 'delayed' ? 'text-red-500' :
                        milestone.status === 'completed' ? 'text-green-500' :
                        milestone.status === 'in-progress' ? 'text-blue-500' : ''
                      }`}>
                        {milestone.name}
                        
                        <Badge className={`ml-2 ${
                          milestone.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                          milestone.status === 'delayed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-300'
                        }`}>
                          {milestone.status === 'completed' ? 'Completed' :
                          milestone.status === 'in-progress' ? 'In Progress' :
                          milestone.status === 'delayed' ? 'Delayed' : 'Upcoming'}
                        </Badge>
                        
                        {milestone.realityCapture && milestone.realityCapture.available && (
                          <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 flex items-center gap-1 cursor-pointer" onClick={() => onViewRealityCapture(milestone)}>
                            <Camera className="h-3 w-3" />
                            <span>Reality Capture</span>
                          </Badge>
                        )}
                      </h4>
                      <p className="mt-1 text-muted-foreground text-sm">{milestone.description}</p>
                      
                      {milestone.actualDate !== milestone.plannedDate && milestone.status !== 'upcoming' && (
                        <div className="mt-2 text-xs">
                          <span className="font-medium">Planned: </span>
                          <span>{milestone.plannedDate}</span>
                          {milestone.status === 'delayed' && (
                            <span className="ml-2 text-red-500">
                              (Delayed)
                            </span>
                          )}
                          {milestone.status === 'completed' && milestone.actualDate !== milestone.plannedDate && (
                            <span className="ml-2 text-green-500">
                              (Early completion)
                            </span>
                          )}
                        </div>
                      )}
                      
                      {milestone.realityCapture && milestone.realityCapture.available && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 h-7 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 flex items-center gap-1"
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
