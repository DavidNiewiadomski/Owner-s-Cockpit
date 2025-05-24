
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssetManagement } from './AssetManagement';
import { MaintenanceScheduling } from './MaintenanceScheduling';
import { EnergyManagement } from './EnergyManagement';
import { TenantManagement } from './TenantManagement';
import { FacilitiesHeader } from './FacilitiesHeader';

export function FacilitiesManagementDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <FacilitiesHeader />
      
      <Tabs defaultValue="assets" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="assets">Asset Management</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="energy">Energy Management</TabsTrigger>
          <TabsTrigger value="tenants">Tenant Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assets" className="mt-6">
          <AssetManagement />
        </TabsContent>
        
        <TabsContent value="maintenance" className="mt-6">
          <MaintenanceScheduling />
        </TabsContent>
        
        <TabsContent value="energy" className="mt-6">
          <EnergyManagement />
        </TabsContent>
        
        <TabsContent value="tenants" className="mt-6">
          <TenantManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
