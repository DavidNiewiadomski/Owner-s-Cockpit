
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Clock, Wrench, User } from 'lucide-react';

const maintenanceTasks = [
  {
    id: 'MT-001',
    title: 'HVAC Filter Replacement',
    asset: 'HVAC System - Building A',
    type: 'Preventive',
    priority: 'Medium',
    scheduledDate: '2025-02-15',
    assignedTo: 'John Smith',
    estimatedDuration: '2 hours',
    status: 'Scheduled'
  },
  {
    id: 'MT-002',
    title: 'Elevator Safety Inspection',
    asset: 'Elevator System - Main',
    type: 'Inspection',
    priority: 'High',
    scheduledDate: '2025-01-30',
    assignedTo: 'Sarah Johnson',
    estimatedDuration: '4 hours',
    status: 'In Progress'
  },
  {
    id: 'MT-003',
    title: 'Fire Alarm System Test',
    asset: 'Fire Safety System',
    type: 'Testing',
    priority: 'High',
    scheduledDate: '2025-03-01',
    assignedTo: 'Mike Davis',
    estimatedDuration: '3 hours',
    status: 'Scheduled'
  }
];

export function MaintenanceScheduling() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Maintenance Schedule</CardTitle>
              <CardDescription className="text-gray-400">
                Plan and track maintenance activities
              </CardDescription>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Maintenance
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-800">
                <TableHead className="text-gray-400">Task Details</TableHead>
                <TableHead className="text-gray-400">Asset</TableHead>
                <TableHead className="text-gray-400">Schedule</TableHead>
                <TableHead className="text-gray-400">Assigned To</TableHead>
                <TableHead className="text-gray-400">Priority</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceTasks.map((task) => (
                <TableRow key={task.id} className="border-b border-gray-800">
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{task.title}</div>
                      <div className="text-sm text-gray-400">{task.id} • {task.type}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">{task.asset}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {task.scheduledDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.estimatedDuration}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-400">
                      <User className="h-4 w-4 mr-1" />
                      {task.assignedTo}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        task.priority === 'High' 
                          ? 'border-red-500 text-red-400' 
                          : task.priority === 'Medium'
                          ? 'border-amber-500 text-amber-400'
                          : 'border-green-500 text-green-400'
                      }
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        task.status === 'In Progress' 
                          ? 'border-blue-500 text-blue-400' 
                          : 'border-gray-500 text-gray-400'
                      }
                    >
                      {task.status}
                    </Badge>
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
