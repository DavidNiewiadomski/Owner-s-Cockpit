
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Calendar, DollarSign, Users, AlertTriangle } from 'lucide-react';

const rfps = [
  {
    id: 'RFP-2024-001',
    title: 'Arsenal-1 Hyperscale Manufacturing Facility',
    category: 'Construction',
    issueDate: '2024-05-15',
    responseDeadline: '2024-06-06',
    estimatedValue: '$15,000,000',
    averageCost: '$14.2M',
    responses: 12,
    status: 'Critical',
    location: 'Pickaway County, OH',
    daysRemaining: 1
  },
  {
    id: 'RFP-2024-002', 
    title: 'Quonset Point AUV Plant Infrastructure',
    category: 'MEP Systems',
    issueDate: '2024-05-20',
    responseDeadline: '2024-06-15',
    estimatedValue: '$8,500,000',
    averageCost: '$8.1M',
    responses: 8,
    status: 'Open',
    location: 'North Kingstown, RI',
    daysRemaining: 10
  },
  {
    id: 'RFP-2024-003',
    title: 'South Coast Technology Center Site Prep',
    category: 'Civil',
    issueDate: '2024-05-25',
    responseDeadline: '2024-07-01',
    estimatedValue: '$2,800,000',
    averageCost: '$2.9M',
    responses: 6,
    status: 'Open',
    location: 'Santa Ana, CA',
    daysRemaining: 26
  },
  {
    id: 'RFP-2024-004',
    title: 'Atlanta UAV Studios Completion Package',
    category: 'Interior/Systems',
    issueDate: '2024-06-01',
    responseDeadline: '2024-06-20',
    estimatedValue: '$4,200,000',
    averageCost: '$4.0M',
    responses: 5,
    status: 'Open',
    location: 'Atlanta, GA',
    daysRemaining: 15
  }
];

export function RFPManagement() {
  const getStatusBadge = (status: string, daysRemaining: number) => {
    if (status === 'Critical' || daysRemaining <= 2) {
      return (
        <Badge className="bg-red-600 text-white border-red-500 animate-pulse">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Critical
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-blue-500 text-blue-400">
        Open
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                RFP Management (Auto Review & Leveling/AI Insights)
              </CardTitle>
              <CardDescription className="text-gray-400">
                Critical dates and anticipated costs for active RFPs
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
                <TableHead className="text-gray-400">Financial Impact</TableHead>
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
                      <div className="text-xs text-gray-500">{rfp.location}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        Due: {rfp.responseDeadline}
                      </div>
                      <div className={`text-xs font-medium ${
                        rfp.daysRemaining <= 2 ? 'text-red-400' : 
                        rfp.daysRemaining <= 7 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {rfp.daysRemaining} days remaining
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-green-400">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {rfp.estimatedValue}
                      </div>
                      <div className="text-xs text-gray-400">
                        Avg: {rfp.averageCost}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-white">
                      <Users className="h-4 w-4 mr-1" />
                      {rfp.responses}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(rfp.status, rfp.daysRemaining)}
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
