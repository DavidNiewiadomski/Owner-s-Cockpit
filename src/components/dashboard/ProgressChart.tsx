
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
    <Card className="bg-black border-cyan-900/30 shadow-lg overflow-hidden animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-cyan-300 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-indigo-400" />
            Construction Progress Trend
          </CardTitle>
          <Button size="sm" variant="ghost" className="h-8 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
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
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(59, 130, 246, 0.3)' }}
              />
              <YAxis 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(59, 130, 246, 0.3)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#000000', 
                  border: '1px solid rgba(56, 189, 248, 0.3)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(56, 189, 248, 0.2)'
                }}
                labelStyle={{ color: '#38bdf8', fontWeight: 'bold' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                fill="url(#progressGradient)" 
                className={`transition-all duration-1000 ${activeChart ? 'opacity-100' : 'opacity-90'}`}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
