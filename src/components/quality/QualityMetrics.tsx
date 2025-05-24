
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const qualityTrends = [
  { month: 'Sep', score: 89.2, defects: 12 },
  { month: 'Oct', score: 91.5, defects: 8 },
  { month: 'Nov', score: 93.1, defects: 6 },
  { month: 'Dec', score: 94.8, defects: 4 },
  { month: 'Jan', score: 94.2, defects: 5 }
];

const defectsByCategory = [
  { name: 'Structural', value: 35, color: '#EF4444' },
  { name: 'Electrical', value: 25, color: '#F59E0B' },
  { name: 'Plumbing', value: 20, color: '#3B82F6' },
  { name: 'Finishing', value: 20, color: '#10B981' }
];

const inspectionResults = [
  { category: 'Foundation', passed: 98, failed: 2 },
  { category: 'Structural', passed: 94, failed: 6 },
  { category: 'Electrical', passed: 96, failed: 4 },
  { category: 'Plumbing', passed: 92, failed: 8 },
  { category: 'HVAC', passed: 95, failed: 5 }
];

export function QualityMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quality Score Trends</CardTitle>
            <CardDescription className="text-gray-400">
              Overall quality performance over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={qualityTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" tick={{ fill: '#9CA3AF' }} />
                <YAxis tick={{ fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Defects by Category</CardTitle>
            <CardDescription className="text-gray-400">
              Distribution of quality issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={defectsByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {defectsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Inspection Results by Category</CardTitle>
          <CardDescription className="text-gray-400">
            Pass/fail rates across different inspection types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inspectionResults}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="category" tick={{ fill: '#9CA3AF' }} />
              <YAxis tick={{ fill: '#9CA3AF' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="passed" fill="#10B981" />
              <Bar dataKey="failed" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
