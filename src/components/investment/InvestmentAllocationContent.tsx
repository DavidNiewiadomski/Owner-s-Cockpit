
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { investmentAllocationData } from '@/data/investment/investmentData';
import { Layer, Trend, Filter } from 'lucide-react';

const allocationHistory = [
  { year: '2020', Land: 30, Construction: 45, Design: 8, Permits: 7, Contingency: 8, Other: 2 },
  { year: '2021', Land: 32, Construction: 43, Design: 9, Permits: 6, Contingency: 7, Other: 3 },
  { year: '2022', Land: 35, Construction: 40, Design: 10, Permits: 5, Contingency: 7, Other: 3 },
];

const targetAllocation = [
  { name: 'Land Acquisition', target: 33, actual: 35, variance: 2 },
  { name: 'Construction', target: 42, actual: 40, variance: -2 },
  { name: 'Design & Engineering', target: 11, actual: 10, variance: -1 },
  { name: 'Permits & Fees', target: 4, actual: 5, variance: 1 },
  { name: 'Contingency', target: 8, actual: 7, variance: -1 },
  { name: 'Other', target: 2, actual: 3, variance: 1 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function InvestmentAllocationContent() {
  const [timeframe, setTimeframe] = useState('current');
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.8;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#fff"
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-xl font-semibold text-white mb-4 sm:mb-0">Investment Allocation Breakdown</h2>
        <div className="flex space-x-2">
          <Button 
            variant={timeframe === 'current' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('current')}
            className={timeframe !== 'current' ? "border-gray-700 bg-gray-900" : ""}
          >
            Current
          </Button>
          <Button 
            variant={timeframe === 'historical' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('historical')}
            className={timeframe !== 'historical' ? "border-gray-700 bg-gray-900" : ""}
          >
            Historical
          </Button>
          <Button 
            variant={timeframe === 'target' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('target')}
            className={timeframe !== 'target' ? "border-gray-700 bg-gray-900" : ""}
          >
            Target vs Actual
          </Button>
        </div>
      </div>

      {timeframe === 'current' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Current Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={investmentAllocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {investmentAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, '']}
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-white">Allocation Summary</CardTitle>
              <Layer className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investmentAllocationData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-gray-300">{item.name}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="bg-gray-900/50 text-gray-200 border-gray-700"
                    >
                      {item.value}%
                    </Badge>
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Total Investment</span>
                    <span className="font-bold text-white">$38.2M</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {timeframe === 'historical' && (
        <Card className="bg-black border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Historical Allocation Trends</CardTitle>
            <Button variant="outline" size="sm" className="border-gray-700 bg-gray-900">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={allocationHistory}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="year" stroke="#666" />
                  <YAxis tickFormatter={(value) => `${value}%`} stroke="#666" />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '']}
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  />
                  <Legend />
                  <Bar dataKey="Land" name="Land Acquisition" stackId="a" fill="#0088FE" />
                  <Bar dataKey="Construction" name="Construction" stackId="a" fill="#00C49F" />
                  <Bar dataKey="Design" name="Design & Engineering" stackId="a" fill="#FFBB28" />
                  <Bar dataKey="Permits" name="Permits & Fees" stackId="a" fill="#FF8042" />
                  <Bar dataKey="Contingency" name="Contingency" stackId="a" fill="#8884d8" />
                  <Bar dataKey="Other" name="Other" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {timeframe === 'target' && (
        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Target vs. Actual Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 text-left text-gray-400">Category</th>
                    <th className="py-3 text-right text-gray-400">Target %</th>
                    <th className="py-3 text-right text-gray-400">Actual %</th>
                    <th className="py-3 text-right text-gray-400">Variance</th>
                  </tr>
                </thead>
                <tbody>
                  {targetAllocation.map((item, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-3 font-medium text-white">{item.name}</td>
                      <td className="py-3 text-right text-gray-300">{item.target}%</td>
                      <td className="py-3 text-right text-white">{item.actual}%</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end">
                          {item.variance > 0 ? (
                            <Badge variant="outline" className="bg-amber-900/20 text-amber-400 border-amber-700/30">
                              +{item.variance}%
                            </Badge>
                          ) : item.variance < 0 ? (
                            <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-700/30">
                              {item.variance}%
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-900/20 text-gray-400 border-gray-700/30">
                              0%
                            </Badge>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <div className="text-sm text-gray-400 mb-2">Variance Legend</div>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-amber-900/20 text-amber-400 border-amber-700/30 mr-2">
                    +
                  </Badge>
                  <span className="text-sm text-gray-300">Over-allocated</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-700/30 mr-2">
                    -
                  </Badge>
                  <span className="text-sm text-gray-300">Under-allocated</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
