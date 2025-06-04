
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SiteAnalysis } from './SiteAnalysis';
import { FeasibilityStudies } from './FeasibilityStudies';
import { ZoningCompliance } from './ZoningCompliance';
import { MarketAnalysis } from './MarketAnalysis';
import { SiteSelectionHeader } from './SiteSelectionHeader';
import { BusinessCaseDevelopment } from './BusinessCaseDevelopment';
import { FlexsimIntegration } from './FlexsimIntegration';
import { SiteComparison } from './SiteComparison';
import { PreliminarySpacePlan } from './PreliminarySpacePlan';
import { DocumentReviewSection } from './DocumentReviewSection';

export function SiteSelectionDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <SiteSelectionHeader />
      
      <Tabs defaultValue="business-case" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800 grid grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="business-case">Business Case</TabsTrigger>
          <TabsTrigger value="flexsim">Flexsim API</TabsTrigger>
          <TabsTrigger value="comparison">Site Comparison</TabsTrigger>
          <TabsTrigger value="space-plan">Space Plan</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="analysis">Site Analysis</TabsTrigger>
          <TabsTrigger value="feasibility">Feasibility</TabsTrigger>
          <TabsTrigger value="zoning">Zoning</TabsTrigger>
        </TabsList>
        
        <TabsContent value="business-case" className="mt-6">
          <BusinessCaseDevelopment />
        </TabsContent>
        
        <TabsContent value="flexsim" className="mt-6">
          <FlexsimIntegration />
        </TabsContent>
        
        <TabsContent value="comparison" className="mt-6">
          <SiteComparison />
        </TabsContent>
        
        <TabsContent value="space-plan" className="mt-6">
          <PreliminarySpacePlan />
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <DocumentReviewSection />
        </TabsContent>
        
        <TabsContent value="analysis" className="mt-6">
          <SiteAnalysis />
        </TabsContent>
        
        <TabsContent value="feasibility" className="mt-6">
          <FeasibilityStudies />
        </TabsContent>
        
        <TabsContent value="zoning" className="mt-6">
          <ZoningCompliance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
