
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

  // Custom tooltip component with improved styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-cyan-700/40 backdrop-blur-lg rounded-lg shadow-lg py-2 px-3 text-white">
          <p className="text-cyan-400 font-semibold">{payload[0].payload.name}</p>
          <p className="text-white text-sm">
            <span className="font-medium text-cyan-200">Open Issues:</span>{' '}
            <span className="text-white font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
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
                
                {/* Add highlight effect for hover */}
                <filter id="hoverGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodColor="#38bdf8" floodOpacity="0.7" result="glow" />
                  <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                  <feMerge>
                    <feMergeNode in="softGlow" />
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
                content={<CustomTooltip />}
                cursor={{
                  fill: 'rgba(56, 189, 248, 0.1)',
                  strokeWidth: 1,
                  stroke: 'rgba(56, 189, 248, 0.4)',
                  rx: 4,
                  ry: 4
                }}
              />
              <Bar 
                dataKey="issues" 
                name="Open Issues" 
                fill="url(#issueGradient)"
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
                className="transition-all duration-300 ease-in-out"
                onMouseOver={(data, index) => {
                  document.querySelector(`.recharts-bar-rectangle:nth-child(${index + 1})`)?.setAttribute('filter', 'url(#hoverGlow)');
                }}
                onMouseOut={(data, index) => {
                  document.querySelector(`.recharts-bar-rectangle:nth-child(${index + 1})`)?.removeAttribute('filter');
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
