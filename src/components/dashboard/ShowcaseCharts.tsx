
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const financialForecastData = [
  {
    quarter: 'Q1 2024',
    siteSelection: 2.8,
    planningDesign: 5.2,
    construction: 25.4,
    facilityManagement: 8.1
  },
  {
    quarter: 'Q2 2024',
    siteSelection: 3.2,
    planningDesign: 6.8,
    construction: 32.7,
    facilityManagement: 9.3
  },
  {
    quarter: 'Q3 2024',
    siteSelection: 1.9,
    planningDesign: 8.1,
    construction: 28.9,
    facilityManagement: 10.7
  },
  {
    quarter: 'Q4 2024',
    siteSelection: 2.1,
    planningDesign: 4.3,
    construction: 31.2,
    facilityManagement: 11.2
  }
];

const portfolioDistribution = [
  { name: 'Construction', value: 62.3, color: '#ef4444' },
  { name: 'Site Selection', value: 15.2, color: '#3b82f6' },
  { name: 'Facility Management', value: 18.8, color: '#10b981' },
  { name: 'Planning & Design', value: 3.7, color: '#f59e0b' }
];

export function ShowcaseCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Financial Forecasting */}
      <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Financial Forecasting Across Portfolio</CardTitle>
              <p className="text-sm text-gray-400 mt-1">Quarterly project costs by stage ($ millions)</p>
            </div>
            <Badge variant="outline" className="text-green-400 border-green-600">
              $147M Total Portfolio
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={financialForecastData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="quarter" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" label={{ value: '$ Millions', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
                formatter={(value) => [`$${value}M`, '']}
              />
              <Bar dataKey="siteSelection" stackId="a" fill="#3b82f6" name="Site Selection" />
              <Bar dataKey="planningDesign" stackId="a" fill="#f59e0b" name="Planning & Design" />
              <Bar dataKey="construction" stackId="a" fill="#ef4444" name="Construction" />
              <Bar dataKey="facilityManagement" stackId="a" fill="#10b981" name="Facility Management" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Portfolio Distribution */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Portfolio Distribution by Stage</CardTitle>
          <p className="text-sm text-gray-400">Active project value allocation</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {portfolioDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
                formatter={(value) => [`${value}%`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {portfolioDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-300">{item.name}</span>
                <span className="text-sm text-white font-medium ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Status Overview */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Project Status Overview</CardTitle>
          <p className="text-sm text-gray-400">Current project distribution</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">Site Selection</span>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">2 projects</span>
                <p className="text-xs text-gray-400">$6.0M budget</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300">Planning & Design</span>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">0 projects</span>
                <p className="text-xs text-gray-400">Ready for next phase</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Construction</span>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">3 projects</span>
                <p className="text-xs text-gray-400">$93.0M budget</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Facility Management</span>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">3+ projects</span>
                <p className="text-xs text-gray-400">$25.4M operational</p>
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t border-gray-800">
            <Badge variant="outline" className="text-gray-400 border-gray-600">
              +20 additional locations in portfolio
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
