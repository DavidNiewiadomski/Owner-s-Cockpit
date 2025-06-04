
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Cpu, Database, Play, Settings, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const simulationData = [
  { time: '0h', throughput: 0, efficiency: 0, utilization: 0 },
  { time: '2h', throughput: 45, efficiency: 65, utilization: 78 },
  { time: '4h', throughput: 78, efficiency: 82, utilization: 89 },
  { time: '6h', throughput: 92, efficiency: 88, utilization: 94 },
  { time: '8h', throughput: 98, efficiency: 95, utilization: 97 }
];

const performanceMetrics = [
  { metric: 'Throughput Rate', value: '450 units/hour', target: '400 units/hour', status: 'excellent' },
  { metric: 'Machine Utilization', value: '94.2%', target: '85%', status: 'excellent' },
  { metric: 'Queue Time', value: '2.3 min', target: '5 min', status: 'good' },
  { metric: 'Energy Efficiency', value: '87.5%', target: '80%', status: 'excellent' }
];

export function FlexsimIntegration() {
  const [simulationStatus, setSimulationStatus] = useState('running');
  const [currentProgress, setCurrentProgress] = useState(73);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cyan-300">Flexsim Manufacturing Simulation</h2>
          <p className="text-gray-400">Real-time simulation and optimization analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={simulationStatus === 'running' ? 'bg-green-600' : 'bg-gray-600'}>
            <Activity className="h-3 w-3 mr-1" />
            {simulationStatus === 'running' ? 'Simulation Active' : 'Simulation Stopped'}
          </Badge>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setSimulationStatus(simulationStatus === 'running' ? 'stopped' : 'running')}
          >
            {simulationStatus === 'running' ? 'Stop' : 'Start'} Simulation
          </Button>
        </div>
      </div>

      {/* API Status */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center">
            <Database className="h-5 w-5 mr-2" />
            API Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <div className="text-white font-medium">Flexsim API</div>
                <div className="text-gray-400 text-sm">Connected</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <div className="text-white font-medium">Data Stream</div>
                <div className="text-gray-400 text-sm">Active</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <div className="text-white font-medium">Sync Status</div>
                <div className="text-gray-400 text-sm">Syncing</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <div className="text-white font-medium">Last Update</div>
                <div className="text-gray-400 text-sm">2 min ago</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="optimization">Optimization Analysis</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Modeling</TabsTrigger>
          <TabsTrigger value="settings">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">Real-time Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={simulationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" tick={{ fill: '#94a3b8' }} />
                      <YAxis tick={{ fill: '#94a3b8' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Line type="monotone" dataKey="throughput" stroke="#22d3ee" strokeWidth={2} />
                      <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="utilization" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">{metric.metric}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{metric.value}</span>
                          <Badge className={
                            metric.status === 'excellent' ? 'bg-green-600' : 
                            metric.status === 'good' ? 'bg-blue-600' : 'bg-yellow-600'
                          }>
                            {metric.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">Target: {metric.target}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    title: 'Bottleneck at Station 3', 
                    impact: 'High', 
                    savings: '$45K/year',
                    description: 'Add parallel processing line to reduce queue time by 40%'
                  },
                  { 
                    title: 'Material Flow Optimization', 
                    impact: 'Medium', 
                    savings: '$28K/year',
                    description: 'Reorganize layout to reduce transport time by 15%'
                  },
                  { 
                    title: 'Shift Schedule Adjustment', 
                    impact: 'Low', 
                    savings: '$12K/year',
                    description: 'Optimize staffing during peak demand periods'
                  }
                ].map((rec, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{rec.title}</h4>
                      <div className="flex gap-2">
                        <Badge className={
                          rec.impact === 'High' ? 'bg-red-600' : 
                          rec.impact === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                        }>
                          {rec.impact} Impact
                        </Badge>
                        <Badge className="bg-blue-600">{rec.savings}</Badge>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{rec.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Scenario Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Current State', throughput: '450 units/hr', efficiency: '94%', cost: 'Baseline' },
                  { name: 'Optimized Layout', throughput: '520 units/hr', efficiency: '97%', cost: '+$150K' },
                  { name: 'Automated Line', throughput: '680 units/hr', efficiency: '99%', cost: '+$2.1M' }
                ].map((scenario, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg">
                    <h4 className="text-white font-medium mb-3">{scenario.name}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Throughput:</span>
                        <span className="text-white">{scenario.throughput}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Efficiency:</span>
                        <span className="text-white">{scenario.efficiency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Investment:</span>
                        <span className="text-white">{scenario.cost}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700" size="sm">
                      Run Scenario
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Simulation Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Simulation Speed</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">10x Real-time</span>
                    <Button variant="outline" size="sm">Adjust</Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Data Collection Rate</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">Every 30 seconds</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Auto-optimization</span>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-600">Enabled</Badge>
                    <Button variant="outline" size="sm">Settings</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
