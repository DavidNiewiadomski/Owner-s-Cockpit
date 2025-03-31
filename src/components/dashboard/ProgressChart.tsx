
import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressChartProps {
  data: { name: string; value: number }[];
}

export function ProgressChart({ data }: ProgressChartProps) {
  const [activeChart, setActiveChart] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChart(prev => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const gradientOffset = () => {
    const max = Math.max(...data.map(i => i.value));
    const min = Math.min(...data.map(i => i.value));
    if (max <= 0) return 0;
    if (min >= 0) return 1;
    return 1 - (max / (max - min));
  };

  const off = gradientOffset();

  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-construction-400" />
            Construction Progress Trend
          </CardTitle>
          <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-400 hover:text-white">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span className="text-xs">Details</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#e2e8f0', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <YAxis 
                tick={{ fill: '#e2e8f0', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#38bdf8" 
                strokeWidth={3}
                fill="url(#splitColor)" 
                className={`transition-all duration-1000 ${activeChart ? 'opacity-100' : 'opacity-80'}`}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
