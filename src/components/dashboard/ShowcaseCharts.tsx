
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Target,
  Activity,
  Zap,
  Building
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Legend,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Bar,
  Line
} from 'recharts';

// Energy consumption data to match the screenshot
const energyConsumptionData = [
  { month: 'Jan', consumption: 13000, cost: 1800 },
  { month: 'Feb', consumption: 12000, cost: 1750 },
  { month: 'Mar', consumption: 13500, cost: 1850 },
  { month: 'Apr', consumption: 11000, cost: 1600 },
  { month: 'May', consumption: 15500, cost: 2100 },
  { month: 'Jun', consumption: 16000, cost: 2200 }
];

// Building efficiency data to match the screenshot
const buildingEfficiencyData = [
  { name: 'Building A', current: 92, target: 95 },
  { name: 'Building B', current: 88, target: 95 },
  { name: 'Building C', current: 98, target: 95 },
  { name: 'Building D', current: 89, target: 95 }
];

// Enhanced showcase data
const performanceData = [
  { month: 'Jan', revenue: 85000, projects: 12, efficiency: 94, safety: 98 },
  { month: 'Feb', revenue: 92000, projects: 15, efficiency: 96, safety: 97 },
  { month: 'Mar', revenue: 105000, projects: 18, efficiency: 91, safety: 99 },
  { month: 'Apr', revenue: 118000, projects: 22, efficiency: 93, safety: 96 },
  { month: 'May', revenue: 134000, projects: 25, efficiency: 97, safety: 98 },
  { month: 'Jun', revenue: 142000, projects: 28, efficiency: 95, safety: 99 }
];

const radarData = [
  { subject: 'Quality', A: 95, B: 88, fullMark: 100 },
  { subject: 'Timeline', A: 92, B: 85, fullMark: 100 },
  { subject: 'Budget', A: 89, B: 92, fullMark: 100 },
  { subject: 'Safety', A: 98, B: 94, fullMark: 100 },
  { subject: 'Efficiency', A: 94, B: 87, fullMark: 100 },
  { subject: 'Innovation', A: 87, B: 82, fullMark: 100 }
];

const portfolioData = [
  { name: 'Residential', value: 35, amount: 45000000, color: '#00D4FF' },
  { name: 'Commercial', value: 28, amount: 36000000, color: '#FF6B9D' },
  { name: 'Infrastructure', value: 22, amount: 28000000, color: '#FFE66D' },
  { name: 'Industrial', value: 15, amount: 19000000, color: '#4ECDC4' }
];

const trendData = [
  { quarter: 'Q1 2023', actual: 82, projected: 85, variance: -3 },
  { quarter: 'Q2 2023', actual: 89, projected: 87, variance: 2 },
  { quarter: 'Q3 2023', actual: 94, projected: 90, variance: 4 },
  { quarter: 'Q4 2023', actual: 96, projected: 93, variance: 3 },
  { quarter: 'Q1 2024', actual: 98, projected: 95, variance: 3 }
];

