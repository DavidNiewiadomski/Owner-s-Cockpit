
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
  Cell,
  Legend
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

// Enhanced futuristic tooltip component
const CustomFinancialTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/95 border border-cyan-500/40 backdrop-blur-lg rounded-lg shadow-[0_0_30px_rgba(56,189,248,0.3)] p-4 text-white">
        <p className="text-cyan-400 font-bold text-lg mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-300 text-sm">{entry.name}:</span>
            </div>
            <span className="text-white font-bold ml-4">${entry.value}M</span>
          </div>
        ))}
        <div className="border-t border-cyan-800/50 mt-2 pt-2">
          <div className="flex justify-between">
            <span className="text-cyan-300 text-sm">Total:</span>
            <span className="text-cyan-400 font-bold">
              ${payload.reduce((sum: number, entry: any) => sum + entry.value, 0).toFixed(1)}M
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function ShowcaseCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Enhanced Financial Forecasting - Now positioned first/higher */}
      <Card className="bg-gradient-to-br from-black via-gray-950 to-black border border-cyan-900/30 shadow-[0_0_30px_rgba(56,189,248,0.15)] lg:col-span-2">
        <CardHeader className="bg-gradient-to-r from-cyan-950/50 via-transparent to-cyan-950/50 border-b border-cyan-900/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white text-xl font-bold flex items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"/>
                Financial Forecasting Across Portfolio
              </CardTitle>
              <p className="text-cyan-300/80 font-medium mt-1">Quarterly project costs by stage ($ millions)</p>
            </div>
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] px-3 py-1">
              $147M Total Portfolio
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={financialForecastData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                {/* Enhanced gradients for each category */}
                <linearGradient id="siteSelectionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.7}/>
                </linearGradient>
                <linearGradient id="planningGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.7}/>
                </linearGradient>
                <linearGradient id="constructionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0.7}/>
                </linearGradient>
                <linearGradient id="facilityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.7}/>
                </linearGradient>
                
                {/* Glow effects */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid 
                strokeDasharray="2 2" 
                stroke="rgba(56, 189, 248, 0.2)" 
                strokeWidth={1}
              />
              <XAxis 
                dataKey="quarter" 
                stroke="#06b6d4" 
                tick={{ fill: '#e2e8f0', fontSize: 13, fontWeight: 'bold' }}
                axisLine={{ stroke: '#0891b2', strokeWidth: 2 }}
                tickLine={{ stroke: '#0891b2' }}
              />
              <YAxis 
                stroke="#06b6d4" 
                tick={{ fill: '#e2e8f0', fontSize: 13, fontWeight: 'bold' }}
                axisLine={{ stroke: '#0891b2', strokeWidth: 2 }}
                tickLine={{ stroke: '#0891b2' }}
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip 
                content={<CustomFinancialTooltip />}
                cursor={{
                  fill: 'rgba(56, 189, 248, 0.1)',
                  stroke: 'rgba(56, 189, 248, 0.4)',
                  strokeWidth: 2,
                  rx: 6,
                  ry: 6
                }}
              />
              <Legend 
                verticalAlign="top" 
                height={50}
                wrapperStyle={{ 
                  paddingTop: '10px',
                  paddingBottom: '20px'
                }}
                formatter={(value) => (
                  <span style={{ 
                    color: '#e2e8f0', 
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textShadow: '0 0 10px rgba(56,189,248,0.5)'
                  }}>
                    {value}
                  </span>
                )}
              />
              <Bar 
                dataKey="siteSelection" 
                stackId="a" 
                fill="url(#siteSelectionGradient)" 
                name="Site Selection"
                radius={[0, 0, 0, 0]}
                filter="url(#glow)"
                animationDuration={1000}
              />
              <Bar 
                dataKey="planningDesign" 
                stackId="a" 
                fill="url(#planningGradient)" 
                name="Planning & Design"
                radius={[0, 0, 0, 0]}
                filter="url(#glow)"
                animationDuration={1200}
              />
              <Bar 
                dataKey="construction" 
                stackId="a" 
                fill="url(#constructionGradient)" 
                name="Construction"
                radius={[0, 0, 0, 0]}
                filter="url(#glow)"
                animationDuration={1400}
              />
              <Bar 
                dataKey="facilityManagement" 
                stackId="a" 
                fill="url(#facilityGradient)" 
                name="Facility Management"
                radius={[4, 4, 0, 0]}
                filter="url(#glow)"
                animationDuration={1600}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Portfolio Distribution */}
      <Card className="bg-gradient-to-br from-black via-gray-950 to-black border border-cyan-900/30 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
        <CardHeader className="bg-gradient-to-r from-cyan-950/30 to-transparent border-b border-cyan-900/20">
          <CardTitle className="text-white flex items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"/>
            Portfolio Distribution by Stage
          </CardTitle>
          <p className="text-cyan-300/80 text-sm">Active project value allocation</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <defs>
                <filter id="pieGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <Pie
                data={portfolioDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
                filter="url(#pieGlow)"
              >
                {portfolioDistribution.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke={entry.color}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.95)', 
                  border: '1px solid rgba(56,189,248,0.4)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  boxShadow: '0 0 20px rgba(56,189,248,0.3)'
                }}
                formatter={(value) => [`${value}%`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {portfolioDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-gray-900/50 rounded-lg border border-gray-800/50">
                <div 
                  className="w-3 h-3 rounded-full shadow-lg" 
                  style={{ 
                    backgroundColor: item.color,
                    boxShadow: `0 0 10px ${item.color}40`
                  }}
                />
                <span className="text-sm text-gray-300 flex-1">{item.name}</span>
                <span className="text-sm text-white font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Status Overview */}
      <Card className="bg-gradient-to-br from-black via-gray-950 to-black border border-cyan-900/30 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
        <CardHeader className="bg-gradient-to-r from-cyan-950/30 to-transparent border-b border-cyan-900/20">
          <CardTitle className="text-white flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"/>
            Project Status Overview
          </CardTitle>
          <p className="text-cyan-300/80 text-sm">Current project distribution</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                <span className="text-gray-300 font-medium">Site Selection</span>
              </div>
              <div className="text-right">
                <span className="text-white font-bold">2 projects</span>
                <p className="text-xs text-blue-400">$6.0M budget</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
                <span className="text-gray-300 font-medium">Planning & Design</span>
              </div>
              <div className="text-right">
                <span className="text-white font-bold">0 projects</span>
                <p className="text-xs text-yellow-400">Ready for next phase</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg border border-red-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                <span className="text-gray-300 font-medium">Construction</span>
              </div>
              <div className="text-right">
                <span className="text-white font-bold">3 projects</span>
                <p className="text-xs text-red-400">$93.0M budget</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                <span className="text-gray-300 font-medium">Facility Management</span>
              </div>
              <div className="text-right">
                <span className="text-white font-bold">3+ projects</span>
                <p className="text-xs text-green-400">$25.4M operational</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
