
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShoppingCart, Calendar, Truck } from 'lucide-react';

const purchaseOrders = [
  {
    id: 'PO-2025-0001',
    vendor: 'BuildRight Materials',
    description: 'Concrete and Aggregate Materials',
    orderDate: '2025-01-22',
    deliveryDate: '2025-02-05',
    amount: '$45,600',
    status: 'Approved'
  },
  {
    id: 'PO-2025-0002',
    vendor: 'SteelWorks Industrial',
    description: 'Structural Steel Beams',
    orderDate: '2025-01-20',
    deliveryDate: '2025-02-15',
    amount: '$125,000',
    status: 'In Transit'
  },
  {
    id: 'PO-2025-0003',
    vendor: 'ElectroTech Solutions',
    description: 'Electrical Panel Upgrades',
    orderDate: '2025-01-18',
    deliveryDate: '2025-02-01',
    amount: '$32,400',
    status: 'Delivered'
  }
];

export function PurchaseOrders() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Purchase Orders</CardTitle>
              <CardDescription className="text-gray-400">
                Track and manage all purchase orders
              </CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ShoppingCart className="h-4 w-4 mr-2" />
              New Purchase Order
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-800">
                <TableHead className="text-gray-400">Order Details</TableHead>
                <TableHead className="text-gray-400">Vendor</TableHead>
                <TableHead className="text-gray-400">Timeline</TableHead>
                <TableHead className="text-gray-400">Amount</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((po) => (
                <TableRow key={po.id} className="border-b border-gray-800">
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{po.id}</div>
                      <div className="text-sm text-gray-400">{po.description}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">{po.vendor}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        Ordered: {po.orderDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Truck className="h-3 w-3 mr-1" />
                        Delivery: {po.deliveryDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-green-400 font-medium">{po.amount}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        po.status === 'Delivered' 
                          ? 'border-green-500 text-green-400' 
                          : po.status === 'In Transit'
                          ? 'border-blue-500 text-blue-400'
                          : 'border-amber-500 text-amber-400'
                      }
                    >
                      {po.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      View Order
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
