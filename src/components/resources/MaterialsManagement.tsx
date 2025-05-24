
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';

const materialsData = [
  {
    id: 'MAT001',
    name: 'Steel Reinforcement Bars',
    category: 'Structural Steel',
    currentStock: 2450,
    unit: 'tons',
    reorderLevel: 500,
    status: 'In Stock',
    supplier: 'SteelCorp Industries',
    lastDelivery: '2024-01-02'
  },
  {
    id: 'MAT002',
    name: 'Portland Cement',
    category: 'Concrete Materials',
    currentStock: 180,
    unit: 'tons',
    reorderLevel: 200,
    status: 'Low Stock',
    supplier: 'CementPro Ltd',
    lastDelivery: '2023-12-28'
  },
  {
    id: 'MAT003',
    name: 'Electrical Cables',
    category: 'Electrical',
    currentStock: 15000,
    unit: 'meters',
    reorderLevel: 5000,
    status: 'In Stock',
    supplier: 'ElectroSupply Co',
    lastDelivery: '2024-01-03'
  }
];

export function MaterialsManagement() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Package className="h-5 w-5 text-green-400" />
              Total Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">347</div>
            <p className="text-sm text-gray-400">Material types tracked</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Inventory Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">$1.2M</div>
            <p className="text-sm text-gray-400">Current stock value</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400">12</div>
            <p className="text-sm text-gray-400">Need reordering</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-400" />
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">3</div>
            <p className="text-sm text-gray-400">Urgent reorder needed</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Material Inventory</CardTitle>
          <CardDescription className="text-gray-400">
            Current stock levels and material status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Material ID</TableHead>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Category</TableHead>
                <TableHead className="text-gray-300">Stock Level</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Supplier</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materialsData.map((material) => (
                <TableRow key={material.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">{material.id}</TableCell>
                  <TableCell className="text-gray-300">{material.name}</TableCell>
                  <TableCell className="text-gray-300">{material.category}</TableCell>
                  <TableCell className="text-gray-300">
                    {material.currentStock.toLocaleString()} {material.unit}
                  </TableCell>
                  <TableCell>
                    <Badge variant={material.status === 'In Stock' ? 'default' : 'destructive'}>
                      {material.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{material.supplier}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Reorder
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
