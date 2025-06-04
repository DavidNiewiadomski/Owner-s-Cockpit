
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
