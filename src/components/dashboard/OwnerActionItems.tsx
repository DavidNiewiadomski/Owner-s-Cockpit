
import React from 'react';
import { AlertTriangle, FileText, CheckCircle, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function OwnerActionItems() {
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Owner Action Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-gray-750 rounded-lg border border-amber-800/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-white text-sm">Budget Approval Required</h4>
                <p className="text-xs text-gray-400 mt-1">Change order for East Tower HVAC upgrade needs approval.</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-amber-400">Due in 3 days</span>
                  <Button size="sm" variant="destructive" className="h-7 text-xs">Review</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-gray-750 rounded-lg border border-blue-800/30">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-white text-sm">Document Review</h4>
                <p className="text-xs text-gray-400 mt-1">Updated construction contracts for Westside Park project.</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-blue-400">5 documents</span>
                  <Button size="sm" variant="secondary" className="h-7 text-xs">View</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-gray-750 rounded-lg border border-green-800/30">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-white text-sm">Schedule Site Visit</h4>
                <p className="text-xs text-gray-400 mt-1">North Bridge project reached structural completion milestone.</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-green-400">Milestone achieved</span>
                  <Button size="sm" variant="outline" className="h-7 text-xs">Schedule</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-gray-750 rounded-lg border border-construction-800/30">
            <div className="flex items-start gap-3">
              <Construction className="h-5 w-5 text-construction-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-white text-sm">Design Decision Needed</h4>
                <p className="text-xs text-gray-400 mt-1">Facade material selection for East Tower project.</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-construction-400">3 options available</span>
                  <Button size="sm" variant="outline" className="h-7 text-xs">Review Options</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
