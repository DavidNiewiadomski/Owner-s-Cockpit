
import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, LineChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Line, PieChart, Pie } from 'recharts';
import { Building2, Buildings, CircleDollarSign, CircleEllipsis, Clock, DollarSign, Home, Landmark, TrendingUp } from 'lucide-react';

// Sample data for investment allocation
const allocationData = [
  { name: 'Residential', value: 40, color: '#0284c7' },
  { name: 'Commercial', value: 25, color: '#0891b2' },
  { name: 'Mixed-Use', value: 15, color: '#7c3aed' },
  { name: 'Infrastructure', value: 12, color: '#059669' },
  { name: 'Special Projects', value: 8, color: '#db2777' },
];

const quarterlyAllocation = [
  { name: 'Q1', residential: 35, commercial: 20, mixedUse: 10, infrastructure: 10, special: 5 },
  { name: 'Q2', residential: 38, commercial: 22, mixedUse: 12, infrastructure: 11, special: 6 },
  { name: 'Q3', residential: 40, commercial: 25, mixedUse: 15, infrastructure: 12, special: 8 },
  { name: 'Q4', residential: 42, commercial: 26, mixedUse: 18, infrastructure: 14, special: 10 },
];

const projectionData = [
  { name: 'Current', value: 100 },
  { name: '1 Year', value: 115 },
  { name: '3 Year', value: 140 },
  { name: '5 Year', value: 180 },
];

const projectAllocationData = [
  { id: 1, name: 'East Tower', type: 'Commercial', allocation: '$12.5M', status: 'Active', progress: 65 },
  { id: 2, name: 'Westview Residences', type: 'Residential', allocation: '$8.2M', status: 'Active', progress: 40 },
  { id: 3, name: 'Harbor Bridge', type: 'Infrastructure', allocation: '$6.7M', status: 'Planning', progress: 15 },
  { id: 4, name: 'Downtown Mixed-Use', type: 'Mixed-Use', allocation: '$9.4M', status: 'Active', progress: 80 },
  { id: 5, name: 'Uptown Offices', type: 'Commercial', allocation: '$7.1M', status: 'Completed', progress: 100 },
];

export function InvestmentAllocationContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-black border-gray-800 col-span-2">
          <h3 className="text-lg font-medium mb-4">Portfolio Allocation by Project Type</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyAllocation} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} 
                  itemStyle={{ color: '#eee' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#eee' }} />
                <Bar dataKey="residential" name="Residential" fill="#0284c7" />
                <Bar dataKey="commercial" name="Commercial" fill="#0891b2" />
                <Bar dataKey="mixedUse" name="Mixed-Use" fill="#7c3aed" />
                <Bar dataKey="infrastructure" name="Infrastructure" fill="#059669" />
                <Bar dataKey="special" name="Special Projects" fill="#db2777" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-black border-gray-800">
          <h3 className="text-lg font-medium mb-4">Current Allocation</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} 
                  itemStyle={{ color: '#eee' }}
                  formatter={(value) => [`${value}%`, 'Allocation']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-black border-gray-800 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-400">Total Investment</div>
            <div className="text-xl font-bold mt-1">$43.9M</div>
          </div>
          <DollarSign className="h-8 w-8 text-blue-500 opacity-80" />
        </Card>
        
        <Card className="p-4 bg-black border-gray-800 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-400">Active Projects</div>
            <div className="text-xl font-bold mt-1">12</div>
          </div>
          <Building2 className="h-8 w-8 text-purple-500 opacity-80" />
        </Card>
        
        <Card className="p-4 bg-black border-gray-800 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-400">5-Year Projection</div>
            <div className="text-xl font-bold mt-1">+80%</div>
          </div>
          <TrendingUp className="h-8 w-8 text-green-500 opacity-80" />
        </Card>
      </div>

      <Card className="p-6 bg-black border-gray-800">
        <h3 className="text-lg font-medium mb-4">Growth Projection</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={projectionData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                itemStyle={{ color: '#eee' }}
                formatter={(value) => [`${value}%`, 'Projected Value']}
              />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 bg-black border-gray-800">
        <h3 className="text-lg font-medium mb-4">Project Allocations</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left">
                <th className="py-3 px-4 text-gray-400 font-medium text-sm">Project</th>
                <th className="py-3 px-4 text-gray-400 font-medium text-sm">Type</th>
                <th className="py-3 px-4 text-gray-400 font-medium text-sm">Allocation</th>
                <th className="py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                <th className="py-3 px-4 text-gray-400 font-medium text-sm">Progress</th>
              </tr>
            </thead>
            <tbody>
              {projectAllocationData.map(project => (
                <tr key={project.id} className="border-b border-gray-800">
                  <td className="py-3 px-4 font-medium">{project.name}</td>
                  <td className="py-3 px-4 text-gray-300">
                    <div className="flex items-center">
                      {project.type === 'Commercial' && <Buildings className="h-4 w-4 mr-2 text-blue-400" />}
                      {project.type === 'Residential' && <Home className="h-4 w-4 mr-2 text-green-400" />}
                      {project.type === 'Infrastructure' && <Landmark className="h-4 w-4 mr-2 text-yellow-400" />}
                      {project.type === 'Mixed-Use' && <CircleEllipsis className="h-4 w-4 mr-2 text-purple-400" />}
                      {project.type}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    <div className="flex items-center">
                      <CircleDollarSign className="h-4 w-4 mr-1 text-gray-400" />
                      {project.allocation}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'Active' ? 'bg-blue-900 text-blue-300' :
                      project.status === 'Completed' ? 'bg-green-900 text-green-300' :
                      'bg-amber-900 text-amber-300'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 w-48">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
