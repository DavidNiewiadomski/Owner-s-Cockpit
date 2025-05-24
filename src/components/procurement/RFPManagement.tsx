
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Calendar, DollarSign, Users } from 'lucide-react';

const rfps = [
  {
    id: 'RFP-2025-001',
    title: 'HVAC System Installation',
    category: 'Mechanical',
    issueDate: '2025-01-15',
    responseDeadline: '2025-02-15',
    estimatedValue: '$450,000',
    responses: 5,
    status: 'Open'
  },
  {
    id: 'RFP-2025-002',
    title: 'Electrical Infrastructure Upgrade',
    category: 'Electrical',
    issueDate: '2025-01-10',
    responseDeadline: '2025-02-10',
    estimatedValue: '$680,000',
    responses: 8,
    status: 'Under Review'
  },
  {
    id: 'RFP-2025-003',
    title: 'Concrete and Foundation Work',
    category: 'Structural',
    issueDate: '2025-01-20',
    responseDeadline: '2025-02-20',
    estimatedValue: '$320,000',
    responses: 3,
    status: 'Open'
  }
];

export function RFPManagement() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Request for Proposals</CardTitle>
              <CardDescription className="text-gray-400">
                Manage RFP processes and vendor responses
              </CardDescription>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <FileText className="h-4 w-4 mr-2" />
              Create RFP
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-800">
                <TableHead className="text-gray-400">RFP Details</TableHead>
                <TableHead className="text-gray-400">Timeline</TableHead>
                <TableHead className="text-gray-400">Value</TableHead>
                <TableHead className="text-gray-400">Responses</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rfps.map((rfp) => (
                <TableRow key={rfp.id} className="border-b border-gray-800">
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{rfp.title}</div>
                      <div className="text-sm text-gray-400">{rfp.id} • {rfp.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        Issued: {rfp.issueDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        Due: {rfp.responseDeadline}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-green-400">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {rfp.estimatedValue}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-white">
                      <Users className="h-4 w-4 mr-1" />
                      {rfp.responses}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        rfp.status === 'Open' 
                          ? 'border-blue-500 text-blue-400' 
                          : 'border-amber-500 text-amber-400'
                      }
                    >
                      {rfp.status}
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
    </div>
  );
}
