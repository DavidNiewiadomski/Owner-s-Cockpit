
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, DollarSign, MapPin, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const businessCaseData = [
  { metric: 'ROI', siteA: 18.5, siteB: 15.2, siteC: 22.1 },
  { metric: 'Payback Period', siteA: 3.2, siteB: 4.1, siteC: 2.8 },
  { metric: 'NPV (M)', siteA: 12.4, siteB: 8.9, siteC: 16.2 },
  { metric: 'IRR', siteA: 19.8, siteB: 16.3, siteC: 24.5 }
];

const incentivesData = [
  { name: 'Tax Credits', value: 2.5, color: '#22d3ee' },
  { name: 'Job Creation', value: 1.8, color: '#10b981' },
  { name: 'Infrastructure', value: 3.2, color: '#f59e0b' },
  { name: 'Training Grants', value: 0.9, color: '#8b5cf6' }
];

export function BusinessCaseDevelopment() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cyan-300">Site Selection Business Case</h2>
          <p className="text-gray-400">Comprehensive analysis and development strategy</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="overview">Business Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
          <TabsTrigger value="incentives">Incentives Analysis</TabsTrigger>
          <TabsTrigger value="timeline">Implementation Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-cyan-300 flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Project Scope
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Facility Size:</span>
                    <span className="text-white">125,000 sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Employees:</span>
                    <span className="text-white">450 FTE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Investment:</span>
                    <span className="text-green-400">$45.2M</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-cyan-300 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Cost:</span>
                    <span className="text-white">$52.8M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Annual Savings:</span>
                    <span className="text-green-400">$8.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Break Even:</span>
                    <span className="text-white">Year 3.2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-cyan-300 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Site Selection:</span>
                    <span className="text-white">Q2 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Construction:</span>
                    <span className="text-white">18 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Operations:</span>
                    <span className="text-white">Q1 2026</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Financial Metrics Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={businessCaseData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="metric" tick={{ fill: '#94a3b8' }} />
                    <YAxis tick={{ fill: '#94a3b8' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="siteA" name="Site A" fill="#22d3ee" />
                    <Bar dataKey="siteB" name="Site B" fill="#10b981" />
                    <Bar dataKey="siteC" name="Site C" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incentives" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">Labour & Government Incentives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={incentivesData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: $${value}M`}
                      >
                        {incentivesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">Incentive Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incentivesData.map((incentive) => (
                    <div key={incentive.name} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: incentive.color }}
                        ></div>
                        <span className="text-white">{incentive.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-medium">${incentive.value}M</div>
                        <div className="text-gray-400 text-sm">Available</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Implementation Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { phase: 'Site Selection & Due Diligence', duration: '3 months', status: 'in-progress' },
                  { phase: 'Permit & Approval Process', duration: '6 months', status: 'upcoming' },
                  { phase: 'Construction Phase 1', duration: '12 months', status: 'upcoming' },
                  { phase: 'Equipment Installation', duration: '6 months', status: 'upcoming' },
                  { phase: 'Operations Ramp-up', duration: '3 months', status: 'upcoming' }
                ].map((phase, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{phase.phase}</h4>
                      <p className="text-gray-400 text-sm">{phase.duration}</p>
                    </div>
                    <Badge 
                      className={phase.status === 'in-progress' ? 'bg-blue-600' : 'bg-gray-600'}
                    >
                      {phase.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
