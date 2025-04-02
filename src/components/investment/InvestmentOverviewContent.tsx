
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AIInsightsCard } from './AIInsightsCard';

interface InvestmentMetric {
  label: string;
  original: string;
  current: string;
  impact: "positive" | "negative";
  variance: string;
}

interface InvestmentOverviewContentProps {
  investmentMetrics: InvestmentMetric[];
  propertyValueData?: any[];
}

export function InvestmentOverviewContent({ investmentMetrics, propertyValueData = [] }: InvestmentOverviewContentProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {investmentMetrics.map((metric, index) => (
          <Card key={index} className="bg-black border-gray-800">
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">{metric.label}</p>
                <div className="flex items-baseline justify-between">
                  <p className="text-xl font-bold text-white">{metric.current}</p>
                  <div className="flex items-center text-xs">
                    <span 
                      className={`mr-1 ${
                        metric.impact === 'positive' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {metric.variance}
                    </span>
                    <span className="text-gray-500">from {metric.original}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Property Value Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={propertyValueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#ccc' }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${value}M`}
                    tick={{ fill: '#ccc' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}M`, 'Property Value']}
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#38bdf8" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <AIInsightsCard />
      </div>
    </div>
  );
}
