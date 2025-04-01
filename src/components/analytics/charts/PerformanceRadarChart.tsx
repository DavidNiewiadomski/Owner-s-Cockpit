
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
  // Enhanced futuristic colors with better contrast for legibility
  const enhancedColors = {
    primary: "#38bdf8",        // Bright cyan
    secondary: "#f472b6",      // Pink-500
    gridLine: "#1e293b",       // Slate-800
    textPrimary: "#FFFFFF",    // Pure white for better legibility
    textSecondary: "#C8C8C9",  // Light gray for secondary text
    cardBg: "bg-gradient-to-br from-black to-zinc-900 border-cyan-900/30",
    cardHeader: "bg-gradient-to-r from-cyan-950/50 to-transparent border-b border-cyan-900/20"
  };

  return (
    <Card className={`shadow-[0_4px_30px_rgba(56,189,248,0.15)] ${enhancedColors.cardBg}`}>
      <CardHeader className={`pb-2 ${enhancedColors.cardHeader}`}>
        <CardTitle className="text-lg text-white flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-cyan-400" />
          Project Performance Metrics
        </CardTitle>
        <CardDescription className="text-gray-200 font-medium">
          Multi-dimensional performance comparison
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  <stop offset="5%" stopColor={enhancedColors.primary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={enhancedColors.primary} stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={enhancedColors.secondary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={enhancedColors.secondary} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <PolarGrid stroke={enhancedColors.gridLine} />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: enhancedColors.textPrimary, fontSize: 13, fontWeight: 500 }}
                stroke={enhancedColors.gridLine}
                tickLine={{ stroke: enhancedColors.gridLine }}
              />
              <Radar 
                name="Current Projects" 
                dataKey="A" 
                stroke={enhancedColors.primary} 
                strokeWidth={2}
                fill="url(#colorA)" 
                fillOpacity={0.6}
                animationDuration={1500}
                filter="url(#glow)"
              />
              <Radar 
                name="Previous Period" 
                dataKey="B" 
                stroke={enhancedColors.secondary} 
                strokeWidth={2}
                fill="url(#colorB)" 
                fillOpacity={0.6}
                animationDuration={1500}
                animationBegin={300}
                filter="url(#glow)"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.85)', 
                  border: '1px solid #334155', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(56,189,248,0.3)',
                  padding: '10px 14px',
                }}
                labelStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}
                itemStyle={{ color: '#ffffff', fontSize: '13px', padding: '3px 0' }}
              />
              <Legend 
                formatter={(value) => (
                  <span style={{ 
                    color: value === 'Current Projects' ? enhancedColors.primary : enhancedColors.secondary, 
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textShadow: '0 0 5px rgba(0,0,0,0.5)'
                  }}>
                    {value}
                  </span>
                )}
                iconSize={12}
                wrapperStyle={{ paddingTop: '15px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
