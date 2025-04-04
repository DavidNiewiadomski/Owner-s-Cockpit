
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Building,
  Home,
  Landmark,
  CircleEllipsis,
  CircleDollarSign
} from 'lucide-react';
import { ProjectAllocation } from './types';

// Sample data for project allocations
const projectAllocationData: ProjectAllocation[] = [
  { id: 1, name: 'East Tower', type: 'Commercial', allocation: '$12.5M', status: 'Active', progress: 65 },
  { id: 2, name: 'Westview Residences', type: 'Residential', allocation: '$8.2M', status: 'Active', progress: 40 },
  { id: 3, name: 'Harbor Bridge', type: 'Infrastructure', allocation: '$6.7M', status: 'Planning', progress: 15 },
  { id: 4, name: 'Downtown Mixed-Use', type: 'Mixed-Use', allocation: '$9.4M', status: 'Active', progress: 80 },
  { id: 5, name: 'Uptown Offices', type: 'Commercial', allocation: '$7.1M', status: 'Completed', progress: 100 },
];

export function ProjectAllocationsTable() {
  return (
    <Card className="p-6 bg-black border-gray-800">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-medium">Project Allocations</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400 font-medium text-sm">Project</TableHead>
                <TableHead className="text-gray-400 font-medium text-sm">Type</TableHead>
                <TableHead className="text-gray-400 font-medium text-sm">Allocation</TableHead>
                <TableHead className="text-gray-400 font-medium text-sm">Status</TableHead>
                <TableHead className="text-gray-400 font-medium text-sm">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectAllocationData.map(project => (
                <TableRow key={project.id} className="border-gray-800">
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center">
                      {project.type === 'Commercial' && <Building className="h-4 w-4 mr-2 text-blue-400" />}
                      {project.type === 'Residential' && <Home className="h-4 w-4 mr-2 text-green-400" />}
                      {project.type === 'Infrastructure' && <Landmark className="h-4 w-4 mr-2 text-yellow-400" />}
                      {project.type === 'Mixed-Use' && <CircleEllipsis className="h-4 w-4 mr-2 text-purple-400" />}
                      {project.type}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center">
                      <CircleDollarSign className="h-4 w-4 mr-1 text-gray-400" />
                      {project.allocation}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'Active' ? 'bg-blue-900 text-blue-300' :
                      project.status === 'Completed' ? 'bg-green-900 text-green-300' :
                      'bg-amber-900 text-amber-300'
                    }`}>
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell className="w-48">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-800 rounded-full h-2.5 mr-2">
                        <div 
                          className={`h-2.5 rounded-full ${
                            project.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                          }`} 
                          style={{ width: `${project.progress}%` }}>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{project.progress}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
