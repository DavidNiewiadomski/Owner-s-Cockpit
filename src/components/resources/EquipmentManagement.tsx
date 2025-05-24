
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Wrench, MapPin, Calendar, AlertCircle } from 'lucide-react';

const equipmentData = [
  {
    id: 'EQ001',
    name: 'Excavator CAT 320',
    type: 'Heavy Machinery',
    location: 'Site A - Foundation',
    status: 'Active',
    utilization: '87%',
    nextMaintenance: '2024-01-15',
    condition: 'Good'
  },
  {
    id: 'EQ002',
    name: 'Tower Crane TC-7031',
    type: 'Lifting Equipment',
    location: 'Site B - Structure',
    status: 'Active',
    utilization: '92%',
    nextMaintenance: '2024-01-08',
    condition: 'Excellent'
  },
  {
    id: 'EQ003',
    name: 'Concrete Mixer KM-250',
    type: 'Mixing Equipment',
    location: 'Site A - Concrete',
    status: 'Maintenance',
    utilization: '0%',
    nextMaintenance: '2024-01-05',
    condition: 'Needs Repair'
  }
];

export function EquipmentManagement() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Wrench className="h-5 w-5 text-blue-400" />
              Active Equipment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">127</div>
            <p className="text-sm text-gray-400">Units currently deployed</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-400" />
              Maintenance Due
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400">8</div>
            <p className="text-sm text-gray-400">Units require service</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              Down Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">3</div>
            <p className="text-sm text-gray-400">Units out of service</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Equipment Inventory</CardTitle>
          <CardDescription className="text-gray-400">
            Current status and location of all equipment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Equipment ID</TableHead>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Location</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Utilization</TableHead>
                <TableHead className="text-gray-300">Next Maintenance</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipmentData.map((equipment) => (
                <TableRow key={equipment.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">{equipment.id}</TableCell>
                  <TableCell className="text-gray-300">{equipment.name}</TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {equipment.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={equipment.status === 'Active' ? 'default' : 'destructive'}>
                      {equipment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{equipment.utilization}</TableCell>
                  <TableCell className="text-gray-300">{equipment.nextMaintenance}</TableCell>
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
