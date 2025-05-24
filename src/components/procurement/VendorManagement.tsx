
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star, MapPin, Phone, Mail, Plus } from 'lucide-react';

const vendors = [
  {
    id: 1,
    name: 'BuildRight Materials',
    category: 'Construction Materials',
    rating: 4.8,
    location: 'Chicago, IL',
    phone: '(555) 123-4567',
    email: 'contact@buildright.com',
    status: 'Active',
    totalOrders: 23,
    totalValue: '$486,000'
  },
  {
    id: 2,
    name: 'SteelWorks Industrial',
    category: 'Steel & Metal',
    rating: 4.6,
    location: 'Detroit, MI',
    phone: '(555) 234-5678',
    email: 'sales@steelworks.com',
    status: 'Active',
    totalOrders: 15,
    totalValue: '$1,250,000'
  },
  {
    id: 3,
    name: 'ElectroTech Solutions',
    category: 'Electrical Systems',
    rating: 4.9,
    location: 'Milwaukee, WI',
    phone: '(555) 345-6789',
    email: 'info@electrotech.com',
    status: 'Preferred',
    totalOrders: 31,
    totalValue: '$678,000'
  }
];

export function VendorManagement() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Vendor Directory</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your approved vendor network
              </CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-800">
                <TableHead className="text-gray-400">Vendor</TableHead>
                <TableHead className="text-gray-400">Category</TableHead>
                <TableHead className="text-gray-400">Rating</TableHead>
                <TableHead className="text-gray-400">Contact</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id} className="border-b border-gray-800">
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{vendor.name}</div>
                      <div className="flex items-center text-sm text-gray-400 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {vendor.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">{vendor.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-white">{vendor.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-400">
                        <Phone className="h-3 w-3 mr-1" />
                        {vendor.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Mail className="h-3 w-3 mr-1" />
                        {vendor.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        vendor.status === 'Preferred' 
                          ? 'border-green-500 text-green-400' 
                          : 'border-blue-500 text-blue-400'
                      }
                    >
                      {vendor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="text-white">{vendor.totalOrders} orders</div>
                      <div className="text-green-400">{vendor.totalValue}</div>
                    </div>
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
