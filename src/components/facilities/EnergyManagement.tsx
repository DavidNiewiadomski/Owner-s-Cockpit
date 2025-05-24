
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Zap, TrendingDown, TrendingUp, DollarSign } from 'lucide-react';

const energyData = [
  { month: 'Jan', consumption: 12500, cost: 1875 },
  { month: 'Feb', consumption: 11800, cost: 1770 },
  { month: 'Mar', consumption: 13200, cost: 1980 },
  { month: 'Apr', consumption: 10900, cost: 1635 },
  { month: 'May', consumption: 14500, cost: 2175 },
  { month: 'Jun', consumption: 15800, cost: 2370 }
];

const efficiencyMetrics = [
  { building: 'Building A', efficiency: 94, target: 90 },
  { building: 'Building B', efficiency: 87, target: 90 },
  { building: 'Building C', efficiency: 96, target: 90 },
  { building: 'Building D', efficiency: 89, target: 90 }
];

export function EnergyManagement() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-400">Monthly Usage</h3>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">15,800 kWh</span>
                  <span className="text-xs mt-1 text-green-400">↓ 8% vs last month</span>
                </div>
              </div>
              <div className="bg-gray-800 p-2 rounded-md">
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-400">Monthly Cost</h3>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">$2,370</span>
                  <span className="text-xs mt-1 text-green-400">↓ 12% vs budget</span>
                </div>
              </div>
              <div className="bg-gray-800 p-2 rounded-md">
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-400">Efficiency Score</h3>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">91.5%</span>
                  <span className="text-xs mt-1 text-green-400">Above target</span>
                </div>
              </div>
              <div className="bg-gray-800 p-2 rounded-md">
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-400">Carbon Footprint</h3>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">7.2 tons</span>
                  <span className="text-xs mt-1 text-green-400">↓ 15% reduction</span>
                </div>
              </div>
              <div className="bg-gray-800 p-2 rounded-md">
                <TrendingDown className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Energy Consumption Trend</CardTitle>
            <CardDescription className="text-gray-400">
              Monthly energy usage and costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8' }} />
                  <YAxis tick={{ fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      borderColor: '#374151',
                      color: '#f3f4f6'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    name="Consumption (kWh)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Cost ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Building Efficiency Scores</CardTitle>
            <CardDescription className="text-gray-400">
              Energy efficiency by building
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={efficiencyMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
                  <XAxis dataKey="building" tick={{ fill: '#94a3b8' }} />
                  <YAxis tick={{ fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      borderColor: '#374151',
                      color: '#f3f4f6'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="efficiency" fill="#3b82f6" name="Current Efficiency %" />
                  <Bar dataKey="target" fill="#10b981" name="Target %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
