
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar
} from 'recharts';
import { PortfolioAllocationData } from './types';

// Sample data for quarterly investment allocation
const quarterlyAllocation: PortfolioAllocationData[] = [
  { name: 'Q1', residential: 35, commercial: 20, mixedUse: 10, infrastructure: 10, special: 5 },
  { name: 'Q2', residential: 38, commercial: 22, mixedUse: 12, infrastructure: 11, special: 6 },
  { name: 'Q3', residential: 40, commercial: 25, mixedUse: 15, infrastructure: 12, special: 8 },
  { name: 'Q4', residential: 42, commercial: 26, mixedUse: 18, infrastructure: 14, special: 10 },
];

// Custom tooltip component for bar chart
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-cyan-800/50 p-3 rounded-md shadow-[0_0_15px_rgba(56,189,248,0.3)]">
        <p className="font-bold text-cyan-300">{`Quarter: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function PortfolioAllocationBarChart() {
  return (
    <Card className="p-6 bg-black border-gray-800 col-span-2">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-medium">Portfolio Allocation by Project Type</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={quarterlyAllocation} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <defs>
              {/* Residential bar gradient and glow */}
              <linearGradient id="residentialGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.3}/>
              </linearGradient>
              <filter id="residentialGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="#0284c7" floodOpacity="0.7" result="glow" />
                <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                <feMerge>
                  <feMergeNode in="softGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              {/* Commercial bar gradient and glow */}
              <linearGradient id="commercialGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0891b2" stopOpacity={0.3}/>
              </linearGradient>
              <filter id="commercialGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="#0891b2" floodOpacity="0.7" result="glow" />
                <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                <feMerge>
                  <feMergeNode in="softGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              {/* Mixed-Use bar gradient and glow */}
              <linearGradient id="mixedUseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.3}/>
              </linearGradient>
              <filter id="mixedUseGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="#7c3aed" floodOpacity="0.7" result="glow" />
                <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                <feMerge>
                  <feMergeNode in="softGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              {/* Infrastructure bar gradient and glow */}
              <linearGradient id="infrastructureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0.3}/>
              </linearGradient>
              <filter id="infrastructureGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="#059669" floodOpacity="0.7" result="glow" />
                <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                <feMerge>
                  <feMergeNode in="softGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              {/* Special Projects bar gradient and glow */}
              <linearGradient id="specialGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#db2777" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#db2777" stopOpacity={0.3}/>
              </linearGradient>
              <filter id="specialGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="#db2777" floodOpacity="0.7" result="glow" />
                <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                <feMerge>
                  <feMergeNode in="softGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.1)" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              content={<CustomBarTooltip />}
              cursor={{
                fill: 'rgba(56, 189, 248, 0.1)',
                strokeWidth: 1,
                stroke: 'rgba(56, 189, 248, 0.4)',
                rx: 4,
                ry: 4
              }}
            />
            <Legend 
              wrapperStyle={{ 
                color: '#eee',
                paddingTop: '20px',
                lineHeight: '24px',
                marginTop: '15px'
              }}
              formatter={(value) => <span className="text-gray-300">{value}</span>}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
            <Bar 
              dataKey="residential" 
              name="Residential" 
              fill="url(#residentialGradient)" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              className="transition-all duration-300 ease-in-out"
              onMouseOver={(data, index) => {
                document.querySelector(`.recharts-bar-rectangle:nth-child(${index + 1})`)?.setAttribute('filter', 'url(#residentialGlow)');
              }}
              onMouseOut={(data, index) => {
                document.querySelector(`.recharts-bar-rectangle:nth-child(${index + 1})`)?.removeAttribute('filter');
              }}
            />
            <Bar 
              dataKey="commercial" 
              name="Commercial" 
              fill="url(#commercialGradient)" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              className="transition-all duration-300 ease-in-out"
              onMouseOver={(data, index) => {
                document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-1:nth-child(${index + 1})`)?.setAttribute('filter', 'url(#commercialGlow)');
              }}
              onMouseOut={(data, index) => {
                document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-1:nth-child(${index + 1})`)?.removeAttribute('filter');
              }}
            />
            <Bar 
              dataKey="mixedUse" 
              name="Mixed-Use" 
              fill="url(#mixedUseGradient)" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              className="transition-all duration-300 ease-in-out"
              onMouseOver={(data, index) => {
                document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-2:nth-child(${index + 1})`)?.setAttribute('filter', 'url(#mixedUseGlow)');
              }}
              onMouseOut={(data, index) => {
                document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-2:nth-child(${index + 1})`)?.removeAttribute('filter');
              }}
            />
            <Bar 
              dataKey="infrastructure" 
              name="Infrastructure" 
              fill="url(#infrastructureGradient)" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              className="transition-all duration-300 ease-in-out"
              onMouseOver={(data, index) => {
                document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-3:nth-child(${index + 1})`)?.setAttribute('filter', 'url(#infrastructureGlow)');
              }}
              onMouseOut={(data, index) => {
                document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-3:nth-child(${index + 1})`)?.removeAttribute('filter');
              }}
            />
            <Bar 
              dataKey="special" 
              name="Special Projects" 
              fill="url(#specialGradient)" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              className="transition-all duration-300 ease-in-out"
              onMouseOver={(data, index) => {
                document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-4:nth-child(${index + 1})`)?.setAttribute('filter', 'url(#specialGlow)');
              }}
              onMouseOut={(data, index) => {
                document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-4:nth-child(${index + 1})`)?.removeAttribute('filter');
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
