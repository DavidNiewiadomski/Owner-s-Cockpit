
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProjectData {
  name: string;
  issues: number;
}

interface IssuesBarChartProps {
  projectData: ProjectData[];
  colors: {
    accent: string;
    gridLine: string;
  };
}

export function IssuesBarChart({ projectData, colors }: IssuesBarChartProps) {
  // Enhanced futuristic colors with improved text legibility
  const enhancedColors = {
    accent: "#f97316",        // Orange-500
    secondary: "#c026d3",     // Fuchsia-600
    gridLine: "#1e293b",      // Slate-800
    textPrimary: "#FFFFFF",   // Pure white for better legibility
    textSecondary: "#C8C8C9", // Light gray for secondary text
    cardBg: "bg-gradient-to-br from-black to-zinc-900 border-cyan-900/30",
    cardHeader: "bg-gradient-to-r from-cyan-950/50 to-transparent border-b border-cyan-900/20"
  };

  return (
    <Card className={`shadow-[0_4px_30px_rgba(56,189,248,0.15)] ${enhancedColors.cardBg}`}>
      <CardHeader className={`pb-2 ${enhancedColors.cardHeader}`}>
        <CardTitle className="text-lg text-white flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-cyan-400" />
          Issues by Project
        </CardTitle>
        <CardDescription className="text-gray-200 font-medium">
          Open issues requiring attention across projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={projectData}
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              layout="vertical"
            >
              <defs>
                <linearGradient id="issueGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={enhancedColors.accent} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={enhancedColors.secondary} stopOpacity={0.8}/>
                </linearGradient>
                <filter id="issueGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={enhancedColors.gridLine} opacity={0.5} />
              <XAxis 
                type="number" 
                stroke="#aaa"
                tick={{ fill: enhancedColors.textPrimary, fontSize: 13, fontWeight: 500 }}
                axisLine={{ stroke: enhancedColors.gridLine }}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#aaa"
                width={120}
                tick={{ fill: enhancedColors.textPrimary, fontSize: 13, fontWeight: 500 }}
                axisLine={{ stroke: enhancedColors.gridLine }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.85)', 
                  border: '1px solid #334155', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(56,189,248,0.3)',
                  padding: '10px 14px',
                }}
                labelStyle={{ color: enhancedColors.textPrimary, fontWeight: 'bold', fontSize: '14px' }}
                itemStyle={{ color: enhancedColors.textPrimary, fontSize: '13px' }}
                formatter={(value) => [`${value} issues`, 'Open Issues']}
              />
              <Bar 
                dataKey="issues" 
                name="Open Issues" 
                fill="url(#issueGradient)"
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
                filter="url(#issueGlow)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