export function ShowcaseCharts() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Energy Charts Section - Top Priority */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Energy Consumption Trend */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-black via-gray-900 to-black border-orange-500/30 shadow-[0_0_30px_rgba(251,146,60,0.2)] h-full">
            <CardHeader className="pb-4 bg-gradient-to-r from-orange-950/50 to-transparent border-b border-orange-500/20">
              <CardTitle className="text-xl text-white flex items-center">
                <Zap className="h-6 w-6 mr-3 text-orange-400" />
                Energy Consumption Trend
              </CardTitle>
              <p className="text-gray-300">Monthly energy usage and costs</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={energyConsumptionData}>
                    <defs>
                      <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FB923C" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F97316" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(251, 146, 60, 0.1)" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#FB923C', fontSize: 14, fontWeight: 500 }}
                      axisLine={{ stroke: 'rgba(251, 146, 60, 0.3)' }}
                    />
                    <YAxis 
                      yAxisId="consumption"
                      orientation="left"
                      tickFormatter={(value) => `${value/1000}k`}
                      tick={{ fill: '#FB923C', fontSize: 14, fontWeight: 500 }}
                      axisLine={{ stroke: 'rgba(251, 146, 60, 0.3)' }}
                    />
                    <YAxis 
                      yAxisId="cost"
                      orientation="right"
                      tickFormatter={(value) => `$${value}`}
                      tick={{ fill: '#10B981', fontSize: 14, fontWeight: 500 }}
                      axisLine={{ stroke: 'rgba(16, 185, 129, 0.3)' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                        border: '1px solid rgba(251, 146, 60, 0.5)', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(251, 146, 60, 0.3)'
                      }}
                      labelStyle={{ color: '#FB923C', fontWeight: 'bold' }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '15px' }}
                      formatter={(value) => <span style={{ color: '#E2E8F0', fontWeight: '600' }}>{value}</span>}
                    />
                    <Line 
                      yAxisId="consumption"
                      type="monotone" 
                      dataKey="consumption" 
                      stroke="#FB923C"
                      strokeWidth={3}
                      dot={{ fill: '#FB923C', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#FFFFFF', strokeWidth: 2 }}
                      name="Consumption (kWh)"
                      animationDuration={2000}
                    />
                    <Line 
                      yAxisId="cost"
                      type="monotone" 
                      dataKey="cost" 
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, stroke: '#FFFFFF', strokeWidth: 2 }}
                      name="Cost ($)"
                      animationDuration={2000}
                      animationBegin={500}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Building Efficiency Scores */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-blue-900/20 via-black to-cyan-900/20 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] h-full">
            <CardHeader className="pb-4 bg-gradient-to-r from-blue-950/50 to-transparent border-b border-blue-500/20">
              <CardTitle className="text-xl text-white flex items-center">
                <Building className="h-6 w-6 mr-3 text-blue-400" />
                Building Efficiency Scores
              </CardTitle>
              <p className="text-gray-300">Energy efficiency by building</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={buildingEfficiencyData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#60A5FA', fontSize: 14, fontWeight: 500 }}
                      axisLine={{ stroke: 'rgba(59, 130, 246, 0.3)' }}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tick={{ fill: '#E2E8F0', fontSize: 14, fontWeight: 500 }}
                      axisLine={{ stroke: 'rgba(59, 130, 246, 0.3)' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                        border: '1px solid rgba(59, 130, 246, 0.5)', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
                      }}
                      labelStyle={{ color: '#60A5FA', fontWeight: 'bold' }}
                      formatter={(value, name) => [`${value}%`, name === 'current' ? 'Current Efficiency %' : 'Target %']}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '15px' }}
                      formatter={(value) => <span style={{ color: '#E2E8F0', fontWeight: '600' }}>{value === 'current' ? 'Current Efficiency %' : 'Target %'}</span>}
                    />
                    <Bar 
                      dataKey="current" 
                      fill="#3B82F6"
                      name="current"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                    <Bar 
                      dataKey="target" 
                      fill="#10B981"
                      name="target"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      animationBegin={300}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Revenue & Project Performance - Moved Down */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <Card className="bg-gradient-to-br from-black via-gray-900 to-black border-cyan-500/30 shadow-[0_0_50px_rgba(0,212,255,0.3)] overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-cyan-950/50 via-transparent to-purple-950/50 border-b border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl">
                  <TrendingUp className="h-7 w-7 text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                    Revenue & Project Performance
                  </CardTitle>
                  <p className="text-gray-300 font-medium">Real-time construction analytics dashboard</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-300 border-green-500/30 px-4 py-2 animate-pulse">
                <Activity className="h-4 w-4 mr-2" />
                Live Data
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={performanceData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.9}/>
                      <stop offset="50%" stopColor="#0284C7" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="projectGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B9D" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#C026D3" stopOpacity={0.3}/>
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#94A3B8', fontSize: 14, fontWeight: 500 }}
                    axisLine={{ stroke: 'rgba(0, 212, 255, 0.3)' }}
                  />
                  <YAxis 
                    yAxisId="revenue"
                    orientation="left"
                    tickFormatter={(value) => `$${value/1000}k`}
                    tick={{ fill: '#00D4FF', fontSize: 14, fontWeight: 500 }}
                    axisLine={{ stroke: 'rgba(0, 212, 255, 0.3)' }}
                  />
                  <YAxis 
                    yAxisId="projects"
                    orientation="right"
                    tick={{ fill: '#FF6B9D', fontSize: 14, fontWeight: 500 }}
                    axisLine={{ stroke: 'rgba(255, 107, 157, 0.3)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.95)', 
                      border: '1px solid rgba(0, 212, 255, 0.5)', 
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(0, 212, 255, 0.4)',
                      backdropFilter: 'blur(10px)'
                    }}
                    labelStyle={{ color: '#00D4FF', fontWeight: 'bold', fontSize: '16px' }}
                    itemStyle={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '500' }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(value) => <span style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: '600' }}>{value}</span>}
                  />
                  <Area 
                    yAxisId="revenue"
                    type="monotone" 
                    dataKey="revenue" 
                    fill="url(#revenueGradient)"
                    stroke="#00D4FF"
                    strokeWidth={3}
                    name="Revenue ($)"
                    animationDuration={2000}
                    filter="url(#glow)"
                  />
                  <Bar 
                    yAxisId="projects"
                    dataKey="projects" 
                    fill="url(#projectGradient)"
                    name="Active Projects"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={500}
                  />
                  <Line 
                    yAxisId="projects"
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#FFE66D"
                    strokeWidth={3}
                    dot={{ fill: '#FFE66D', strokeWidth: 2, r: 6, filter: 'url(#glow)' }}
                    activeDot={{ r: 8, stroke: '#FFFFFF', strokeWidth: 2, filter: 'url(#glow)' }}
                    name="Efficiency %"
                    animationDuration={2500}
                    animationBegin={1000}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Showcase Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)] h-full">
            <CardHeader className="pb-4 bg-gradient-to-r from-purple-950/50 to-transparent border-b border-purple-500/20">
              <CardTitle className="text-xl text-white flex items-center">
                <Target className="h-6 w-6 mr-3 text-purple-400" />
                Performance Matrix
              </CardTitle>
              <p className="text-gray-300">Multi-dimensional project analysis</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={100} data={radarData}>
                    <defs>
                      <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <PolarGrid stroke="rgba(168, 85, 247, 0.2)" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#E2E8F0', fontSize: 14, fontWeight: 600 }}
                    />
                    <Radar 
                      name="Current Period" 
                      dataKey="A" 
                      stroke="#A855F7" 
                      strokeWidth={3}
                      fill="rgba(168, 85, 247, 0.3)" 
                      fillOpacity={0.6}
                      animationDuration={2000}
                      filter="url(#radarGlow)"
                    />
                    <Radar 
                      name="Previous Period" 
                      dataKey="B" 
                      stroke="#06B6D4" 
                      strokeWidth={2}
                      fill="rgba(6, 182, 212, 0.2)" 
                      fillOpacity={0.4}
                      animationDuration={2000}
                      animationBegin={500}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                        border: '1px solid rgba(168, 85, 247, 0.5)', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)'
                      }}
                      labelStyle={{ color: '#A855F7', fontWeight: 'bold' }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '15px' }}
                      formatter={(value) => <span style={{ color: '#E2E8F0', fontWeight: '600' }}>{value}</span>}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Portfolio Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-emerald-900/20 via-black to-cyan-900/20 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)] h-full">
            <CardHeader className="pb-4 bg-gradient-to-r from-emerald-950/50 to-transparent border-b border-emerald-500/20">
              <CardTitle className="text-xl text-white flex items-center">
                <BarChart3 className="h-6 w-6 mr-3 text-emerald-400" />
                Portfolio Distribution
              </CardTitle>
              <p className="text-gray-300">Project type allocation & revenue</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <filter id="pieGlow" x="-10%" y="-10%" width="120%" height="120%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={40}
                      paddingAngle={3}
                      dataKey="value"
                      animationDuration={1500}
                      animationBegin={800}
                      filter="url(#pieGlow)"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `${value}% (${formatCurrency(props.payload.amount)})`,
                        name
                      ]}
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                        border: '1px solid rgba(16, 185, 129, 0.5)', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
                      }}
                      labelStyle={{ color: '#10B981', fontWeight: 'bold' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value) => <span style={{ color: '#E2E8F0', fontWeight: '600' }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Trends */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-orange-900/20 via-black to-red-900/20 border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
          <CardHeader className="pb-4 bg-gradient-to-r from-orange-950/50 to-transparent border-b border-orange-500/20">
            <CardTitle className="text-xl text-white flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="h-6 w-6 mr-3 text-orange-400" />
                Performance vs Projections
              </div>
              <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30">
                Trending Up
              </Badge>
            </CardTitle>
            <p className="text-gray-300">Quarterly performance analysis with variance tracking</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendData}>
                  <defs>
                    <linearGradient id="actualTrendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EA580C" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="projectedTrendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(249, 115, 22, 0.1)" />
                  <XAxis 
                    dataKey="quarter" 
                    tick={{ fill: '#F97316', fontSize: 14, fontWeight: 500 }}
                    axisLine={{ stroke: 'rgba(249, 115, 22, 0.3)' }}
                  />
                  <YAxis 
                    tick={{ fill: '#E2E8F0', fontSize: 14, fontWeight: 500 }}
                    axisLine={{ stroke: 'rgba(249, 115, 22, 0.3)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                      border: '1px solid rgba(249, 115, 22, 0.5)', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)'
                    }}
                    labelStyle={{ color: '#F97316', fontWeight: 'bold' }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '15px' }}
                    formatter={(value) => <span style={{ color: '#E2E8F0', fontWeight: '600' }}>{value}</span>}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="projected" 
                    fill="url(#projectedTrendGradient)"
                    stroke="#EF4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Projected Performance"
                    animationDuration={2000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#F97316"
                    strokeWidth={4}
                    dot={{ fill: '#F97316', strokeWidth: 2, r: 8 }}
                    activeDot={{ r: 10, stroke: '#FFFFFF', strokeWidth: 2 }}
                    name="Actual Performance"
                    animationDuration={2500}
                    animationBegin={500}
                  />
                  <Bar 
                    dataKey="variance" 
                    fill="rgba(34, 197, 94, 0.6)"
                    name="Variance"
                    radius={[2, 2, 0, 0]}
                    animationDuration={1500}
                    animationBegin={1000}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
