
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { ArrowDownIcon, ArrowUpIcon, TrendingUp, DollarSign, Target, Layers, Building, Clock, MessageSquare, LightbulbIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { AIAssistant } from '@/components/ai/AIAssistant';

interface InvestmentMetric {
  label: string;
  original: string;
  current: string;
  impact: "positive" | "negative";
  variance: string;
}

const roiData = [
  { name: 'Jan', projected: 7.2, actual: 7.0 },
  { name: 'Feb', projected: 7.3, actual: 6.9 },
  { name: 'Mar', projected: 7.4, actual: 6.8 },
  { name: 'Apr', projected: 7.5, actual: 6.7 },
  { name: 'May', projected: 7.6, actual: 6.5 },
  { name: 'Jun', projected: 7.7, actual: 6.3 },
  { name: 'Jul', projected: 7.8, actual: 6.4 },
  { name: 'Aug', projected: 7.9, actual: 6.6 },
  { name: 'Sep', projected: 8.0, actual: 6.8 },
  { name: 'Oct', projected: 8.1, actual: 7.0 },
  { name: 'Nov', projected: 8.2, actual: 7.2 },
  { name: 'Dec', projected: 8.3, actual: 7.3 },
];

const propertyValueData = [
  { name: 'Q1 2022', value: 12.5 },
  { name: 'Q2 2022', value: 13.2 },
  { name: 'Q3 2022', value: 14.1 },
  { name: 'Q4 2022', value: 14.5 },
  { name: 'Q1 2023', value: 15.3 },
  { name: 'Q2 2023', value: 16.0 },
  { name: 'Q3 2023', value: 16.8 },
  { name: 'Q4 2023', value: 17.5 },
];

const investmentMetrics: InvestmentMetric[] = [
  {
    label: 'Total Investment',
    original: '$36.8M',
    current: '$38.2M',
    impact: "positive",
    variance: '+$1.4M'
  },
  {
    label: 'Yearly ROI',
    original: '7.2%',
    current: '6.9%',
    impact: "negative",
    variance: '-0.3%'
  },
  {
    label: 'Property Value',
    original: '$52.5M',
    current: '$57.2M',
    impact: "positive",
    variance: '+$4.7M'
  },
  {
    label: 'Occupancy Rate',
    original: '92%',
    current: '95%',
    impact: "positive",
    variance: '+3%'
  },
  {
    label: 'Operating Expenses',
    original: '$4.2M',
    current: '$4.5M',
    impact: "negative",
    variance: '+$0.3M'
  }
];

const investmentAllocationData = [
  { name: 'Land Acquisition', value: 35 },
  { name: 'Construction', value: 40 },
  { name: 'Design & Engineering', value: 10 },
  { name: 'Permits & Fees', value: 5 },
  { name: 'Contingency', value: 7 },
  { name: 'Other', value: 3 },
];

const investmentInsights = [
  {
    title: "ROI Alert",
    content: "Current ROI is 0.3% below projection due to increased material costs",
    type: "warning" as const
  },
  {
    title: "Investment Impact",
    content: "Property value has increased by 9.3%, outperforming market average by 2.1%",
    type: "success" as const
  },
  {
    title: "Budget Variance",
    content: "Construction phase is currently under budget by $325,000",
    type: "info" as const
  },
  {
    title: "Market Analysis",
    content: "Similar properties in the area have appreciated 7.2% on average this year",
    type: "info" as const
  }
];

type InsightType = "warning" | "success" | "info";

interface Insight {
  title: string;
  content: string;
  type: InsightType;
}

const InvestmentImpact = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onSearch={(term) => console.log('Search term:', term)} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Card className="border-construction-600/30 bg-gray-800/50 backdrop-blur-sm shadow-lg mb-6">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <LightbulbIcon className="h-5 w-5 text-construction-400" />
                    <h3 className="font-medium text-white">AI Insights for Investment Impact</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSheetOpen(true)}
                    className="h-8 text-construction-400 hover:text-construction-300 hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="mr-1">Open AI Chat</span>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {investmentInsights.map((insight, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start gap-2 p-3 rounded-md bg-gray-750 border hover-scale transition-all duration-200 cursor-pointer ${
                        insight.type === "warning" ? "border-amber-700/50 hover:border-amber-600" : 
                        insight.type === "success" ? "border-green-700/50 hover:border-green-600" : 
                        "border-blue-700/50 hover:border-blue-600"
                      }`}
                      onClick={() => setSheetOpen(true)}
                    >
                      <LightbulbIcon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        insight.type === "warning" ? "text-amber-400" : 
                        insight.type === "success" ? "text-green-400" : 
                        "text-blue-400"
                      }`} />
                      <div>
                        <p className="text-xs font-medium mb-1">{insight.title}</p>
                        <p className="text-sm text-gray-200">{insight.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Investment Impact</h1>
                <p className="text-gray-400">Track and analyze the financial performance of your construction projects</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <Button variant="outline" className="border-gray-700 bg-black hover:bg-gray-900">
                  <Clock className="h-4 w-4 mr-2" />
                  Historical Data
                </Button>
                <Button className="bg-construction-600 hover:bg-construction-700 text-white">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Financial Report
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="bg-gray-900 border border-gray-800">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
                <TabsTrigger value="allocation">Investment Allocation</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-black border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-md font-medium text-gray-200">Current ROI</CardTitle>
                      <TrendingUp className="h-4 w-4 text-construction-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">7.3%</div>
                      <p className="text-xs text-gray-400 mt-1">Annual return on investment</p>
                      <div className="flex items-center mt-4">
                        <div className="text-construction-500 flex items-center text-sm">
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                          0.2%
                        </div>
                        <span className="text-gray-400 text-xs ml-2">from last quarter</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-md font-medium text-gray-200">Total Investment</CardTitle>
                      <DollarSign className="h-4 w-4 text-construction-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">$38.2M</div>
                      <p className="text-xs text-gray-400 mt-1">Across all active projects</p>
                      <div className="flex items-center mt-4">
                        <div className="text-construction-500 flex items-center text-sm">
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                          $1.4M
                        </div>
                        <span className="text-gray-400 text-xs ml-2">from initial investment</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-md font-medium text-gray-200">Value Increase</CardTitle>
                      <Target className="h-4 w-4 text-construction-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">+9.3%</div>
                      <p className="text-xs text-gray-400 mt-1">Year-over-year property value growth</p>
                      <div className="flex items-center mt-4">
                        <div className="text-construction-500 flex items-center text-sm">
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                          2.1%
                        </div>
                        <span className="text-gray-400 text-xs ml-2">above market average</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="bg-black border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Return on Investment Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={roiData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="name" stroke="#666" />
                          <YAxis 
                            tickFormatter={(value) => `${value}%`} 
                            domain={[6, 9]} 
                            stroke="#666"
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} 
                            labelStyle={{ color: '#ccc' }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="projected" 
                            stroke="#10B981" 
                            activeDot={{ r: 8 }} 
                            strokeWidth={2}
                            name="Projected ROI"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="actual" 
                            stroke="#EF4444" 
                            activeDot={{ r: 8 }} 
                            strokeWidth={2}
                            name="Actual ROI"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-black border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Investment Metrics Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="py-3 text-left text-gray-400">Metric</th>
                            <th className="py-3 text-left text-gray-400">Initial</th>
                            <th className="py-3 text-left text-gray-400">Current</th>
                            <th className="py-3 text-left text-gray-400">Variance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {investmentMetrics.map((metric, index) => (
                            <tr key={index} className="border-b border-gray-800">
                              <td className="py-3 font-medium text-white">{metric.label}</td>
                              <td className="py-3 text-gray-300">{metric.original}</td>
                              <td className="py-3">
                                <span className="font-medium text-white">{metric.current}</span>
                              </td>
                              <td className="py-3">
                                <Badge variant="outline" className={
                                  metric.impact === "positive" 
                                    ? "bg-green-900/20 text-green-400 border-green-700/30" 
                                    : "bg-red-900/20 text-red-400 border-red-700/30"
                                }>
                                  {metric.variance}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="roi" className="space-y-6">
                <Card className="bg-black border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">ROI Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-400">
                    <p>Detailed ROI analysis content would go here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="allocation" className="space-y-6">
                <Card className="bg-black border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Investment Allocation</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-400">
                    <p>Investment allocation breakdown would go here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="properties" className="space-y-6">
                <Card className="bg-black border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Property Values</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-400">
                    <p>Property value analysis would go here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetContent 
                side="right" 
                className="w-[350px] md:w-[400px] max-w-[80vw] p-0 overflow-hidden border-none"
              >
                <div className="backdrop-blur-lg rounded-l-xl overflow-hidden shadow-2xl border-l border-white/5">
                  <SheetHeader className="p-3 bg-gradient-to-r from-gray-900/80 to-black/80 border-b border-white/10">
                    <SheetTitle className="text-white flex items-center gap-2 text-sm">
                      <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-construction-600/20">
                        <LightbulbIcon className="h-3 w-3 text-construction-400" />
                        <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-construction-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-construction-500"></span>
                        </span>
                      </div>
                      AI Investment Assistant
                    </SheetTitle>
                  </SheetHeader>
                  <div className="h-[calc(100vh-3.5rem)] bg-black/50 backdrop-blur-md">
                    <AIAssistant />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InvestmentImpact;
