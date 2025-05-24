
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SiteAnalysis } from './SiteAnalysis';
import { FeasibilityStudies } from './FeasibilityStudies';
import { ZoningCompliance } from './ZoningCompliance';
import { MarketAnalysis } from './MarketAnalysis';
import { SiteSelectionHeader } from './SiteSelectionHeader';

export function SiteSelectionDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <SiteSelectionHeader />
      
      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="analysis">Site Analysis</TabsTrigger>
          <TabsTrigger value="feasibility">Feasibility Studies</TabsTrigger>
          <TabsTrigger value="zoning">Zoning & Compliance</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis" className="mt-6">
          <SiteAnalysis />
        </TabsContent>
        
        <TabsContent value="feasibility" className="mt-6">
          <FeasibilityStudies />
        </TabsContent>
        
        <TabsContent value="zoning" className="mt-6">
          <ZoningCompliance />
        </TabsContent>
        
        <TabsContent value="market" className="mt-6">
          <MarketAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
}
