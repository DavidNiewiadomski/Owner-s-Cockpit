
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { AlertTriangle, ArrowUpDown, Filter, DownloadIcon, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

interface Risk {
  id: string;
  name: string;
  severity: 'Low' | 'Medium' | 'High';
  likelihood: 'Low' | 'Medium' | 'High';
  impact: string;
  status: 'Active' | 'Mitigated' | 'Monitoring';
  category: string;
  mitigation: string;
  owner: string;
  lastUpdated: string;
}

interface CategoryData {
  name: string;
  value: number;
}

interface RiskManagementContentProps {
  riskData: Risk[];
  riskByCategory: CategoryData[];
}

export function RiskManagementContent({ riskData, riskByCategory }: RiskManagementContentProps) {
  const [sortField, setSortField] = useState<keyof Risk>('severity');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Risk) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedRisks = [...riskData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const activeRisks = riskData.filter(risk => risk.status === 'Active').length;
  const mitigatedRisks = riskData.filter(risk => risk.status === 'Mitigated').length;
  const monitoringRisks = riskData.filter(risk => risk.status === 'Monitoring').length;
  const highRisks = riskData.filter(risk => risk.severity === 'High').length;

  const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884d8', '#82ca9d'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Risks"
          value={activeRisks}
          icon={AlertTriangle}
          trend={activeRisks > 3 ? "up" : "down"}
          trendValue={activeRisks > 3 ? "Needs attention" : "Well managed"}
          className="border-amber-800/30"
        />
        <StatCard
          title="Mitigated Risks"
          value={mitigatedRisks}
          icon={CheckCircle}
          className="border-green-800/30"
        />
        <StatCard
          title="Monitoring"
          value={monitoringRisks}
          icon={Clock}
          className="border-blue-800/30"
        />
        <StatCard
          title="High Severity Risks"
          value={highRisks}
          icon={AlertCircle}
          trend={highRisks > 0 ? "up" : "neutral"}
          trendValue={highRisks > 0 ? "Critical attention" : "All clear"}
          className="border-red-800/30"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-black border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Major Risks and Status</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="h-8 border-gray-700 bg-gray-900">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="h-8 border-gray-700 bg-gray-900">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-900/50">
                    <TableHead className="text-gray-400" onClick={() => handleSort('id')}>
                      <div className="flex items-center cursor-pointer">
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400" onClick={() => handleSort('name')}>
                      <div className="flex items-center cursor-pointer">
                        Risk
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400" onClick={() => handleSort('severity')}>
                      <div className="flex items-center cursor-pointer">
                        Severity
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400" onClick={() => handleSort('likelihood')}>
                      <div className="flex items-center cursor-pointer">
                        Likelihood
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400" onClick={() => handleSort('status')}>
                      <div className="flex items-center cursor-pointer">
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRisks.map((risk) => (
                    <TableRow key={risk.id} className="hover:bg-gray-900/50">
                      <TableCell className="font-medium text-gray-300">{risk.id}</TableCell>
                      <TableCell>{risk.name}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            risk.severity === 'High' 
                              ? "bg-red-900/20 text-red-400 border-red-700/30" 
                              : risk.severity === 'Medium'
                                ? "bg-amber-900/20 text-amber-400 border-amber-700/30"
                                : "bg-green-900/20 text-green-400 border-green-700/30"
                          }
                        >
                          {risk.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            risk.likelihood === 'High' 
                              ? "bg-red-900/20 text-red-400 border-red-700/30" 
                              : risk.likelihood === 'Medium'
                                ? "bg-amber-900/20 text-amber-400 border-amber-700/30"
                                : "bg-blue-900/20 text-blue-400 border-blue-700/30"
                          }
                        >
                          {risk.likelihood}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            risk.status === 'Active' 
                              ? "bg-red-900/20 text-red-400 border-red-700/30" 
                              : risk.status === 'Mitigated'
                                ? "bg-green-900/20 text-green-400 border-green-700/30"
                                : "bg-blue-900/20 text-blue-400 border-blue-700/30"
                          }
                        >
                          {risk.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {riskByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                    formatter={(value) => [`${value} risks`, '']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Risk Mitigation Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-900/50">
                  <TableHead className="text-gray-400">Risk ID</TableHead>
                  <TableHead className="text-gray-400">Risk Name</TableHead>
                  <TableHead className="text-gray-400">Mitigation Plan</TableHead>
                  <TableHead className="text-gray-400">Owner</TableHead>
                  <TableHead className="text-gray-400">Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRisks.slice(0, 3).map((risk) => (
                  <TableRow key={`${risk.id}-plan`} className="hover:bg-gray-900/50">
                    <TableCell className="font-medium text-gray-300">{risk.id}</TableCell>
                    <TableCell>{risk.name}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-2">{risk.mitigation}</p>
                    </TableCell>
                    <TableCell>{risk.owner}</TableCell>
                    <TableCell>{risk.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-900">
              View All Mitigation Plans
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
