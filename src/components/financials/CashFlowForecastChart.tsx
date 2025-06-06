
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { useProject } from "@/contexts/ProjectContext";

const data = [
  {
    month: "Jan",
    inflow: 320000,
    outflow: 285000,
    cashBalance: 35000
  },
  {
    month: "Feb",
    inflow: 450000,
    outflow: 420000,
    cashBalance: 65000
  },
  {
    month: "Mar",
    inflow: 380000,
    outflow: 365000,
    cashBalance: 80000
  },
  {
    month: "Apr",
    inflow: 520000,
    outflow: 490000,
    cashBalance: 110000
  },
  {
    month: "May",
    inflow: 480000,
    outflow: 510000,
    cashBalance: 80000
  },
  {
    month: "Jun",
    inflow: 560000,
    outflow: 530000,
    cashBalance: 110000
  },
  {
    month: "Jul",
    inflow: 620000,
    outflow: 580000,
    cashBalance: 150000
  },
  {
    month: "Aug",
    inflow: 580000,
    outflow: 620000,
    cashBalance: 110000
  },
  {
    month: "Sep",
    inflow: 490000,
    outflow: 510000,
    cashBalance: 90000
  },
  {
    month: "Oct",
    inflow: 530000,
    outflow: 480000,
    cashBalance: 140000
  },
  {
    month: "Nov",
    inflow: 450000,
    outflow: 470000,
    cashBalance: 120000
  },
  {
    month: "Dec",
    inflow: 380000,
    outflow: 410000,
    cashBalance: 90000
  }
];

export function CashFlowForecastChart() {
  const { selectedProject } = useProject();
  const projectName = selectedProject?.title || "All Projects";
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Updated chart config with more vibrant futuristic colors
  const chartConfig = {
    inflow: {
      label: "Cash Inflow",
      theme: {
        light: "rgba(56, 189, 248, 0.8)", // Bright cyan
        dark: "rgba(56, 189, 248, 0.8)"
      }
    },
    outflow: {
      label: "Cash Outflow",
      theme: {
        light: "rgba(217, 70, 239, 0.8)", // Magenta
        dark: "rgba(217, 70, 239, 0.8)"
      }
    },
    cashBalance: {
      label: "Cash Balance",
      theme: {
        light: "rgba(139, 92, 246, 0.9)", // Vivid purple
        dark: "rgba(139, 92, 246, 0.9)"
      }
    }
  };
  
  return (
    <Card className="h-full bg-black border-cyan-900/30 shadow-[0_4px_20px_rgba(56,189,248,0.15)] animate-fade-in">
      <CardHeader className="bg-black">
        <CardTitle className="text-cyan-300">Cash Flow Forecast</CardTitle>
        <CardDescription className="text-gray-400">
          Monthly cash projections for {projectName}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-black p-4">
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig} aspectRatio="auto">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(59, 130, 246, 0.2)" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: "#94a3b8" }}
                stroke="#475569"
              />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000}k`} 
                tick={{ fill: "#94a3b8" }}
                stroke="#475569"
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-cyan-800/50 bg-black p-3 shadow-[0_4px_20px_rgba(56,189,248,0.3)] backdrop-blur-md">
                        <div className="font-medium text-cyan-300 mb-1">{label}</div>
                        <div className="text-sm space-y-1">
                          <div className="text-sky-400">
                            Inflow: {formatCurrency(payload[0].payload.inflow)}
                          </div>
                          <div className="text-pink-400">
                            Outflow: {formatCurrency(payload[0].payload.outflow)}
                          </div>
                          <div className="text-purple-400 font-medium">
                            Balance: {formatCurrency(payload[0].payload.cashBalance)}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => <span className="text-gray-300">{value}</span>}
              />
              <defs>
                <linearGradient id="inflowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(56, 189, 248, 0.8)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="rgba(56, 189, 248, 0.1)" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="outflowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(217, 70, 239, 0.8)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="rgba(217, 70, 239, 0.1)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="inflow"
                fill="url(#inflowGradient)"
                stroke="var(--color-inflow)"
                fillOpacity={0.6}
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 1, stroke: "#fff" }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <Area
                type="monotone"
                dataKey="outflow"
                fill="url(#outflowGradient)"
                stroke="var(--color-outflow)" 
                fillOpacity={0.6}
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 1, stroke: "#fff" }}
                animationDuration={1500}
                animationEasing="ease-out"
                animationBegin={300}
              />
              <ReferenceLine y={0} stroke="#475569" />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
