
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Maximize2, Layout, Users, Square, Zap, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const spaceAllocation = [
  { name: 'Production Floor', area: 45000, percentage: 45, color: '#22d3ee' },
  { name: 'Warehouse/Storage', area: 25000, percentage: 25, color: '#10b981' },
  { name: 'Office Space', area: 15000, percentage: 15, color: '#f59e0b' },
  { name: 'Utilities/Mechanical', area: 8000, percentage: 8, color: '#8b5cf6' },
  { name: 'Loading/Shipping', area: 7000, percentage: 7, color: '#ef4444' }
];

const departmentRequirements = [
  { department: 'Manufacturing', currentSpace: 42000, plannedSpace: 45000, efficiency: '+7%' },
  { department: 'Quality Control', currentSpace: 3000, plannedSpace: 3500, efficiency: '+12%' },
  { department: 'R&D Labs', currentSpace: 5000, plannedSpace: 6000, efficiency: '+15%' },
  { department: 'Administration', currentSpace: 8000, plannedSpace: 7500, efficiency: '+8%' },
  { department: 'Training Center', currentSpace: 2000, plannedSpace: 3000, efficiency: '+25%' }
];

export function PreliminarySpacePlan() {
  const [selectedView, setSelectedView] = useState('2d');
  const [selectedFloor, setSelectedFloor] = useState('ground');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cyan-300">Preliminary Space Plan</h2>
          <p className="text-gray-400">Optimized layout and space allocation analysis</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedView === '2d' ? 'default' : 'outline'}
            onClick={() => setSelectedView('2d')}
            className={selectedView === '2d' ? 'bg-cyan-600' : ''}
          >
            <Layout className="h-4 w-4 mr-2" />
            2D View
          </Button>
          <Button 
            variant={selectedView === '3d' ? 'default' : 'outline'}
            onClick={() => setSelectedView('3d')}
            className={selectedView === '3d' ? 'bg-cyan-600' : ''}
          >
            <Maximize2 className="h-4 w-4 mr-2" />
            3D View
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export Plans
          </Button>
        </div>
      </div>

      {/* Floor Selection */}
      <div className="flex gap-2">
        {['ground', 'mezzanine', 'office'].map((floor) => (
          <Button
            key={floor}
            variant={selectedFloor === floor ? 'default' : 'outline'}
            onClick={() => setSelectedFloor(floor)}
            className={selectedFloor === floor ? 'bg-blue-600' : ''}
            size="sm"
          >
            {floor.charAt(0).toUpperCase() + floor.slice(1)} Floor
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Space Plan Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center">
                <Square className="h-5 w-5 mr-2" />
                Floor Plan - {selectedFloor.charAt(0).toUpperCase() + selectedFloor.slice(1)} Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] bg-gray-800 rounded-lg p-4 relative overflow-hidden">
                {/* Simulated floor plan */}
                <div className="grid grid-cols-4 grid-rows-4 gap-2 h-full">
                  {/* Production Area */}
                  <div className="col-span-2 row-span-2 bg-cyan-600/20 border-2 border-cyan-600 rounded-lg p-2 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-cyan-300 font-medium">Production Floor</div>
                      <div className="text-gray-400 text-sm">45,000 sq ft</div>
                    </div>
                  </div>
                  
                  {/* Warehouse */}
                  <div className="col-span-2 row-span-1 bg-green-600/20 border-2 border-green-600 rounded-lg p-2 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-green-300 font-medium">Warehouse</div>
                      <div className="text-gray-400 text-sm">25,000 sq ft</div>
                    </div>
                  </div>
                  
                  {/* Office Space */}
                  <div className="col-span-1 row-span-2 bg-yellow-600/20 border-2 border-yellow-600 rounded-lg p-2 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-yellow-300 font-medium">Office</div>
                      <div className="text-gray-400 text-sm">15,000 sq ft</div>
                    </div>
                  </div>
                  
                  {/* Loading/Shipping */}
                  <div className="col-span-1 row-span-1 bg-red-600/20 border-2 border-red-600 rounded-lg p-2 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-red-300 font-medium">Loading</div>
                      <div className="text-gray-400 text-sm">7,000 sq ft</div>
                    </div>
                  </div>
                  
                  {/* Utilities */}
                  <div className="col-span-2 row-span-1 bg-purple-600/20 border-2 border-purple-600 rounded-lg p-2 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-purple-300 font-medium">Utilities</div>
                      <div className="text-gray-400 text-sm">8,000 sq ft</div>
                    </div>
                  </div>
                </div>
                
                {/* Scale indicator */}
                <div className="absolute bottom-4 right-4 bg-gray-900/80 p-2 rounded">
                  <div className="text-gray-400 text-sm">Scale: 1" = 50'</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Space Allocation Summary */}
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Space Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spaceAllocation}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="area"
                      label={({ name, percentage }) => `${percentage}%`}
                    >
                      {spaceAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value.toLocaleString()} sq ft`, 'Area']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2">
                {spaceAllocation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-400">{item.name}</span>
                    </div>
                    <span className="text-white">{item.area.toLocaleString()} sq ft</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Area:</span>
                  <span className="text-white font-medium">100,000 sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Efficiency Ratio:</span>
                  <span className="text-green-400 font-medium">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Circulation:</span>
                  <span className="text-white font-medium">8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Employee Density:</span>
                  <span className="text-white font-medium">220 sq ft/person</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Expansion Capacity:</span>
                  <span className="text-blue-400 font-medium">25%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Department Requirements */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Department Space Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentRequirements} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="department" tick={{ fill: '#94a3b8' }} />
                <YAxis tick={{ fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="currentSpace" name="Current Space" fill="#6b7280" />
                <Bar dataKey="plannedSpace" name="Planned Space" fill="#22d3ee" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {departmentRequirements.map((dept, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg">
                <h4 className="text-white font-medium mb-2">{dept.department}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current:</span>
                    <span className="text-white">{dept.currentSpace.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Planned:</span>
                    <span className="text-cyan-400">{dept.plannedSpace.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Efficiency:</span>
                    <Badge className="bg-green-600">{dept.efficiency}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Design Standards & Codes */}
      <Tabs defaultValue="standards" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="standards">Design Standards</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="technology">Technology Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="standards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">Building Codes Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { code: 'IBC 2021', status: 'Compliant', color: 'green' },
                    { code: 'NFPA 101', status: 'Compliant', color: 'green' },
                    { code: 'ADA Guidelines', status: 'Under Review', color: 'yellow' },
                    { code: 'Local Zoning', status: 'Pending Approval', color: 'yellow' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <span className="text-white">{item.code}</span>
                      <Badge className={`bg-${item.color}-600`}>{item.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">Safety & Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { feature: 'Emergency Exits', status: 'Optimized', count: '12 exits' },
                    { feature: 'Fire Suppression', status: 'Designed', count: 'Full coverage' },
                    { feature: 'Security Zones', status: 'Planned', count: '4 zones' },
                    { feature: 'CCTV Coverage', status: 'Designed', count: '98% coverage' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <div>
                        <div className="text-white">{item.feature}</div>
                        <div className="text-gray-400 text-sm">{item.count}</div>
                      </div>
                      <Badge className="bg-blue-600">{item.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accessibility">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">ADA Compliance Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { feature: 'Accessible Entrances', details: '3 main entrances with automatic doors' },
                  { feature: 'Elevator Access', details: '2 passenger elevators, 1 freight elevator' },
                  { feature: 'Accessible Parking', details: '25 designated spaces (8% of total)' },
                  { feature: 'Restroom Facilities', details: 'ADA compliant restrooms on each floor' },
                  { feature: 'Workstation Access', details: 'Height-adjustable workstations available' },
                  { feature: 'Emergency Egress', details: 'Accessible evacuation routes and areas' }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg">
                    <h4 className="text-white font-medium mb-2">{item.feature}</h4>
                    <p className="text-gray-400 text-sm">{item.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sustainability">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Sustainable Design Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Energy Efficiency</h4>
                  {[
                    'LED lighting throughout facility',
                    'High-efficiency HVAC systems',
                    'Smart building automation',
                    'Solar panel integration ready'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Environmental Impact</h4>
                  {[
                    'Rainwater collection system',
                    'Native landscaping plan',
                    'Waste reduction strategies',
                    'LEED Gold certification target'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technology">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Technology Infrastructure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Network & Communications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fiber Backbone:</span>
                        <span className="text-white">10 Gbps</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">WiFi Coverage:</span>
                        <span className="text-white">100%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Network Drops:</span>
                        <span className="text-white">500+ locations</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Smart Building Systems</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">BMS Integration:</span>
                        <span className="text-green-400">Planned</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">IoT Sensors:</span>
                        <span className="text-white">200+ units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Automation Level:</span>
                        <span className="text-white">85%</span>
                      </div>
                    </div>
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
