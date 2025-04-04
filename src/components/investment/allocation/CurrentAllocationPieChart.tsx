
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import { AllocationDataPoint } from './types';

// Sample data for investment allocation
const allocationData: AllocationDataPoint[] = [
  { name: 'Residential', value: 40, color: '#0284c7' },
  { name: 'Commercial', value: 25, color: '#0891b2' },
  { name: 'Mixed-Use', value: 15, color: '#7c3aed' },
  { name: 'Infrastructure', value: 12, color: '#059669' },
  { name: 'Special Projects', value: 8, color: '#db2777' },
];

// Custom tooltip for pie chart
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-cyan-800/50 p-3 rounded-md shadow-[0_0_15px_rgba(56,189,248,0.3)]">
        <p className="font-bold text-cyan-300">{payload[0].name}</p>
        <p className="text-white">
          <span className="text-white font-bold">{payload[0].value}%</span> of portfolio
        </p>
      </div>
    );
  }
  return null;
};

export function CurrentAllocationPieChart() {
  return (
    <Card className="p-6 bg-black border-gray-800">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-medium">Current Allocation</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {/* Add glow filter for pie chart */}
              <filter id="pieSliceGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="#38bdf8" floodOpacity="0.7" result="glow" />
                <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                <feMerge>
                  <feMergeNode in="softGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              labelLine
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              onMouseOver={(data, index) => {
                document.querySelector(`.recharts-pie-sector:nth-child(${index + 1})`)?.setAttribute('filter', 'url(#pieSliceGlow)');
              }}
              onMouseOut={(data, index) => {
                document.querySelector(`.recharts-pie-sector:nth-child(${index + 1})`)?.removeAttribute('filter');
              }}
              animationDuration={1500}
            >
              {allocationData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="transition-all duration-300 ease-in-out" 
                />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomPieTooltip />}
              cursor={{
                fill: 'rgba(56, 189, 248, 0.1)',
                strokeWidth: 1,
                stroke: 'rgba(56, 189, 248, 0.4)',
                rx: 4,
                ry: 4
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
