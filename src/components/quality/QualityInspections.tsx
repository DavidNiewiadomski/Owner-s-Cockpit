
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardCheck, Calendar, MapPin, User } from 'lucide-react';

const inspectionData = [
  {
    id: 'INS001',
    type: 'Structural Inspection',
    location: 'East Tower - Floor 15',
    inspector: 'Sarah Johnson',
    scheduledDate: '2024-01-08',
    status: 'Scheduled',
    priority: 'High',
    checklist: 'Foundation & Structural'
  },
  {
    id: 'INS002',
    type: 'Electrical Safety Check',
    location: 'West Plaza - Main Panel',
    inspector: 'Mike Rodriguez',
    scheduledDate: '2024-01-06',
    status: 'In Progress',
    priority: 'Medium',
    checklist: 'Electrical Systems'
  },
  {
    id: 'INS003',
    type: 'Concrete Quality Test',
    location: 'North Building - Slab C3',
    inspector: 'Emily Chen',
    scheduledDate: '2024-01-05',
    status: 'Completed',
    priority: 'High',
    checklist: 'Material Quality'
  }
];

export function QualityInspections() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-blue-400" />
              Total Inspections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">156</div>
            <p className="text-sm text-gray-400">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-400" />
              Scheduled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">23</div>
            <p className="text-sm text-gray-400">Upcoming this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-amber-400" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400">8</div>
            <p className="text-sm text-gray-400">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-green-400" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">125</div>
            <p className="text-sm text-gray-400">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Inspection Schedule</CardTitle>
          <CardDescription className="text-gray-400">
            Upcoming and ongoing quality inspections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Inspection ID</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Location</TableHead>
                <TableHead className="text-gray-300">Inspector</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Priority</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspectionData.map((inspection) => (
                <TableRow key={inspection.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">{inspection.id}</TableCell>
                  <TableCell className="text-gray-300">{inspection.type}</TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {inspection.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-gray-400" />
                      {inspection.inspector}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{inspection.scheduledDate}</TableCell>
                  <TableCell>
                    <Badge variant={
                      inspection.status === 'Completed' ? 'default' : 
                      inspection.status === 'In Progress' ? 'secondary' : 
                      'destructive'
                    }>
                      {inspection.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={inspection.priority === 'High' ? 'destructive' : 'outline'}>
                      {inspection.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
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
