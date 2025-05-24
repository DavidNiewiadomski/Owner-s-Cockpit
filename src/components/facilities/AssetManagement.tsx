
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Calendar, DollarSign, AlertTriangle } from 'lucide-react';

const assets = [
  {
    id: 'AST-001',
    name: 'HVAC System - Building A',
    category: 'HVAC',
    location: 'Building A - Floor 1',
    installDate: '2020-03-15',
    warrantyExpiry: '2025-03-15',
    value: '$125,000',
    condition: 'Good',
    nextMaintenance: '2025-02-15'
  },
  {
    id: 'AST-002',
    name: 'Elevator System - Main',
    category: 'Vertical Transport',
    location: 'Building A - Central',
    installDate: '2018-06-20',
    warrantyExpiry: '2023-06-20',
    value: '$85,000',
    condition: 'Needs Attention',
    nextMaintenance: '2025-01-30'
  },
  {
    id: 'AST-003',
    name: 'Fire Safety System',
    category: 'Safety',
    location: 'Building A - All Floors',
    installDate: '2019-09-10',
    warrantyExpiry: '2024-09-10',
    value: '$45,000',
    condition: 'Excellent',
    nextMaintenance: '2025-03-01'
  }
];

export function AssetManagement() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Asset Inventory</CardTitle>
              <CardDescription className="text-gray-400">
                Track and manage all facility assets
              </CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Building2 className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-800">
                <TableHead className="text-gray-400">Asset Details</TableHead>
                <TableHead className="text-gray-400">Location</TableHead>
                <TableHead className="text-gray-400">Value</TableHead>
                <TableHead className="text-gray-400">Condition</TableHead>
                <TableHead className="text-gray-400">Next Maintenance</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id} className="border-b border-gray-800">
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{asset.name}</div>
                      <div className="text-sm text-gray-400">{asset.id} • {asset.category}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">{asset.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-green-400">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {asset.value}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        asset.condition === 'Excellent' 
                          ? 'border-green-500 text-green-400' 
                          : asset.condition === 'Good'
                          ? 'border-blue-500 text-blue-400'
                          : 'border-amber-500 text-amber-400'
                      }
                    >
                      {asset.condition}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {asset.nextMaintenance}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      View Details
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
