
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EquipmentManagement } from './EquipmentManagement';
import { MaterialsManagement } from './MaterialsManagement';
import { LaborManagement } from './LaborManagement';
import { ResourceAnalytics } from './ResourceAnalytics';
import { ResourceManagementHeader } from './ResourceManagementHeader';

export function ResourceManagementDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <ResourceManagementHeader />
      
      <Tabs defaultValue="equipment" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="equipment" className="mt-6">
          <EquipmentManagement />
        </TabsContent>
        
        <TabsContent value="materials" className="mt-6">
          <MaterialsManagement />
        </TabsContent>
        
        <TabsContent value="labor" className="mt-6">
          <LaborManagement />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <ResourceAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
