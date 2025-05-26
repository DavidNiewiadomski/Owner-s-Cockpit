
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Clock, HardHat, Briefcase } from 'lucide-react';

const laborData = [
  {
    id: 'LAB001',
    name: 'John Smith',
    role: 'Site Supervisor',
    skill: 'Electrical',
    project: 'East Tower',
    hoursWorked: 42,
    availability: 'Available',
    certifications: ['OSHA', 'Electrical License'],
    hourlyRate: '$35'
  },
  {
    id: 'LAB002',
    name: 'Maria Garcia',
    role: 'Heavy Equipment Operator',
    skill: 'Machinery',
    project: 'West Plaza',
    hoursWorked: 38,
    availability: 'Busy',
    certifications: ['Crane Operator', 'Safety'],
    hourlyRate: '$28'
  },
  {
    id: 'LAB003',
    name: 'David Chen',
    role: 'Concrete Specialist',
    skill: 'Concrete Work',
    project: 'North Building',
    hoursWorked: 40,
    availability: 'Available',
    certifications: ['Concrete Finishing', 'Quality Control'],
    hourlyRate: '$32'
  }
];

export function LaborManagement() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Total Workers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">248</div>
            <p className="text-sm text-gray-400">Active workforce</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-400" />
              Hours This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">9,840</div>
            <p className="text-sm text-gray-400">Total hours logged</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <HardHat className="h-5 w-5 text-purple-400" />
              Available Workers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">67</div>
            <p className="text-sm text-gray-400">Ready for assignment</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-cyan-400" />
              Specialists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-400">45</div>
            <p className="text-sm text-gray-400">Certified specialists</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Labor Force Overview</CardTitle>
          <CardDescription className="text-gray-400">
            Current workforce allocation and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Worker ID</TableHead>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Role</TableHead>
                <TableHead className="text-gray-300">Project</TableHead>
                <TableHead className="text-gray-300">Hours/Week</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Rate</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laborData.map((worker) => (
                <TableRow key={worker.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">{worker.id}</TableCell>
                  <TableCell className="text-gray-300">{worker.name}</TableCell>
                  <TableCell className="text-gray-300">{worker.role}</TableCell>
                  <TableCell className="text-gray-300">{worker.project}</TableCell>
                  <TableCell className="text-gray-300">{worker.hoursWorked}</TableCell>
                  <TableCell>
                    <Badge variant={worker.availability === 'Available' ? 'default' : 'secondary'}>
                      {worker.availability}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{worker.hourlyRate}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Assign
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
