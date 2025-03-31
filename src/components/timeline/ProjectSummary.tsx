
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, Calendar, AlertTriangle, ArrowRight } from 'lucide-react';

export function ProjectSummary() {
  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Project Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Status</h4>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                On Track with Minor Delays
              </Badge>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-1">Project Timeline</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                  <p className="font-medium">Nov 15, 2023</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">End Date</p>
                  <p className="font-medium">Jun 30, 2025</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">19.5 Months</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Phase</p>
                  <p className="font-medium">Exterior Walls</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Completion Status</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Overall Progress</span>
                  <span>35%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                  <div className="bg-construction-500 h-full rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Financial Impact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">$42,500,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spent to Date</span>
                  <span className="font-medium">$14,875,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Variance</span>
                  <span className="font-medium text-green-500">-$325,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projected ROI</span>
                  <span className="font-medium">7.2%</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Key Dates</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <span className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Calendar className="h-3 w-3 text-yellow-800" />
                    </span>
                    <span className="text-muted-foreground">Next Inspection</span>
                  </div>
                  <span>Apr 28, 2024</span>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Calendar className="h-3 w-3 text-green-800" />
                    </span>
                    <span className="text-muted-foreground">Payment Milestone</span>
                  </div>
                  <span>May 15, 2024</span>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <span className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Calendar className="h-3 w-3 text-blue-800" />
                    </span>
                    <span className="text-muted-foreground">Phase Completion</span>
                  </div>
                  <span>Jun 12, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Schedule Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Current Risks</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Roofing material delivery delay (1 week impact)</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Weather forecast may impact exterior work in May</span>
                </li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-1">Investment Impact</h4>
              <div className="p-3 bg-muted/50 rounded-md">
                <p className="text-sm">Current schedule tracking projects completion 2 weeks early. This could result in:</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-green-500 mr-1.5" />
                    <span>$125,000 additional rental income in Q3 2024</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-green-500 mr-1.5" />
                    <span>0.3% increase in projected ROI to 7.5%</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-green-500 mr-1.5" />
                    <span>Earlier tenant occupancy by July 2025</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">View Full Schedule Analysis</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
