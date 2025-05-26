
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { 
  ChartContainer, 
} from "@/components/ui/chart";
import { useProject } from "@/contexts/ProjectContext";
import { costVarianceData, costVarianceChartConfig, formatCurrency } from "./CostVarianceData";
import { CostVarianceTooltip } from "./CostVarianceTooltip";

export function CostVarianceChart() {
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || "All Projects";
  
  return (
    <Card className="h-full bg-black border-cyan-900/30 shadow-[0_4px_20px_rgba(56,189,248,0.15)] animate-fade-in">
      <CardHeader className="bg-black">
        <CardTitle className="text-cyan-300">Cost Variances by Category</CardTitle>
        <CardDescription className="text-gray-400">
          Planned vs actual costs for {projectName}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-black p-4">
        <div className="h-[350px] w-full">
          <ChartContainer config={costVarianceChartConfig} aspectRatio="auto">
            <BarChart
              data={costVarianceData}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 90, // Increased bottom margin to prevent text overlap
              }}
            >
              <defs>
                {/* Enhanced gradients for bars */}
                <linearGradient id="plannedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(139, 92, 246, 0.85)" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="rgba(139, 92, 246, 0.4)" stopOpacity={0.4}/>
                </linearGradient>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(14, 165, 233, 0.85)" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="rgba(14, 165, 233, 0.4)" stopOpacity={0.4}/>
                </linearGradient>
                
                {/* Enhanced hover gradients */}
                <linearGradient id="plannedHoverGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(167, 139, 250, 0.95)" stopOpacity={1}/>
                  <stop offset="95%" stopColor="rgba(139, 92, 246, 0.6)" stopOpacity={0.6}/>
                </linearGradient>
                <linearGradient id="actualHoverGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(56, 189, 248, 0.95)" stopOpacity={1}/>
                  <stop offset="95%" stopColor="rgba(14, 165, 233, 0.6)" stopOpacity={0.6}/>
                </linearGradient>
                
                {/* Dark-themed glow filters for hover effects */}
                <filter id="plannedGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodColor="#8B5CF6" floodOpacity="0.7" result="glow" />
                  <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                  <feMerge>
                    <feMergeNode in="softGlow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <filter id="actualGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodColor="#0EA5E9" floodOpacity="0.7" result="glow" />
                  <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                  <feMerge>
                    <feMergeNode in="softGlow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(59, 130, 246, 0.2)" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: "#94a3b8" }} 
                angle={-45}
                textAnchor="end"
                height={80} // Increased height for more space
                stroke="#475569"
                tickMargin={15} // Added more margin between text and axis
              />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000}k`}
                width={60}
                tick={{ fill: "#94a3b8" }}
                stroke="#475569"
              />
              <Tooltip 
                content={<CostVarianceTooltip />}
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
                  paddingTop: "20px",
                  marginTop: "35px", // Add more space at the top of the legend
                  paddingBottom: "10px"
                }}
                formatter={(value) => <span className="text-gray-300">{value}</span>}
                verticalAlign="bottom" // Position legend at the bottom
                height={36} // Set a fixed height for the legend
              />
              <Bar 
                dataKey="planned" 
                fill="url(#plannedGradient)" 
                name="Planned" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
                animationEasing="ease-out"
                className="transition-all duration-300 ease-in-out"
                onMouseOver={(_, __, e) => {
                  // Type casting e.target to HTMLElement to access style property
                  if (e && e.target) {
                    const target = e.target as HTMLElement;
                    target.style.filter = 'url(#plannedGlow)';
                    target.style.fill = 'url(#plannedHoverGradient)';
                    target.style.transform = 'scale(1, 1.05)';
                    target.style.transformOrigin = 'bottom';
                  }
                }}
                onMouseOut={(_, __, e) => {
                  // Type casting e.target to HTMLElement to access style property
                  if (e && e.target) {
                    const target = e.target as HTMLElement;
                    target.style.filter = '';
                    target.style.fill = '';
                    target.style.transform = '';
                  }
                }}
              />
              <Bar 
                dataKey="actual" 
                fill="url(#actualGradient)" 
                name="Actual" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
                animationEasing="ease-out"
                animationBegin={300}
                className="transition-all duration-300 ease-in-out"
                onMouseOver={(_, __, e) => {
                  // Type casting e.target to HTMLElement to access style property
                  if (e && e.target) {
                    const target = e.target as HTMLElement;
                    target.style.filter = 'url(#actualGlow)';
                    target.style.fill = 'url(#actualHoverGradient)';
                    target.style.transform = 'scale(1, 1.05)';
                    target.style.transformOrigin = 'bottom';
                  }
                }}
                onMouseOut={(_, __, e) => {
                  // Type casting e.target to HTMLElement to access style property
                  if (e && e.target) {
                    const target = e.target as HTMLElement;
                    target.style.filter = '';
                    target.style.fill = '';
                    target.style.transform = '';
                  }
                }}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
