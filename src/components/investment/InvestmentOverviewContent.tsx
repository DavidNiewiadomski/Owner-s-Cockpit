
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, DollarSign, Target, ArrowUpIcon } from 'lucide-react';
import { InvestmentMetric, roiData } from '@/data/investment/investmentData';

interface InvestmentOverviewContentProps {
  investmentMetrics: InvestmentMetric[];
}

export function InvestmentOverviewContent({ investmentMetrics }: InvestmentOverviewContentProps) {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
