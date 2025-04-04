
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ProjectData {
  name: string;
  complete: number;
  budget: number;
  issues: number;
  efficiency: number;
}

interface ProjectCompletionChartProps {
  projectData: ProjectData[];
  colors: {
    primary: string;
    secondary: string;
    gridLine: string;
  };
}

export function ProjectCompletionChart({ projectData, colors }: ProjectCompletionChartProps) {
  // Enhanced futuristic colors with better contrast for text legibility
  const enhancedColors = {
    primary: "#38bdf8",        // Bright cyan
    secondary: "#f472b6",      // Pink-500
    gridLine: "#1e293b",       // Slate-800
    textPrimary: "#FFFFFF",    // Pure white for better legibility
    textSecondary: "#C8C8C9",  // Light gray for secondary text
    cardBg: "bg-gradient-to-br from-black to-zinc-900 border-cyan-900/30",
    cardHeader: "bg-gradient-to-r from-cyan-950/50 to-transparent border-b border-cyan-900/20"
  };
  
  // Custom tooltip component with improved styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-cyan-700/40 backdrop-blur-lg rounded-lg shadow-lg py-2 px-3 text-white">
          <p className="text-cyan-400 font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-white text-sm">
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.name}:
              </span>{' '}
              <span className="text-white font-bold">{entry.value}%</span>
            </p>
          ))}
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
          Project Completion vs Budget
        </CardTitle>
        <CardDescription className="text-gray-200 font-medium">
          Comparing completion percentage against budget utilization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={projectData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorComplete" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={enhancedColors.primary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={enhancedColors.primary} stopOpacity={0.3}/>
                </linearGradient>
                <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={enhancedColors.secondary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={enhancedColors.secondary} stopOpacity={0.3}/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                {/* Add highlight effect for hover */}
                <filter id="completionGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodColor="#38bdf8" floodOpacity="0.7" result="glow" />
                  <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                  <feMerge>
                    <feMergeNode in="softGlow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <filter id="budgetGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodColor="#f472b6" floodOpacity="0.7" result="glow" />
                  <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                  <feMerge>
                    <feMergeNode in="softGlow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={enhancedColors.gridLine} opacity={0.5} />
              <XAxis 
                dataKey="name" 
                stroke="#aaa" 
                tick={{ fill: enhancedColors.textPrimary, fontSize: 13, fontWeight: 500 }}
                axisLine={{ stroke: enhancedColors.gridLine }}
              />
              <YAxis 
                stroke="#aaa" 
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
              <Legend 
                verticalAlign="top" 
                height={36}
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) => (
                  <span style={{ 
                    color: value === 'Completion %' ? enhancedColors.primary : enhancedColors.secondary, 
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textShadow: '0 0 5px rgba(0,0,0,0.5)'
                  }}>
                    {value}
                  </span>
                )}
              />
              <Bar 
                dataKey="complete" 
                name="Completion %" 
                fill="url(#colorComplete)" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                className="transition-all duration-300 ease-in-out"
                onMouseOver={(data, index) => {
                  document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-0:nth-child(${index + 1})`)?.setAttribute('filter', 'url(#completionGlow)');
                }}
                onMouseOut={(data, index) => {
                  document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-0:nth-child(${index + 1})`)?.removeAttribute('filter');
                }}
              />
              <Bar 
                dataKey="budget" 
                name="Budget Used %" 
                fill="url(#colorBudget)" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationBegin={300}
                className="transition-all duration-300 ease-in-out"
                onMouseOver={(data, index) => {
                  document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-1:nth-child(${index + 1})`)?.setAttribute('filter', 'url(#budgetGlow)');
                }}
                onMouseOut={(data, index) => {
                  document.querySelector(`.recharts-bar-rectangle.recharts-bar-rectangle-1:nth-child(${index + 1})`)?.removeAttribute('filter');
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
