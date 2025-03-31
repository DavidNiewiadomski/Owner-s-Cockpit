
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer } from '@/components/ui/chart';

interface GanttChartProps {
  data: Array<{
    name: string;
    plannedStart: number;
    plannedEnd: number;
    actualStart: number | null;
    actualEnd: number | null;
    completion: number;
  }>;
}

export function GanttChart({ data }: GanttChartProps) {
  // Calculate the maximum week for scaling
  const maxWeek = Math.max(...data.map(item => Math.max(item.plannedEnd, item.actualEnd || 0))) + 2;
  
  // Today is week 18 (as shown in the example)
  const todayWeek = 18;
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Gantt Chart</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-200 text-blue-800 border-blue-500 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-700">
              Planned
            </Badge>
            <Badge variant="outline" className="bg-green-200 text-green-800 border-green-500 dark:bg-green-950 dark:text-green-300 dark:border-green-700">
              Actual
            </Badge>
            <Badge variant="outline" className="bg-purple-200 text-purple-800 border-purple-500 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-700">
              % Complete
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          {/* Week scale */}
          <div className="flex border-b mb-2 pb-2">
            <div className="w-40 shrink-0"></div>
            <div className="flex-1 flex">
              {Array.from({ length: maxWeek }).map((_, i) => (
                <div 
                  key={i} 
                  className={`text-xs text-center ${i === todayWeek ? 'text-red-500 font-bold' : ''}`}
                  style={{ width: '20px' }}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
          
          {/* Week labels */}
          <div className="flex border-b mb-2 pb-1">
            <div className="w-40 shrink-0"></div>
            <div className="flex-1 flex">
              {Array.from({ length: Math.ceil(maxWeek / 5) }).map((_, i) => (
                <div 
                  key={`week-${i}`}
                  className="text-xs text-gray-500 dark:text-gray-400"
                  style={{ width: '100px', marginLeft: i > 0 ? '0px' : '0px' }}
                >
                  W{i * 5}
                </div>
              ))}
            </div>
          </div>
          
          {/* Today line */}
          <div className="absolute top-8 bottom-0 border-l-2 border-red-500 z-10"
            style={{ 
              left: `calc(40px + (${todayWeek} * 20px))`,
              borderStyle: 'dashed'
            }}>
            <div className="absolute -top-0 -left-12 bg-red-100 text-red-800 px-1 rounded text-xs whitespace-nowrap dark:bg-red-900/30 dark:text-red-300">
              Today
            </div>
          </div>
          
          {/* Tasks */}
          <div className="space-y-4" style={{ minHeight: '500px' }}>
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-40 shrink-0 pr-2 font-medium text-sm">
                  {item.name}
                </div>
                <div className="flex-1 relative h-8" style={{ minWidth: `${maxWeek * 20}px` }}>
                  {/* Vertical week guides */}
                  {Array.from({ length: maxWeek }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`absolute top-0 bottom-0 border-l ${i % 5 === 0 ? 'border-gray-300 dark:border-gray-600' : 'border-gray-200 dark:border-gray-700'}`}
                      style={{ left: `${i * 20}px` }}
                    />
                  ))}
                  
                  {/* Planned bar */}
                  <div 
                    className="absolute h-6 rounded-md bg-blue-500 opacity-80 flex items-center justify-center z-10"
                    style={{ 
                      left: `${item.plannedStart * 20}px`,
                      width: `${(item.plannedEnd - item.plannedStart) * 20}px`,
                      top: '4px'
                    }}
                  >
                  </div>
                  
                  {/* Actual progress bar */}
                  {item.completion > 0 && (
                    <div 
                      className="absolute h-6 rounded-l-md bg-purple-600 z-20 opacity-80"
                      style={{ 
                        left: `${item.plannedStart * 20}px`,
                        width: `${(item.plannedEnd - item.plannedStart) * item.completion / 100 * 20}px`,
                        top: '4px'
                      }}
                    />
                  )}
                  
                  {/* Actual bar */}
                  {item.actualStart !== null && (
                    <div 
                      className="absolute h-3 rounded-md bg-green-600 z-30"
                      style={{ 
                        left: `${item.actualStart * 20}px`,
                        width: `${(item.actualEnd !== null ? item.actualEnd - item.actualStart : 2) * 20}px`,
                        top: '14px'
                      }}
                    />
                  )}
                  
                  {/* Week numbers at start and end of planned */}
                  <div className="absolute -top-5 text-xs text-gray-500 dark:text-gray-400"
                    style={{ left: `${item.plannedStart * 20}px` }}>
                    W{item.plannedStart}
                  </div>
                  <div className="absolute -top-5 text-xs text-gray-500 dark:text-gray-400"
                    style={{ left: `${item.plannedEnd * 20}px` }}>
                    W{item.plannedEnd}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
