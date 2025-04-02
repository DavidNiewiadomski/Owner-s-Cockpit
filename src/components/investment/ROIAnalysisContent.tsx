
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';

interface ROIAnalysisContentProps {
  roiData?: any[];
  propertyValueData?: any[];
}

export function ROIAnalysisContent({ roiData = [], propertyValueData = [] }: ROIAnalysisContentProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-black border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">ROI Performance Analysis</CardTitle>
          <CardDescription className="text-gray-400">
            Comparison of projected vs. actual returns on investment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={roiData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" tick={{ fill: '#ccc' }} />
                <YAxis 
                  tickFormatter={(value) => `${value}%`} 
                  domain={['dataMin - 0.5', 'dataMax + 0.5']}
                  tick={{ fill: '#ccc' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                />
                <Legend />
                <ReferenceLine y={7.0} stroke="#a855f7" strokeDasharray="3 3" label={{ value: 'Target ROI', position: 'insideBottomRight', fill: '#a855f7' }} />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  name="Projected ROI" 
                  stroke="#4ade80" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 1 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual ROI" 
                  stroke="#38bdf8" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 1 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Return Distribution</CardTitle>
            <CardDescription className="text-gray-400">
              Breakdown of returns by property type and location
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {/* Distribution chart would go here */}
            <div className="flex items-center justify-center h-full border border-dashed border-gray-700 rounded-md">
              <p className="text-gray-500">Return distribution visualization</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Value Growth Rate</CardTitle>
            <CardDescription className="text-gray-400">
              Property value appreciation over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={propertyValueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" tick={{ fill: '#ccc' }} />
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
                    name="Property Value" 
                    stroke="#f472b6" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
