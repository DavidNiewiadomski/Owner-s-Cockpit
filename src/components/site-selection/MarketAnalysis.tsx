
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Users, Building, MapPin, DollarSign, BarChart3 } from 'lucide-react';
import { marketAnalysisData } from '@/data/site-selection/siteSelectionData';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function MarketAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <MarketStatCard 
          title="Market Growth" 
          value="+5.2%" 
          subtitle="Annual Population Growth" 
          icon={<TrendingUp className="h-5 w-5 text-green-400" />}
          trend="up"
        />
        <MarketStatCard 
          title="Occupancy Rate" 
          value="92%" 
          subtitle="Commercial Properties" 
          icon={<Building className="h-5 w-5 text-blue-400" />}
          trend="up"
        />
        <MarketStatCard 
          title="Median Income" 
          value="$67.5K" 
          subtitle="Target Demographics" 
          icon={<DollarSign className="h-5 w-5 text-cyan-400" />}
          trend="up"
        />
        <MarketStatCard 
          title="Competition Score" 
          value="6.8/10" 
          subtitle="Market Saturation" 
          icon={<BarChart3 className="h-5 w-5 text-amber-400" />}
          trend="down"
        />
      </div>

      <Tabs defaultValue="demographics" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="competition">Competition Analysis</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="forecast">Demand Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="demographics" className="mt-6">
          <DemographicsAnalysis />
        </TabsContent>
        
        <TabsContent value="competition" className="mt-6">
          <CompetitionAnalysis />
        </TabsContent>
        
        <TabsContent value="trends" className="mt-6">
          <MarketTrendsAnalysis />
        </TabsContent>
        
        <TabsContent value="forecast" className="mt-6">
          <DemandForecast />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MarketStatCard({ title, value, subtitle, icon, trend }: { 
  title: string; 
  value: string; 
  subtitle: string; 
  icon: React.ReactNode;
  trend: 'up' | 'down';
}) {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-xs mt-1 text-gray-400">{subtitle}</span>
            </div>
          </div>
          <div className="bg-gray-800 p-2 rounded-md">{icon}</div>
        </div>
        <div className="mt-4 flex items-center text-xs">
          <span className={trend === 'up' ? 'text-green-400' : 'text-red-400'}>
            {trend === 'up' ? '↑' : '↓'} {trend === 'up' ? 'Positive' : 'Declining'}
          </span>
          <span className="text-gray-500 ml-2">vs. Last Year</span>
        </div>
      </CardContent>
    </Card>
  );
}

function DemographicsAnalysis() {
  const ageDistribution = [
    { name: '18-24', value: 15, fill: '#3b82f6' },
    { name: '25-34', value: 28, fill: '#10b981' },
    { name: '35-44', value: 24, fill: '#f59e0b' },
    { name: '45-54', value: 18, fill: '#ef4444' },
    { name: '55+', value: 15, fill: '#8b5cf6' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Demographic Overview</CardTitle>
          <CardDescription className="text-gray-400">
            Key demographic indicators for target market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketAnalysisData.demographics.map((demo, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">{demo.category}</h4>
                  <p className="text-gray-400 text-sm">{demo.value}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {demo.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <span className={demo.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                    {demo.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Age Distribution</CardTitle>
          <CardDescription className="text-gray-400">
            Population breakdown by age groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    borderColor: '#374151',
                    color: '#f3f4f6'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CompetitionAnalysis() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Competitive Landscape</CardTitle>
        <CardDescription className="text-gray-400">
          Analysis of competing properties in the target area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-800">
              <TableHead className="text-gray-400">Property Name</TableHead>
              <TableHead className="text-gray-400">Distance</TableHead>
              <TableHead className="text-gray-400">Size</TableHead>
              <TableHead className="text-gray-400">Occupancy</TableHead>
              <TableHead className="text-gray-400">Competition Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketAnalysisData.competition.map((competitor, index) => (
              <TableRow key={index} className="border-b border-gray-800">
                <TableCell className="font-medium text-white">{competitor.name}</TableCell>
                <TableCell className="text-gray-400">{competitor.distance}</TableCell>
                <TableCell className="text-gray-400">{competitor.size}</TableCell>
                <TableCell className="text-gray-400">{competitor.occupancy}</TableCell>
                <TableCell>
                  <CompetitionLevelBadge occupancy={competitor.occupancy} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function CompetitionLevelBadge({ occupancy }: { occupancy: string }) {
  const rate = parseInt(occupancy);
  let level = 'Low';
  let color = 'bg-green-500/20 text-green-400';
  
  if (rate > 90) {
    level = 'High';
    color = 'bg-red-500/20 text-red-400';
  } else if (rate > 80) {
    level = 'Medium';
    color = 'bg-amber-500/20 text-amber-400';
  }

  return (
    <Badge className={`${color} border-0`} variant="outline">
      {level}
    </Badge>
  );
}

function MarketTrendsAnalysis() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Market Trends (5-Year View)</CardTitle>
        <CardDescription className="text-gray-400">
          Historical and projected market performance indicators
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={marketAnalysisData.marketTrends}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: '#94a3b8' }}
              />
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
                dataKey="demand" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Market Demand"
              />
              <Line 
                type="monotone" 
                dataKey="supply" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Market Supply"
              />
              <Line 
                type="monotone" 
                dataKey="vacancy" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="Vacancy Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function DemandForecast() {
  const forecastData = [
    { quarter: 'Q1 2025', demand: 95, supply: 98, gap: 3 },
    { quarter: 'Q2 2025', demand: 97, supply: 99, gap: 2 },
    { quarter: 'Q3 2025', demand: 99, supply: 100, gap: 1 },
    { quarter: 'Q4 2025', demand: 102, supply: 101, gap: -1 },
    { quarter: 'Q1 2026', demand: 105, supply: 102, gap: -3 },
    { quarter: 'Q2 2026', demand: 108, supply: 104, gap: -4 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Demand vs Supply Forecast</CardTitle>
          <CardDescription className="text-gray-400">
            Projected market conditions over the next 18 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={forecastData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
                <XAxis 
                  dataKey="quarter" 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis tick={{ fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    borderColor: '#374151',
                    color: '#f3f4f6'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stackId="1"
                  stroke="#10b981"
                  fill="rgba(16, 185, 129, 0.2)"
                  name="Demand"
                />
                <Area
                  type="monotone"
                  dataKey="supply"
                  stackId="2"
                  stroke="#3b82f6"
                  fill="rgba(59, 130, 246, 0.2)"
                  name="Supply"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Market Insights</CardTitle>
          <CardDescription className="text-gray-400">
            Key findings and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <h4 className="text-green-400 font-medium">Positive Outlook</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Demand is expected to exceed supply by Q4 2025, creating favorable market conditions.
              </p>
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-blue-400" />
                <h4 className="text-blue-400 font-medium">Target Demographics</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Strong concentration of target age groups (25-44) with growing household incomes.
              </p>
            </div>
            
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Building className="h-4 w-4 text-amber-400" />
                <h4 className="text-amber-400 font-medium">Competition Factor</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Moderate competition with opportunity for differentiation through premium amenities.
              </p>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Generate Full Market Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
