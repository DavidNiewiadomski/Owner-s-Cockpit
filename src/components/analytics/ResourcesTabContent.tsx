
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
  // Custom tooltip for pie chart
  const PieCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-cyan-700/40 backdrop-blur-lg rounded-lg shadow-lg py-2 px-3 text-white">
          <p className="text-cyan-400 font-semibold">{payload[0].name}</p>
          <p className="text-white text-sm">
            <span className="text-white font-bold">{payload[0].value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for the composed chart
  const ComposedCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-cyan-700/40 backdrop-blur-lg rounded-lg shadow-lg py-2 px-3 text-white">
          <p className="text-cyan-400 font-semibold">{payload[0]?.payload.name}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-white text-sm">
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.name}:
              </span>{' '}
              <span className="text-white font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
                  <defs>
                    <filter id="pieChartGlow" x="-10%" y="-10%" width="120%" height="120%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feFlood floodColor="#38bdf8" floodOpacity="0.5" result="glow" />
                      <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                      <feMerge>
                        <feMergeNode in="softGlow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
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
                    onMouseOver={(data, index) => {
                      document.querySelector(`.recharts-pie-sector:nth-child(${index + 1})`)?.setAttribute('filter', 'url(#pieChartGlow)');
                    }}
                    onMouseOut={(data, index) => {
                      document.querySelector(`.recharts-pie-sector:nth-child(${index + 1})`)?.removeAttribute('filter');
                    }}
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieCustomTooltip />} />
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
                  <defs>
                    <linearGradient id="resourcePlannedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors.primary} stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="resourceActualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="capacityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                    
                    {/* Add glow filters for hover effects */}
                    <filter id="resourcePlannedGlow" x="-10%" y="-10%" width="120%" height="120%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feFlood floodColor={colors.primary} floodOpacity="0.7" result="glow" />
                      <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                      <feMerge>
                        <feMergeNode in="softGlow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    
                    <filter id="resourceActualGlow" x="-10%" y="-10%" width="120%" height="120%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feFlood floodColor={colors.secondary} floodOpacity="0.7" result="glow" />
                      <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                      <feMerge>
                        <feMergeNode in="softGlow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
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
                  <Tooltip content={<ComposedCustomTooltip />} />
                  <Legend 
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ paddingTop: "10px" }}
                    formatter={(value) => (
                      <span style={{ color: '#aaa', fontSize: '12px' }}>
                        {value}
                      </span>
                    )}
                  />
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
                    fill="url(#resourcePlannedGradient)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    className="transition-all duration-300 ease-in-out"
                    onMouseOver={(data, index) => {
                      document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-0:nth-child(${index + 1})`)?.setAttribute('filter', 'url(#resourcePlannedGlow)');
                    }}
                    onMouseOut={(data, index) => {
                      document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-0:nth-child(${index + 1})`)?.removeAttribute('filter');
                    }}
                  />
                  <Bar 
                    dataKey="actual" 
                    name="Actual" 
                    fill="url(#resourceActualGradient)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={300}
                    className="transition-all duration-300 ease-in-out"
                    onMouseOver={(data, index) => {
                      document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-1:nth-child(${index + 1})`)?.setAttribute('filter', 'url(#resourceActualGlow)');
                    }}
                    onMouseOut={(data, index) => {
                      document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-1:nth-child(${index + 1})`)?.removeAttribute('filter');
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
