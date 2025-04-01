
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PerformanceData {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

interface PerformanceRadarChartProps {
  performanceData: PerformanceData[];
  colors: {
    primary: string;
    secondary: string;
    gridLine: string;
  };
}

export function PerformanceRadarChart({ performanceData, colors }: PerformanceRadarChartProps) {
  // Futuristic neon colors based on the reference image
  const futuristicColors = {
    primary: "#00e5ff",       // Neon cyan
    secondary: "#ff5d8f",     // Neon pink
    gridLine: "#1a1a1a",      // Very dark gray
    background: "black",
    textColor: "#ffffff",
    cardBorder: "border-[#333333]",
  };

  return (
    <Card className={`bg-black border-none shadow-[0_0_15px_rgba(0,229,255,0.2)] ${futuristicColors.cardBorder}`}>
      <CardHeader className="pb-2 border-b border-[#333333]">
        <CardTitle className="text-lg text-white flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-[#00e5ff]" />
          Multi-dimensional performance comparison
        </CardTitle>
        <CardDescription className="text-gray-400">
          Performance metrics across key project dimensions
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={performanceData}>
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={futuristicColors.primary} stopOpacity={0.9}/>
                  <stop offset="95%" stopColor={futuristicColors.primary} stopOpacity={0.3}/>
                </linearGradient>
                <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={futuristicColors.secondary} stopOpacity={0.9}/>
                  <stop offset="95%" stopColor={futuristicColors.secondary} stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <PolarGrid stroke={futuristicColors.gridLine} />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#ffffff', fontSize: 12 }}
                stroke={futuristicColors.gridLine}
                tickLine={{ stroke: futuristicColors.gridLine }}
              />
              <Radar 
                name="Current Projects" 
                dataKey="A" 
                stroke={futuristicColors.primary}
                strokeWidth={2} 
                fill="url(#colorA)" 
                fillOpacity={0.5}
                animationDuration={1500}
                filter="url(#glow)"
              />
              <Radar 
                name="Previous Period" 
                dataKey="B" 
                stroke={futuristicColors.secondary}
                strokeWidth={2} 
                fill="url(#colorB)" 
                fillOpacity={0.5}
                animationDuration={1500}
                animationBegin={300}
                filter="url(#glow)"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid #333333', 
                  borderRadius: '8px',
                  boxShadow: '0 0 10px rgba(0,229,255,0.3)'
                }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend 
                formatter={(value) => <span style={{ color: '#ffffff', fontSize: '12px' }}>{value}</span>}
                iconSize={10}
                wrapperStyle={{ paddingTop: '10px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
