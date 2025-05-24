
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Calendar, DollarSign, Home } from 'lucide-react';

const tenants = [
  {
    id: 'TEN-001',
    name: 'TechCorp Solutions',
    unit: 'Building A - Suite 200',
    leaseStart: '2023-01-01',
    leaseEnd: '2026-12-31',
    monthlyRent: '$8,500',
    status: 'Active',
    contact: 'Sarah Miller',
    email: 'sarah@techcorp.com'
  },
  {
    id: 'TEN-002',
    name: 'Creative Design Studio',
    unit: 'Building B - Suite 150',
    leaseStart: '2022-06-15',
    leaseEnd: '2025-06-14',
    monthlyRent: '$6,200',
    status: 'Active',
    contact: 'Mark Johnson',
    email: 'mark@creativedesign.com'
  },
  {
    id: 'TEN-003',
    name: 'Professional Services LLC',
    unit: 'Building A - Suite 300',
    leaseStart: '2024-03-01',
    leaseEnd: '2027-02-28',
    monthlyRent: '$9,800',
    status: 'Pending Renewal',
    contact: 'Lisa Chen',
    email: 'lisa@proservices.com'
  }
];

const workOrders = [
  {
    id: 'WO-001',
    tenant: 'TechCorp Solutions',
    issue: 'HVAC Temperature Control',
    priority: 'Medium',
    status: 'In Progress',
    requestDate: '2025-01-20'
  },
  {
    id: 'WO-002',
    tenant: 'Creative Design Studio',
    issue: 'Lighting Fixture Replacement',
    priority: 'Low',
    status: 'Scheduled',
    requestDate: '2025-01-18'
  }
];

export function TenantManagement() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Tenant Directory</CardTitle>
              <CardDescription className="text-gray-400">
                Manage tenant information and lease details
              </CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Users className="h-4 w-4 mr-2" />
              Add Tenant
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-800">
                <TableHead className="text-gray-400">Tenant</TableHead>
                <TableHead className="text-gray-400">Unit</TableHead>
                <TableHead className="text-gray-400">Lease Term</TableHead>
                <TableHead className="text-gray-400">Monthly Rent</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id} className="border-b border-gray-800">
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{tenant.name}</div>
                      <div className="text-sm text-gray-400">{tenant.contact} • {tenant.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-400">
                      <Home className="h-4 w-4 mr-1" />
                      {tenant.unit}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {tenant.leaseStart} - {tenant.leaseEnd}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-green-400">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {tenant.monthlyRent}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        tenant.status === 'Active' 
                          ? 'border-green-500 text-green-400' 
                          : 'border-amber-500 text-amber-400'
                      }
                    >
                      {tenant.status}
                    </Badge>
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

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Work Orders</CardTitle>
          <CardDescription className="text-gray-400">
            Tenant maintenance requests and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-800">
                <TableHead className="text-gray-400">Work Order</TableHead>
                <TableHead className="text-gray-400">Tenant</TableHead>
                <TableHead className="text-gray-400">Issue</TableHead>
                <TableHead className="text-gray-400">Priority</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Request Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workOrders.map((order) => (
                <TableRow key={order.id} className="border-b border-gray-800">
                  <TableCell className="font-medium text-white">{order.id}</TableCell>
                  <TableCell className="text-gray-400">{order.tenant}</TableCell>
                  <TableCell className="text-gray-400">{order.issue}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        order.priority === 'High' 
                          ? 'border-red-500 text-red-400' 
                          : order.priority === 'Medium'
                          ? 'border-amber-500 text-amber-400'
                          : 'border-green-500 text-green-400'
                      }
                    >
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        order.status === 'In Progress' 
                          ? 'border-blue-500 text-blue-400' 
                          : 'border-gray-500 text-gray-400'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">{order.requestDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
