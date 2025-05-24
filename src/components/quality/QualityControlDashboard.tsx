
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QualityInspections } from './QualityInspections';
import { QualityMetrics } from './QualityMetrics';
import { NonConformanceTracking } from './NonConformanceTracking';
import { QualityReports } from './QualityReports';
import { QualityControlHeader } from './QualityControlHeader';

export function QualityControlDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <QualityControlHeader />
      
      <Tabs defaultValue="inspections" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="metrics">Quality Metrics</TabsTrigger>
          <TabsTrigger value="nonconformance">Non-Conformance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inspections" className="mt-6">
          <QualityInspections />
        </TabsContent>
        
        <TabsContent value="metrics" className="mt-6">
          <QualityMetrics />
        </TabsContent>
        
        <TabsContent value="nonconformance" className="mt-6">
          <NonConformanceTracking />
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <QualityReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}
