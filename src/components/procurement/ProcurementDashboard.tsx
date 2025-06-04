
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
      
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Active Manufacturing Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-800 rounded p-3">
            <div className="text-cyan-400 font-medium">Arsenal-1 Hyperscale Manufacturing</div>
            <div className="text-gray-300">Pickaway County, OH</div>
          </div>
          <div className="bg-gray-800 rounded p-3">
            <div className="text-cyan-400 font-medium">Atlanta UAV Allied Studios</div>
            <div className="text-gray-300">1435 Hills Pl. NW, Atlanta GA</div>
          </div>
          <div className="bg-gray-800 rounded p-3">
            <div className="text-cyan-400 font-medium">Quonset Point AUV Plant</div>
            <div className="text-gray-300">Quonset Business Park, RI</div>
          </div>
        </div>
      </div>
      
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
