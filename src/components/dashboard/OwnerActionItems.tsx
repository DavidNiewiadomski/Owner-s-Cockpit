
import React from 'react';
import { AlertTriangle, FileText, CheckCircle, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function OwnerActionItems() {
  return (
    <Card className="bg-black border-gray-700 shadow-lg shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-bold">Owner Action Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-black rounded-lg border border-amber-500/80 shadow-[0_0_10px_rgba(251,191,36,0.2)]">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-sm">Budget Approval Required</h4>
                <p className="text-xs text-white mt-1">Change order for East Tower HVAC upgrade needs approval.</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-amber-300 font-medium">Due in 3 days</span>
                  <Button size="sm" variant="destructive" className="h-7 text-xs font-medium">Review</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-black rounded-lg border border-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-sm">Document Review</h4>
                <p className="text-xs text-white mt-1">Updated construction contracts for Westside Park project.</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-blue-300 font-medium">5 documents</span>
                  <Button size="sm" variant="secondary" className="h-7 text-xs bg-blue-900/50 hover:bg-blue-900 text-white border-blue-500">View</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-black rounded-lg border border-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-sm">Schedule Site Visit</h4>
                <p className="text-xs text-white mt-1">North Bridge project reached structural completion milestone.</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-green-300 font-medium">Milestone achieved</span>
                  <Button size="sm" variant="outline" className="h-7 text-xs border-green-500 text-green-200 hover:text-white hover:bg-green-900/50">Schedule</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-black rounded-lg border border-purple-500/80 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
            <div className="flex items-start gap-3">
              <Construction className="h-5 w-5 text-purple-300 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-sm">Design Decision Needed</h4>
                <p className="text-xs text-white mt-1">Facade material selection for East Tower project.</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-purple-300 font-medium">3 options available</span>
                  <Button size="sm" variant="outline" className="h-7 text-xs border-purple-500 text-purple-200 hover:text-white hover:bg-purple-900/50">Review Options</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
