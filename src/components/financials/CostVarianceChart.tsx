
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { useProject } from "@/contexts/ProjectContext";

const data = [
  {
    name: "Site Work",
    planned: 425000,
    actual: 412750,
    variance: 12250,
  },
  {
    name: "Structural Framing",
    planned: 720000,
    actual: 748800,
    variance: -28800,
  },
  {
    name: "Electrical",
    planned: 345000,
    actual: 341550,
    variance: 3450,
  },
  {
    name: "Plumbing & HVAC",
    planned: 520000,
    actual: 546000,
    variance: -26000,
  },
  {
    name: "Interior Finishes",
    planned: 635000,
    actual: 622300,
    variance: 12700,
  },
  {
    name: "Exterior Facades",
    planned: 390000,
    actual: 409500,
    variance: -19500,
  },
];

export function CostVarianceChart() {
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
  
  // Updated chart config with even more vibrant futuristic colors
  const chartConfig = {
    planned: {
      label: "Planned",
      theme: {
        light: "rgba(139, 92, 246, 0.9)", // Vivid purple
        dark: "rgba(139, 92, 246, 0.9)"
      }
    },
    actual: {
      label: "Actual",
      theme: {
        light: "rgba(14, 165, 233, 0.9)", // Ocean blue
        dark: "rgba(14, 165, 233, 0.9)"
      }
    }
  };
  
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
          <ChartContainer config={chartConfig} aspectRatio="auto">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 70, // Increased bottom margin to prevent text overlap
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(59, 130, 246, 0.2)" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: "#94a3b8" }} 
                angle={-45}
                textAnchor="end"
                height={60}
                stroke="#475569"
                tickMargin={10} // Added margin between text and axis
              />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000}k`}
                width={60}
                tick={{ fill: "#94a3b8" }}
                stroke="#475569"
              />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-cyan-800/50 bg-black p-3 shadow-[0_4px_20px_rgba(56,189,248,0.3)] backdrop-blur-md">
                        <div className="font-medium text-cyan-300 mb-1">{payload[0].payload.name}</div>
                        <div className="text-sm text-cyan-200 space-y-1">
                          <div>Planned: {formatCurrency(payload[0].payload.planned)}</div>
                          <div>Actual: {formatCurrency(payload[0].payload.actual)}</div>
                          <div className={payload[0].payload.variance >= 0 ? "text-emerald-400" : "text-rose-400"}>
                            Variance: {formatCurrency(payload[0].payload.variance)}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => <span className="text-gray-300">{value}</span>}
              />
              <Bar 
                dataKey="planned" 
                fill="var(--color-planned)" 
                name="Planned" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <Bar 
                dataKey="actual" 
                fill="var(--color-actual)" 
                name="Actual" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
                animationEasing="ease-out"
                animationBegin={300}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
