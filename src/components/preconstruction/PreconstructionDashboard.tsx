
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DesignPlans } from './DesignPlans';
import { SiteAssessments } from './SiteAssessments';
import { PermitsApprovals } from './PermitsApprovals';
import { BudgetEstimates } from './BudgetEstimates';
import { PreconstructionHeader } from './PreconstructionHeader';

export function PreconstructionDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PreconstructionHeader />
      
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Manufacturing Facilities in Development</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-800 rounded p-3">
            <div className="text-cyan-400 font-medium">Arsenal-1 Hyperscale Manufacturing</div>
            <div className="text-gray-300">Advanced manufacturing complex</div>
            <div className="text-green-400 text-xs mt-1">Construction Phase</div>
          </div>
          <div className="bg-gray-800 rounded p-3">
            <div className="text-cyan-400 font-medium">Atlanta UAV Allied Studios</div>
            <div className="text-gray-300">Specialized UAV production facility</div>
            <div className="text-yellow-400 text-xs mt-1">Interior & Systems Phase</div>
          </div>
          <div className="bg-gray-800 rounded p-3">
            <div className="text-cyan-400 font-medium">Quonset Point AUV Plant</div>
            <div className="text-gray-300">Marine AUV manufacturing</div>
            <div className="text-red-400 text-xs mt-1">Site Preparation Phase</div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="design" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="design">Design Plans</TabsTrigger>
          <TabsTrigger value="assessments">Site Assessments</TabsTrigger>
          <TabsTrigger value="permits">Permits & Approvals</TabsTrigger>
          <TabsTrigger value="budget">Budget Estimates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="design" className="mt-6">
          <DesignPlans />
        </TabsContent>
        
        <TabsContent value="assessments" className="mt-6">
          <SiteAssessments />
        </TabsContent>
        
        <TabsContent value="permits" className="mt-6">
          <PermitsApprovals />
        </TabsContent>
        
        <TabsContent value="budget" className="mt-6">
          <BudgetEstimates />
        </TabsContent>
      </Tabs>
    </div>
  );
}
