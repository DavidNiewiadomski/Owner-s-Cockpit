
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Calendar, User, FileText } from 'lucide-react';

const nonConformanceData = [
  {
    id: 'NCR001',
    description: 'Concrete strength below specification',
    category: 'Material Quality',
    severity: 'High',
    reportedBy: 'John Smith',
    reportedDate: '2024-01-03',
    status: 'Open',
    corrective: 'Re-test and potential rework',
    assignedTo: 'Quality Team',
    dueDate: '2024-01-10'
  },
  {
    id: 'NCR002',
    description: 'Electrical conduit misalignment',
    category: 'Installation',
    severity: 'Medium',
    reportedBy: 'Sarah Johnson',
    reportedDate: '2024-01-02',
    status: 'In Progress',
    corrective: 'Realignment and re-inspection',
    assignedTo: 'Electrical Team',
    dueDate: '2024-01-08'
  },
  {
    id: 'NCR003',
    description: 'Welding defects on structural joints',
    category: 'Workmanship',
    severity: 'High',
    reportedBy: 'Mike Rodriguez',
    reportedDate: '2023-12-28',
    status: 'Resolved',
    corrective: 'Re-welding completed',
    assignedTo: 'Structural Team',
    dueDate: '2024-01-05'
  }
];

export function NonConformanceTracking() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Open Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">8</div>
            <p className="text-sm text-gray-400">Require attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400">12</div>
            <p className="text-sm text-gray-400">Being resolved</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-green-400" />
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">47</div>
            <p className="text-sm text-gray-400">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">3</div>
            <p className="text-sm text-gray-400">Past due date</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Non-Conformance Reports</CardTitle>
          <CardDescription className="text-gray-400">
            Active quality issues and their resolution status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">NCR ID</TableHead>
                <TableHead className="text-gray-300">Description</TableHead>
                <TableHead className="text-gray-300">Severity</TableHead>
                <TableHead className="text-gray-300">Reported By</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Assigned To</TableHead>
                <TableHead className="text-gray-300">Due Date</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nonConformanceData.map((ncr) => (
                <TableRow key={ncr.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">{ncr.id}</TableCell>
                  <TableCell className="text-gray-300 max-w-xs">
                    <div className="truncate" title={ncr.description}>
                      {ncr.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={ncr.severity === 'High' ? 'destructive' : 'secondary'}>
                      {ncr.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-gray-400" />
                      {ncr.reportedBy}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      ncr.status === 'Resolved' ? 'default' : 
                      ncr.status === 'In Progress' ? 'secondary' : 
                      'destructive'
                    }>
                      {ncr.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{ncr.assignedTo}</TableCell>
                  <TableCell className="text-gray-300">{ncr.dueDate}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Details
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
