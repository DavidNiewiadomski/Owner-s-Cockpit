
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
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800 grid grid-cols-4 lg:grid-cols-8 h-auto p-1">
          <TabsTrigger value="business-case" className="text-xs px-2 py-2">Business Case</TabsTrigger>
          <TabsTrigger value="flexsim" className="text-xs px-2 py-2">Flexsim API</TabsTrigger>
          <TabsTrigger value="comparison" className="text-xs px-2 py-2">Site Comparison</TabsTrigger>
          <TabsTrigger value="space-plan" className="text-xs px-2 py-2">Space Plan</TabsTrigger>
          <TabsTrigger value="documents" className="text-xs px-2 py-2">Documents</TabsTrigger>
          <TabsTrigger value="analysis" className="text-xs px-2 py-2">Site Analysis</TabsTrigger>
          <TabsTrigger value="feasibility" className="text-xs px-2 py-2">Feasibility</TabsTrigger>
          <TabsTrigger value="market" className="text-xs px-2 py-2">Market</TabsTrigger>
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
        
        <TabsContent value="market" className="mt-6">
          <MarketAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
}
