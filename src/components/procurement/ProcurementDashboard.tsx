
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VendorManagement } from './VendorManagement';
import { RFPManagement } from './RFPManagement';
import { PurchaseOrders } from './PurchaseOrders';
import { ProcurementAnalytics } from './ProcurementAnalytics';
import { ProcurementHeader } from './ProcurementHeader';

export function ProcurementDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <ProcurementHeader />
      
      <Tabs defaultValue="vendors" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
          <TabsTrigger value="rfp">RFP Management</TabsTrigger>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vendors" className="mt-6">
          <VendorManagement />
        </TabsContent>
        
        <TabsContent value="rfp" className="mt-6">
          <RFPManagement />
        </TabsContent>
        
        <TabsContent value="orders" className="mt-6">
          <PurchaseOrders />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <ProcurementAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
