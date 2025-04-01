
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChartIcon, LineChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, ComposedChart, Bar, Area, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

interface BudgetData {
  name: string;
  value: number;
  fill: string;
}

interface ResourceData {
  name: string;
  planned: number;
  actual: number;
  capacity: number;
}

interface ResourcesTabContentProps {
  budgetData: BudgetData[];
  resourceData: ResourceData[];
  colors: {
    primary: string;
    secondary: string;
    gridLine: string;
  };
}

export function ResourcesTabContent({ 
  budgetData, 
  resourceData, 
  colors 
}: ResourcesTabContentProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Allocation Pie Chart */}
        <Card className="bg-black border-gray-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2 text-construction-400" />
              Budget Allocation
            </CardTitle>
            <CardDescription className="text-gray-400">
              Distribution of project budget across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={1500}
                    animationBegin={0}
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Resource Utilization Chart */}
        <Card className="bg-black border-gray-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center">
              <LineChartIcon className="h-5 w-5 mr-2 text-construction-400" />
              Resource Utilization
            </CardTitle>
            <CardDescription className="text-gray-400">
              Planned vs actual resource usage over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={resourceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#aaa" 
                    tick={{ fill: '#aaa', fontSize: 12 }}
                    axisLine={{ stroke: colors.gridLine }}
                  />
                  <YAxis 
                    stroke="#aaa" 
                    tick={{ fill: '#aaa', fontSize: 12 }}
                    axisLine={{ stroke: colors.gridLine }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="capacity"
                    name="Capacity"
                    fill="url(#capacityGradient)"
                    stroke="transparent"
                    fillOpacity={0.2}
                    animationDuration={1500}
                  />
                  <Bar 
                    dataKey="planned" 
                    name="Planned" 
                    fill={colors.primary}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Bar 
                    dataKey="actual" 
                    name="Actual" 
                    fill={colors.secondary}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                  <defs>
                    <linearGradient id="capacityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
